/**
 * JSONSchema数据对象的通用操作方法【非响应式数据操作方法集合】
 */
import { objClone } from '$utils/index';

/** 校验是否是合法的JsonSchema数据格式
 *  主要判断当前JSON对象中是否有预先定义的属性：
 *  Object类型必须有的属性：type、format、title、properties、required、propertyOrder；
 *  Array类型必须有的属性：type、format、title、properties、propertyOrder；
 *  基本数据类型必须有的属性：type、title、format
 * */
export function isJSONSchemaFormat(targetJsonObj) {
  let isFormat = false;
  if (targetJsonObj.type) {
    if (
      targetJsonObj.type === 'object' &&
      targetJsonObj.format &&
      targetJsonObj.title &&
      targetJsonObj.properties &&
      targetJsonObj.required &&
      targetJsonObj['propertyOrder']
    ) {
      isFormat = true;
    } else if (
      targetJsonObj.type === 'array' &&
      targetJsonObj.format &&
      targetJsonObj.title &&
      targetJsonObj.properties &&
      targetJsonObj['propertyOrder']
    ) {
      isFormat = true;
    } else if (targetJsonObj.format && targetJsonObj.title) {
      isFormat = true;
    }
  }
  return isFormat;
}

/* 根据索引路径获取对应的json数据  */
export function getJSONDataByIndex(
  indexRoute,
  targetJsonSchemaObj,
  useObjClone,
) {
  let curJsonSchemaObj = targetJsonSchemaObj;
  if (useObjClone) {
    curJsonSchemaObj = objClone(targetJsonSchemaObj); // 进行深拷贝，避免影响原有数据
  }
  if (indexRoute) {
    const indexRouteArr = indexRoute.split('-');
    for (let index = 0, size = indexRouteArr.length; index < size; index++) {
      // 获取指定路径的json数据对象，需要按以下步骤（备注：确保是符合规则的json格式数据，使用isJSONSchemaFormat进行校验）
      // 1、先根据路径值获取key值
      const curKeyTemp = curJsonSchemaObj['propertyOrder'][index];
      // 2、根据key值获取对应的json数据对象
      curJsonSchemaObj = curJsonSchemaObj.properties[curKeyTemp];
    }
  }
  return curJsonSchemaObj;
}
