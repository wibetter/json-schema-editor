
const jsonTestData = {
  jsonSchema: {
    type: 'object',
    title: 'jsonSchemaObject',
    properties: {
      func: {
        type: 'object',
        format: 'func',
        title: '功能设置',
        readOnly: false,
        properties: {
          field_1: {
            type: 'string',
            title: '单文本框',
            format: 'input',
            isRequired: false,
            default: '',
            description: '',
            placeholder: '',
            readOnly: false,
          },
          field_2: {
            type: 'boolean',
            title: '布尔值',
            format: 'boolean',
            isRequired: false,
            default: true,
            description: '',
            placeholder: '',
            readOnly: false,
          },
          field_3: {
            type: 'string',
            title: '日期',
            format: 'date',
            isRequired: false,
            default: '',
            description: '',
            placeholder: '',
            readOnly: false,
          },
          field_4: {
            type: 'string',
            title: '日期',
            format: 'date-time',
            isRequired: false,
            default: '',
            description: '',
            placeholder: '',
            readOnly: false,
          },
          field_5: {
            type: 'string',
            title: '时间',
            format: 'time',
            isRequired: false,
            default: '',
            description: '',
            placeholder: '',
            readOnly: false,
          },
          field_6: {
            type: 'string',
            title: 'URL',
            format: 'url',
            isRequired: false,
            default: '',
            description: '',
            placeholder: '',
            readOnly: false,
          },
          field_7: {
            type: 'string',
            title: '多行文本框',
            format: 'textarea',
            isRequired: false,
            default: '',
            description: '',
            placeholder: '',
            readOnly: false,
          },
          field_8: {
            type: 'number',
            title: '数值',
            format: 'number',
            isRequired: false,
            default: 50,
            description: '',
            placeholder: '',
            readOnly: false,
            minimum: 0,
            maximum: 100,
          },
          field_9: {
            type: 'string',
            title: '单选',
            format: 'radio',
            isRequired: false,
            default: '',
            description: '',
            placeholder: '',
            readOnly: false,
            items: {
              type: 'string',
              enum: ['a', 'b', 'c'],
              enumextra: ['选项a', '选项b', '选项c'],
              format: 'string',
            },
          },
          field_10: {
            type: 'array',
            title: '多选',
            format: 'select',
            isRequired: false,
            default: '',
            description: '',
            placeholder: '',
            readOnly: false,
            items: {
              type: 'string',
              enum: ['a', 'b', 'c'],
              enumextra: ['选项a', '选项b', '选项c'],
              format: 'string',
            },
          },
          field_11: {
            type: 'array',
            title: '数组',
            format: 'array',
            isRequired: false,
            default: '',
            description: '',
            placeholder: '',
            readOnly: false,
            items: {
              type: 'object',
              format: 'object',
              title: '数组项',
              readOnly: false,
              isRequired: false,
              description: '',
              properties: {
                name: {
                  type: 'string',
                  format: 'input',
                  title: '名字',
                  isRequired: false,
                  default: '',
                  description: '',
                  placeholder: '',
                  readOnly: false,
                },
                field_1: {
                  type: 'string',
                  title: '单文本框',
                  format: 'input',
                  default: '',
                  description: '',
                  placeholder: '',
                  isRequired: false,
                  readOnly: false,
                },
              },
              required: ['name', 'field_1'],
              propertyOrder: ['name', 'field_1'],
            },
          },
          field_12: {
            type: 'object',
            title: '对象类型',
            format: 'object',
            isRequired: false,
            default: '',
            description: '',
            placeholder: '',
            readOnly: false,
            properties: {
              a: {
                type: 'string',
                title: '单文本框',
                format: 'input',
                isRequired: false,
                default: '',
                description: '',
                placeholder: '',
                readOnly: false,
              },
              field_2: {
                type: 'string',
                title: '单文本框',
                format: 'input',
                default: '',
                description: '',
                placeholder: '',
                isRequired: false,
                readOnly: false,
              },
              field_3: {
                type: 'string',
                title: '单文本框',
                format: 'input',
                default: '',
                description: '',
                placeholder: '',
                isRequired: false,
                readOnly: false,
              },
            },
            required: ['a', 'field_2', 'field_3'],
            propertyOrder: ['a', 'field_2', 'field_3'],
          },
        },
        required: [
          'field_1',
          'field_2',
          'field_3',
          'field_4',
          'field_5',
          'field_6',
          'field_7',
          'field_8',
          'field_9',
          'field_10',
          'field_11',
          'field_12',
        ],
        propertyOrder: [
          'field_1',
          'field_2',
          'field_3',
          'field_4',
          'field_5',
          'field_6',
          'field_7',
          'field_8',
          'field_9',
          'field_10',
          'field_11',
          'field_12',
        ],
      },
      style: {
        type: 'object',
        format: 'style',
        title: '样式设置',
        readOnly: false,
        properties: {
          field_18: {
            type: 'string',
            title: '颜色值',
            format: 'color',
            isRequired: false,
            default: '#fff',
            description: '',
            placeholder: '',
            readOnly: false,
          },
          field_23: {
            type: 'object',
            title: '单位计量输入',
            format: 'quantity',
            isRequired: false,
            default: '',
            description: '',
            placeholder: '',
            readOnly: false,
            properties: {
              unit: { type: 'number', title: '数值', format: 'number' },
              quantity: {
                type: 'string',
                default: 'px',
                format: 'typeSelect',
                enum: ['px', 'rem', 'em', '%'],
                enumextra: ['px', 'rem', 'em', '%'],
                title: '单位类型',
              },
            },
            required: ['unit', 'quantity'],
            propertyOrder: ['unit', 'quantity'],
          },
          field_1: {
            type: 'string',
            title: '富文本类型',
            format: 'htmlarea',
            placeholder: '请输入html代码片段',
            default: '<p>hello,world!</p>',
            description: '用于放置html代码片段',
            isRequired: false,
            readOnly: false,
          },
        },
        required: ['field_18', 'field_23', 'field_1'],
        propertyOrder: ['field_18', 'field_23', 'field_1'],
      },
      data: {
        type: 'object',
        format: 'data',
        title: '数据设置',
        readOnly: false,
        properties: {
          field_28: {
            type: 'string',
            title: 'json数据项',
            format: 'json',
            isRequired: false,
            default: '{}',
            description: '',
            placeholder: '',
            readOnly: false,
          },
          field_29: {
            type: 'object',
            title: '数据源',
            format: 'datasource',
            isRequired: false,
            default: '',
            description: '',
            placeholder: '',
            readOnly: false,
            properties: {
              type: {
                type: 'string',
                default: 'local',
                format: 'typeSelect',
                enum: ['local', 'remote'],
                enumextra: ['local', 'remote'],
                title: '数据源类型',
              },
              data: {
                type: 'string',
                format: 'json',
                default: 'local',
                readOnlyInJson: false,
                title: '本地静态json数据',
              },
              filter: {
                type: 'string',
                format: 'codearea',
                default: 'return data;',
                title: '过滤器',
              },
            },
            required: ['type', 'data', 'filter'],
            propertyOrder: ['type', 'data', 'filter'],
          },
          field_30: {
            type: 'object',
            format: 'event',
            title: '事件',
            isRequired: false,
            readOnly: false,
            properties: {
              type: {
                type: 'string',
                default: 'emit',
                format: 'typeSelect',
                enum: ['on', 'emit'],
                enumextra: ['on', 'emit'],
                title: '事件类型',
                isRequired: false,
                readOnly: false,
              },
              trigger: {
                type: 'string',
                format: 'input',
                default: 'eventName',
                title: '触发事件',
                description: '用于输入触发事件的名称',
                placeholder: '请输入触发事件的名称',
                isRequired: false,
                readOnly: false,
              },
              eventData: {
                type: 'string',
                title: '事件数据',
                format: 'json',
                default: '{}',
                description: '传递给触发事件的数据对象',
                isRequired: false,
                readOnly: false,
              },
            },
            required: ['type', 'trigger', 'eventData'],
            propertyOrder: ['type', 'trigger', 'eventData'],
          },
          field_33: {
            type: 'array',
            title: '数组',
            format: 'array',
            isRequired: false,
            default: '',
            description: '',
            placeholder: '',
            readOnly: false,
            items: {
              type: 'object',
              format: 'object',
              title: '数组项',
              readOnly: false,
              isRequired: false,
              description: '',
              properties: {
                name: {
                  type: 'string',
                  format: 'input',
                  title: '名字',
                  isRequired: false,
                  default: '',
                  description: '',
                  placeholder: '',
                  readOnly: false,
                },
                field_2: {
                  type: 'array',
                  title: '数组',
                  format: 'array',
                  isRequired: false,
                  default: '',
                  description: '',
                  placeholder: '',
                  readOnly: false,
                  items: {
                    type: 'object',
                    format: 'object',
                    title: '数组项',
                    readOnly: false,
                    isRequired: false,
                    description: '',
                    properties: {
                      name: {
                        type: 'string',
                        format: 'input',
                        title: '名字',
                        isRequired: false,
                        default: '',
                        description: '',
                        placeholder: '',
                        readOnly: false,
                      },
                      field_3: {
                        type: 'string',
                        title: '单文本框',
                        format: 'input',
                        isRequired: false,
                        default: '',
                        description: '',
                        placeholder: '',
                        readOnly: false,
                      },
                      field_5: {
                        type: 'string',
                        title: '单文本框',
                        format: 'input',
                        isRequired: false,
                        default: '',
                        description: '',
                        placeholder: '',
                        readOnly: false,
                      },
                    },
                    required: ['name', 'field_3', 'field_5'],
                    propertyOrder: ['name', 'field_3', 'field_5'],
                  },
                },
              },
              required: ['name', 'field_2'],
              propertyOrder: ['name', 'field_2'],
            },
            properties: {
              a: {
                type: 'string',
                title: '单文本框',
                format: 'input',
                isRequired: false,
                default: '',
                description: '',
                placeholder: '',
                readOnly: false,
              },
            },
            required: ['a'],
            propertyOrder: ['a'],
          },
          field_34: {
            type: 'object',
            title: '对象类型',
            format: 'object',
            isRequired: false,
            default: '',
            description: '',
            placeholder: '',
            readOnly: false,
            properties: {
              obj: {
                type: 'object',
                title: '对象类型',
                format: 'object',
                isRequired: false,
                default: '',
                description: '',
                placeholder: '',
                readOnly: false,
                properties: {
                  a: {
                    type: 'string',
                    title: '单文本框',
                    format: 'input',
                    isRequired: false,
                    default: '',
                    description: '',
                    placeholder: '',
                    readOnly: false,
                  },
                  field_1: {
                    type: 'array',
                    title: '多选',
                    format: 'select',
                    isRequired: false,
                    default: '',
                    description: '',
                    placeholder: '',
                    readOnly: false,
                    items: {
                      type: 'string',
                      enum: ['a', 'b', 'c'],
                      enumextra: ['选项a', '选项b', '选项c'],
                      format: 'string',
                    },
                  },
                },
                required: ['a', 'field_1'],
                propertyOrder: ['a', 'field_1'],
              },
            },
            required: ['obj'],
            propertyOrder: ['obj'],
          },
          field_2: {
            type: 'string',
            title: '函数类型',
            format: 'codearea',
            placeholder: '请输入函数方法',
            default: 'function func() { console.log("hello, world!"); }',
            description: '用于定义函数方法',
            isRequired: false,
            readOnly: false,
          },
          field_3: {
            type: 'string',
            title: '富文本类型',
            format: 'htmlarea',
            placeholder: '请输入html代码片段',
            default: '<p>hello,world!</p>',
            description: '用于放置html代码片段',
            isRequired: false,
            readOnly: false,
          },
        },
        required: [
          'field_28',
          'field_29',
          'field_30',
          'field_33',
          'field_34',
          'field_2',
          'field_3',
        ],
        propertyOrder: [
          'field_28',
          'field_2',
          'field_3',
          'field_29',
          'field_30',
          'field_34',
          'field_33',
        ],
      },
    },
    required: ['func', 'style', 'data'],
    format: 'object',
  }, // 用于区块配置的schema  显示  / update  ok
  jsonData: {
    func: {
      field_1: 'text1',
      field_2: true,
      field_3: '2020-08-08',
      field_4: '2020-08-22 10:57',
      field_5: '00:05:00',
      field_6: {
        type: 'remote',
        config: {
          dataName: 'data-12', // 动态数据源名称
          title: 'xxx数据源', // 数据源中文名称
          desc: 'xxx数据源描述', //  数据源中文描述
          url: 'https://api.thecatapi.com/v1/images/search', // 动态数据源请求地址
          method: 'get',
          option: {},
          header: {}, // 请求头
          body: {
            // 请求参数相关
            param1: {
              title: '参数名称',
              scope: 'static', // 固定参数
              value: '111', // 固定值
            },
            param2: {
              title: '参数名称',
              scope: 'window',
              name: 'PARAM1',
              value: '111', // 默认值
            },
            pageId: {
              title: '页面id',
              scope: 'hash',
              name: 'pId',
              value: '111', // 默认值
            },
          },
          mock: '{}',
        },
        filter: `(resp) => { return resp.data; }`,
        data: '{}', // 用于存储结果数据
      },
      field_7: 'hello.world!',
      field_8: 51,
      field_9: 'a',
      field_10: ['a', 'b'],
      field_11: [
        {
          name: 'name',
          field_1: 'lisi',
        },
      ],
      field_12: {
        a: 'text1',
        field_2: 'text2',
        field_3: 'text13',
      },
    },
    style: {
      field_18: '#9c2b2b',
      field_23: {
        unit: 501,
        quantity: 'px',
      },
      field_1: '<p>hello,world!</p>\n<p>hello,world!</p>',
    },
    data: {
      field_28: {
        test: 123,
      },
      field_2: {
        type: 'remote',
        config: {
          dataName: 'data-12', // 动态数据源名称
          title: 'xxx数据源', // 数据源中文名称
          desc: 'xxx数据源描述', //  数据源中文描述
          url: 'https://api.thecatapi.com/v1/images/search', // 动态数据源请求地址
          method: 'get',
          option: {},
          header: {}, // 请求头
          body: {
            param1: {
              title: '参数名称',
              scope: 'static', // 固定参数
              value: '111', // 固定值
            },
            param2: {
              title: '参数名称',
              scope: 'window',
              name: 'PARAM1',
              value: '111', // 默认值
            },
            pageId: {
              title: '页面id',
              scope: 'hash',
              name: 'pId',
              value: '111', // 默认值
            },
            param4: {
              title: '参数名称',
              // 动态参数
              scope: 'hash', // url hash值
              name: 'pageId',
              value: '111',
            },
            param5: {
              title: '参数名称',
              scope: 'url', // url 参数值
              name: 'pageId',
              value: '111',
            },
            param6: {
              title: '参数名称',
              scope: 'window', // 环境变量
              name: 'pageId',
              value: '111',
            },
            param7: {
              title: '参数名称',
              scope: 'dynamic', // 接口下发
              dataName: 'api3',
              body: {
                param2: {
                  title: '参数名称',
                  scope: 'static',
                  value: '222',
                },
                param3: {
                  title: '参数名称',
                  scope: 'static',
                  value: '333',
                },
              },
            },
          },
          mock: '{}',
        },
        filter: `(resp) => { return resp.data; }`,
        data: '{}', // 用于存储结果数据
      },
      field_29: {
        data: {
          test: 123,
        },
        filter: '() => {}',
      },
      field_29_2: {
        type: 'remote',
        config: {
          dataName: 'data-12', // 动态数据源名称
          title: 'xxx数据源', // 数据源中文名称
          desc: 'xxx数据源描述', //  数据源中文描述
          url: 'https://api.thecatapi.com/v1/images/search', // 动态数据源请求地址
          method: 'get',
          option: {},
          header: {}, // 请求头
          body: {
            // 请求参数相关
            param1: {
              title: '参数名称',
              scope: 'static', // 固定参数
              value: '111', // 固定值
            },
            param2: {
              title: '参数名称',
              scope: 'window',
              name: 'PARAM1',
              value: '111', // 默认值
            },
            pageId: {
              title: '页面id',
              scope: 'hash',
              name: 'pId',
              value: '111', // 默认值
            },
          },
          mock: '{}',
        },
        filter: `(resp) => { return resp.data; }`,
        data: '{}', // 用于存储结果数据
      },
      field_30: {
        trigger: 'click',
        eventData: {
          test: 123,
        },
      },
      field_30_1: {
        register: 'click',
        actionFunc: '() => {}',
      },
    },
  }
};

const { KeyWordList } = require('@wibetter/json-utils');

// const testData = dynamicDataAnalyzer(jsonTestData.jsonData);
console.log(KeyWordList)
