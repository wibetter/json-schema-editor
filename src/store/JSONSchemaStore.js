import { observable, computed, action, set, remove, get, toJS } from 'mobx';
import { message } from 'antd';
import { objClone } from '$utils/index';
import { isJSONSchemaFormat, getJSONDataByIndex } from '$utils/jsonSchema';
import { initJSONSchemaData } from '$data/index';

export default class JSONSchemaStore {
  /**
   * triggerChange: 用于强制触发更新事件
   */
  @observable triggerChange = false;
  /**
   * jsonSchema: JSONSchema数据对象
   */
  @observable jsonSchema = {};

  /**
   * triggerChangeAction: 用于主动触发更新事件
   */
  @action.bound
  triggerChangeAction() {
    this.triggerChange = !this.triggerChange;
  }

  /** 根据索引路径获取对应的json数据[非联动式数据获取]  */
  @action.bound
  initJSONSchemaData(jsonSchemaData) {
    if (!jsonSchemaData || JSON.stringify(jsonSchemaData) === '{}') {
      // 使用默认的jsonschema数据进行初始化
      this.jsonSchema = objClone(initJSONSchemaData);
    } else {
      // 需要进行一次转换，以便兼容旧版数据
      this.jsonSchema = objClone(jsonSchemaData);
      // 使用objClone可避免后续jsonSchema变动影响数据源
    }
  }

  @computed get JSONSchemaObj() {
    return toJS(this.jsonSchema);
  }

  /** 根据索引路径获取对应的json数据[非联动式数据获取]  */
  @action.bound
  getJSONDataByIndex(indexRoute) {
    return getJSONDataByIndex(indexRoute, this.jsonSchema, true); // useObjClone: true
  }

  /** 根据索引路径值(indexRoute)和关键字(childKey)插入新的json数据对象(childObj) */
  @action.bound
  addChildObj(indexRoute, childKey, childObj) {
    const curJSONObj = getJSONDataByIndex(indexRoute, this.jsonSchema);
    if (curJSONObj.type === 'array' || curJSONObj.type === 'object') {
      curJSONObj.required.push(childKey);
      curJSONObj['propertyOrder'].push(childKey);
      curJSONObj.properties[childKey] = childObj;
    } else {
      // 注：非数组和对象类型字段不允许插入子元素
      message.warning('非数组和对象类型字段不允许插入子元素');
    }
  }

  /**
   * 判断是否是同一个父元素
   * 备注：用于判断两个元素是否在同一个父级容器中
   */
  @action.bound
  isSameParentElem(curIndex, targetIndex) {
    const curIndexArr = curIndex.split('-');
    const targetIndexArr = targetIndex.split('-');
    curIndexArr.pop();
    targetIndexArr.pop();
    if (curIndexArr.join('-') === targetIndexArr.join('-')) {
      return true;
    } else {
      return false;
    }
  }
}
