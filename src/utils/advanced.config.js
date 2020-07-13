/** 11种基础类型 */
const BASE_TYPE = [
  'input',
  'boolean',
  'number',
  'color',
  'url',
  'textarea',
  'radio',
  'select',
  'date',
  'date-time',
  'time',
];

/** 8种高级类型（特殊类型） */
const HIGH_TYPE = [
  'quantity',
  'json',
  'codearea',
  'htmlarea',
  'datasource',
  'event',
  'array',
  'object',
];
/** 所有类型，包含11种基础类型和8种高级类型（特殊类型） */
const ALL_TYPE = [...BASE_TYPE, ...HIGH_TYPE];

/** 字段描述配置项：description
 *  根据format判断是否显示字段描述配置项
 *  11种基础类型组件（input、boolean、 date、date-time、 time、 url、 textarea、number、color、radio、 select）
 *  8个特殊类型组件（Object、Array、Json、datasource、Event、CodeArea、htmlArea、quantity）
 * */
export function isNeedDescriptionOption(curFormat) {
  let isSupported = false;
  const supportedTypeList = ALL_TYPE;
  const supportedTypeListChar = `#${supportedTypeList.join('#')}#`;
  if (supportedTypeListChar.indexOf(`#${curFormat}#`) >= 0) {
    isSupported = true;
  }
  return isSupported;
}
