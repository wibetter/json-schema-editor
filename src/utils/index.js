/** js对象数据深拷贝，避免数据联动 */
export function objClone(targetObj) {
  const newObj = JSON.stringify(targetObj);
  return JSON.parse(newObj);
}

/** 对比两个json数据是否相等 */
export function isEqual(targetObj, nextTargetObj) {
  return JSON.stringify(targetObj) === JSON.stringify(nextTargetObj);
}
