import { observable, computed, action, set, remove, get, toJS } from 'mobx';
import { message } from 'antd';
import {
  getParentIndexRoute,
  getJSONDataByIndex,
  oldJSONSchemaToNewJSONSchema,
} from '$utils/jsonSchema';
import { objClone, isJSONSchemaFormat } from '$utils/index';
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
      // 进行一次转换，以便兼容旧版数据
      const newJSONSchema = oldJSONSchemaToNewJSONSchema(jsonSchemaData);
      console.log(newJSONSchema);
      this.jsonSchema = newJSONSchema;
    }
  }

  @computed get JSONSchemaObj() {
    return toJS(this.jsonSchema);
  }

  /** 根据索引路径获取对应的json数据[非联动式数据获取]  */
  @action.bound
  getJSONDataByIndex(indexRoute) {
    return getJSONDataByIndex(indexRoute, this.jsonSchema, true); // useObjClone: true 避免后续产生数据联动
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

  /** 根据索引路径值(indexRoute)和关键字(childKey)删除对应的json数据对象 */
  @action.bound
  deleteJsonByIndex(indexRoute, curKey) {
    // 1.获取当前元素的父元素路径值
    const parentIndex = getParentIndexRoute(indexRoute);
    const parentJsonObj = getJSONDataByIndex(parentIndex, this.jsonSchema);
    // 2.根据curKey删除在properties中删除对应的字段对象
    delete parentJsonObj[curKey];
    // 3.删除propertyOrder中对应的curKey
    const deleteIndex = parentJsonObj.propertyOrder.indexOf(curKey);
    parentJsonObj.propertyOrder.splice(deleteIndex, 1);
    // 4.删除required中对应的curKey
    const deleteIndex2 = parentJsonObj.required.indexOf(curKey);
    parentJsonObj.required.splice(deleteIndex2, 1);
  }
}
