import { observable, computed, action, set, remove, get, toJS } from 'mobx';
import { message } from 'antd';
import {
  getParentIndexRoute,
  getParentIndexRoute_CurIndex,
  getJSONDataByIndex,
  oldJSONSchemaToNewJSONSchema,
} from '$utils/jsonSchema';
import { objClone } from '$utils/index';
import { isBoxSchemaData } from '$utils/jsonSchema';
import { initJSONSchemaData, initInputData } from '$data/index';

let curJsonKeyIndex = 1; // 主要用于自动生成jsonKey中的index

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
      this.jsonSchema = newJSONSchema;
    }
    curJsonKeyIndex = 1; // 每次初始化，都需要重置curJsonKeyIndex值
  }

  @computed get JSONSchemaObj() {
    return toJS(this.jsonSchema);
  }

  /** 根据索引路径获取对应的json数据[非联动式数据获取]  */
  @action.bound
  getJSONDataByIndex(indexRoute) {
    return getJSONDataByIndex(indexRoute, this.jsonSchema, true); // useObjClone: true 避免后续产生数据联动
  }

  /** 根据索引路径值(indexRoute)插入新的子元素-json数据对象(childJson)
   *  备注：关键字(childKey)自动生成，json数据对象(childJson)默认使用initInputData
   * */
  @action.bound
  getNewJsonKeyIndex(curJSONObj) {
    let newJsonKeyIndex = `field_${curJsonKeyIndex}`;
    if (curJSONObj.propertyOrder.indexOf(newJsonKeyIndex) > 0) {
      // 表示存在相同的jsonKey
      curJsonKeyIndex += 1;
      newJsonKeyIndex = this.getNewJsonKeyIndex(curJSONObj);
    }
    curJsonKeyIndex += 1;
    return newJsonKeyIndex;
  }

  /** 根据索引路径值(indexRoute)插入新的子元素-json数据对象(childJson)
   *  备注：关键字(childKey)自动生成，json数据对象(childJson)默认使用initInputData
   * */
  @action.bound
  addChildJson(curIndexRoute) {
    const curJSONObj = getJSONDataByIndex(curIndexRoute, this.jsonSchema);
    if (isBoxSchemaData(curJSONObj.format)) {
      const childKey = this.getNewJsonKeyIndex(curJSONObj);
      curJSONObj.required.push(childKey);
      curJSONObj['propertyOrder'].push(childKey);
      curJSONObj.properties[childKey] = initInputData;
    } else {
      // 注：非数组和对象类型字段不允许插入子元素
      message.warning('非对象类型字段不允许插入子元素');
    }
  }

  /** 根据索引路径值(indexRoute)插入新的兄弟节点元素-json数据对象
   *  备注：关键字(childKey)自动生成，json数据对象默认使用initInputData
   * */
  @action.bound
  insertJsonData(curIndexRoute) {
    // 1.获取当前元素的父元素路径值和最后一个路径值，以便定位插入的位置
    const parentIndexRoute_CurIndex = getParentIndexRoute_CurIndex(
      curIndexRoute,
    );
    const parentIndexRoute = parentIndexRoute_CurIndex[0];
    const curIndex = parentIndexRoute_CurIndex[1];
    // 2.生成新的jsonKey值
    const parentJSONObj = getJSONDataByIndex(parentIndexRoute, this.jsonSchema);
    const newJsonKey = this.getNewJsonKeyIndex(parentJSONObj);
    // 3.插入新增的对象数据
    parentJSONObj.required.push(newJsonKey);
    parentJSONObj.properties[newJsonKey] = initInputData;
    // 4.在propertyOrder的对应位置插入newJsonKey【有序插入newJsonKey】
    const currentPropertyOrder = parentJSONObj['propertyOrder'];
    const startArr = currentPropertyOrder.slice(0, Number(curIndex) + 1);
    const endArr = currentPropertyOrder.slice(Number(curIndex) + 1);
    parentJSONObj['propertyOrder'] = [...startArr, newJsonKey, ...endArr];
  }

  /** 根据索引路径值(indexRoute)和关键字(childKey)删除对应的json数据对象 */
  @action.bound
  deleteJsonByIndex(indexRoute, curKey) {
    // 1.获取当前元素的父元素路径值
    const parentIndexRoute = getParentIndexRoute(indexRoute);
    const parentJsonObj = getJSONDataByIndex(parentIndexRoute, this.jsonSchema);
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
