/** js对象数据深拷贝，避免数据联动 */
export function objClone(targetObj) {
  const newObj = JSON.stringify(targetObj);
  return JSON.parse(newObj);
}

/** 对比两个json数据是否相等 */
export function isEqual(targetObj, nextTargetObj) {
  return JSON.stringify(targetObj) === JSON.stringify(nextTargetObj);
}

/** 根据className判断是否是基本类型元素
 *  基本类型元素：input、boolean、 date、date-time、 time、 url、
 *  textarea、number、 radio、 select、color、quantity
 * */
export function isBaseSchemaElem(elemClassName) {
  let isBaseSchema = false;
  if (
    elemClassName.indexOf('input-schema') > 0 ||
    elemClassName.indexOf('boolean-schema') > 0 ||
    elemClassName.indexOf('date-schema') > 0 ||
    elemClassName.indexOf('date-time-schema') > 0 ||
    elemClassName.indexOf('time-schema') > 0 ||
    elemClassName.indexOf('url-schema') > 0 ||
    elemClassName.indexOf('textarea-schema') > 0 ||
    elemClassName.indexOf('number-schema') > 0 ||
    elemClassName.indexOf('radio-schema') > 0 ||
    elemClassName.indexOf('select-schema') > 0 ||
    elemClassName.indexOf('color-schema') > 0 ||
    elemClassName.indexOf('quantity-schema') > 0
  ) {
    isBaseSchema = true;
  }
  return isBaseSchema;
}

/** 根据className判断是否是容器类型元素
 *  容器类型元素：func、style、data、object、array
 * */
export function isBoxSchemaElem(elemClassName) {
  let isBoxSchema = false;
  if (
    elemClassName.indexOf('func-schema') > 0 ||
    elemClassName.indexOf('style-schema') > 0 ||
    elemClassName.indexOf('data-schema') > 0 ||
    elemClassName.indexOf('object-schema') > 0 ||
    elemClassName.indexOf('array-schema') > 0
  ) {
    isBoxSchema = true;
  }
  return isBoxSchema;
}

/** 根据format判断是否是容器类型字段
 *  容器类型字段：func、style、data、object、array
 * */
export function isBoxSchemaData(format) {
  let isBoxSchema = false;
  if (
    format === 'func' ||
    format === 'style' ||
    format === 'data' ||
    format === 'object' ||
    format === 'array'
  ) {
    isBoxSchema = true;
  }
  return isBoxSchema;
}
