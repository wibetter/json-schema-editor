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

export default class JSONSchemaStore {
  /** 主要用于自动生成jsonKey中的index */
  curJsonKeyIndex = 1;
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
    this.curJsonKeyIndex = 1; // 每次初始化，都需要重置curJsonKeyIndex值
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
    let newJsonKeyIndex = `field_${this.curJsonKeyIndex}`;
    if (curJSONObj.propertyOrder.indexOf(newJsonKeyIndex) >= 0) {
      // 表示存在相同的jsonKey
      this.curJsonKeyIndex += 1;
      newJsonKeyIndex = this.getNewJsonKeyIndex(curJSONObj);
    }
    this.curJsonKeyIndex += 1;
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
    console.log(this.JSONSchemaObj);
  }

  /** 根据索引路径值(indexRoute)编辑对应的json数据对象
   *  备注：用于编辑对应的属性值（type、title、description、placeholder、isRequired、default、readOnly）
   * */
  @action.bound
  editJsonData(curIndexRoute, jsonKey, newJsonDataObj) {
    const parentIndexRoute = getParentIndexRoute(curIndexRoute);
    const parentJSONObj = getJSONDataByIndex(parentIndexRoute, this.jsonSchema);
    parentJSONObj.properties[jsonKey] = Object.assign(
      {},
      objClone(parentJSONObj.properties[jsonKey]),
      newJsonDataObj,
    );
    console.log(this.JSONSchemaObj);
  }

  /** 根据索引路径值(indexRoute)编辑对应的jsonKey
   *  备注：仅用于修改jsonKey值
   * */
  @action.bound
  editJsonKey(curIndexRoute, newJsonKey) {
    const curJSONObj = getJSONDataByIndex(curIndexRoute, this.jsonSchema, true); // 最后参数true用于避免数据关联
    // 先插入对象值
    this.insertJsonData(curIndexRoute, newJsonKey, curJSONObj);
    // 再删除原有的json数据对象
    this.deleteJsonByIndex(curIndexRoute);
    console.log(this.JSONSchemaObj);
  }

  /** 根据索引路径值(indexRoute)插入新的兄弟节点元素-json数据对象
   *  备注：关键字(childKey)自动生成，json数据对象默认使用initInputData
   * */
  @action.bound
  addNextJsonData(curIndexRoute) {
    // 1.获取当前元素的父元素路径值和最后一个路径值，以便定位插入的位置
    const parentIndexRoute = getParentIndexRoute(curIndexRoute);
    // 2.生成新的jsonKey值
    const parentJSONObj = getJSONDataByIndex(parentIndexRoute, this.jsonSchema);
    /** 如果没有设置jsonKey，则自动生成一个新的jsonKey */
    const newJsonKey = this.getNewJsonKeyIndex(parentJSONObj);
    this.insertJsonData(curIndexRoute, newJsonKey, initInputData); // 默认新增input类型字段
    console.log(this.JSONSchemaObj);
  }

  /** 根据索引路径值(indexRoute)插入指定的json数据对象（jsonKey、curJSONObj）*/
  @action.bound
  insertJsonData(curIndexRoute, jsonKey, curJSONObj) {
    // 1.获取当前元素的父元素路径值和最后一个路径值，以便定位插入的位置
    const parentIndexRoute_CurIndex = getParentIndexRoute_CurIndex(
      curIndexRoute,
    );
    const parentIndexRoute = parentIndexRoute_CurIndex[0];
    const curIndex = parentIndexRoute_CurIndex[1];
    // 2.生成新的jsonKey值
    const parentJSONObj = getJSONDataByIndex(parentIndexRoute, this.jsonSchema);
    // 3.插入新增的对象数据
    parentJSONObj.required.push(jsonKey);
    /** 如果没有设置新增的对象数据，则默认使用initInputData */
    parentJSONObj.properties[jsonKey] = curJSONObj;
    // 4.在propertyOrder的对应位置插入newJsonKey【有序插入newJsonKey】
    const currentPropertyOrder = parentJSONObj['propertyOrder'];
    const startArr = currentPropertyOrder.slice(0, Number(curIndex) + 1);
    const endArr = currentPropertyOrder.slice(Number(curIndex) + 1);
    parentJSONObj['propertyOrder'] = [...startArr, jsonKey, ...endArr];
    console.log(this.JSONSchemaObj);
  }

  /** 根据索引路径值(indexRoute)和关键字(childKey)删除对应的json数据对象 */
  @action.bound
  deleteJsonByIndex_CurKey(indexRoute, curKey) {
    // 1.获取当前元素的父元素路径值
    const parentIndexRoute = getParentIndexRoute(indexRoute);
    const parentJsonObj = getJSONDataByIndex(parentIndexRoute, this.jsonSchema);
    // 2.根据curKey删除在properties中删除对应的字段对象
    delete parentJsonObj.properties[curKey];
    // 3.删除propertyOrder中对应的curKey
    const deleteIndex = parentJsonObj.propertyOrder.indexOf(curKey);
    parentJsonObj.propertyOrder.splice(deleteIndex, 1);
    // 4.删除required中对应的curKey
    const deleteIndex2 = parentJsonObj.required.indexOf(curKey);
    parentJsonObj.required.splice(deleteIndex2, 1);
    console.log(this.JSONSchemaObj);
  }

  /** 根据索引路径值(indexRoute)删除对应的json数据对象 */
  @action.bound
  deleteJsonByIndex(indexRoute) {
    // 1.获取当前元素的父元素路径值和最后一个路径值，以便定位插入的位置
    const parentIndexRoute_CurIndex = getParentIndexRoute_CurIndex(indexRoute);
    const parentIndexRoute = parentIndexRoute_CurIndex[0];
    const curIndex = parentIndexRoute_CurIndex[1];
    const parentJsonObj = getJSONDataByIndex(parentIndexRoute, this.jsonSchema);
    const curKey = parentJsonObj.propertyOrder[curIndex];
    // 2.根据curKey删除在properties中删除对应的字段对象
    delete parentJsonObj.properties[curKey];
    // 3.删除propertyOrder中对应的curKey
    const deleteIndex = parentJsonObj.propertyOrder.indexOf(curKey);
    parentJsonObj.propertyOrder.splice(deleteIndex, 1);
    // 4.删除required中对应的curKey
    const deleteIndex2 = parentJsonObj.required.indexOf(curKey);
    parentJsonObj.required.splice(deleteIndex2, 1);
    console.log(this.JSONSchemaObj);
  }
}
