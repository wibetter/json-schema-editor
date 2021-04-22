import * as React from 'react';
import ReactDOM from 'react-dom';
import { Switch } from 'antd';
import JSONEditor from '@wibetter/json-editor';
import JSONSchemaEditor from './main';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/theme-solarized_light'; // ace-builds
import '@wibetter/json-editor/dist/index.css';
import './index.scss';

/**
 * JSONSchema的测试Demo
 */
class IndexDemo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
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
                title: '日期时间',
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
                title: '链接地址url',
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
                title: '数量number',
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
                title: '颜色color',
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
              field_111: {
                type: 'string',
                title: 'IMG',
                format: 'image',
                default: '',
                description: '上传图片',
                imgWidth: 200,
                imgHeight: 200,
                imgRatio: 1,
                imgRatioReadOnly: false,
                isRequired: false,
                readOnly: false,
              },
            },
            required: ['field_18', 'field_23', 'field_1', 'field_111'],
            propertyOrder: ['field_18', 'field_23', 'field_1', 'field_111'],
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
        propertyOrder: ['func', 'style', 'data'],
      }, // 用于组件配置的schema
      jsonData: {},
      dynamicDataList: [
        {
          id: 3,
          projectId: 97,
          type: '1',
          title: '获取项目数据源接口列表',
          name: 'getProjectDataSource',
          desc: '获取项目数据源接口列表数组',
          url: 'http://dev.jd.com:4000/project_datasource',
          method: 'GET',
          headers:
            '{"user-agent":"UA/chrome","content-type":"application/json"}',
          options:
            '{"cache":"no-cache","credentials":"*","mode":"cors","redirect":"follow"}',
          reqParams:
            '{"param1":{"title":"参数名称","scope":"static","value":"111"},"param2":{"title":"参数名称","scope":"window","name":"PARAM1","value":"111"},"pageId":{"title":"页面id","scope":"hash","name":"pId","value":"111"}}',
          dynamicParams:
            '{"param5":{"title":"参数名称","scope":"url","name":"pageId","value":"111"},"param7":{"title":"参数名称","scope":"dynamic","dataName":"api3","body":{"param2":{"title":"参数名称","scope":"static","value":"222"},"param3":{"title":"参数名称","scope":"static","value":"333"}}}}',
          respMock:
            '{"code":0,"data":[{"id":3,"projectId":89,"type":"1","title":"获取项目数据源","name":"getProjectDataSource","desc":"获取项目数据源","url":"http://dev.jd.com:4000/project_datasource","method":"GET","headers":"{\\"user-agent\\":\\"chrome\\",\\"content-type\\":\\"application/json\\"}","options":"{\\"cache\\":\\"no-cache\\",\\"credentials\\":\\"same-origin\\",\\"mode\\":\\"cors\\",\\"redirect\\":\\"follow\\"}","reqParams":"{\\"param1\\":{\\"title\\":\\"参数名称\\",\\"scope\\":\\"static\\",\\"value\\":\\"111\\"},\\"param2\\":{\\"title\\":\\"参数名称\\",\\"scope\\":\\"window\\",\\"name\\":\\"PARAM1\\",\\"value\\":\\"111\\"},\\"pageId\\":{\\"title\\":\\"页面id\\",\\"scope\\":\\"hash\\",\\"name\\":\\"pId\\",\\"value\\":\\"111\\"}}","dynamicParams":"{\\"param5\\":{\\"title\\":\\"参数名称\\",\\"scope\\":\\"url\\",\\"name\\":\\"pageId\\",\\"value\\":\\"111\\"},\\"param7\\":{\\"title\\":\\"参数名称\\",\\"scope\\":\\"dynamic\\",\\"dataName\\":\\"api3\\",\\"body\\":{\\"param2\\":{\\"title\\":\\"参数名称\\",\\"scope\\":\\"static\\",\\"value\\":\\"222\\"},\\"param3\\":{\\"title\\":\\"参数名称\\",\\"scope\\":\\"static\\",\\"value\\":\\"333\\"}}}}","respMock":"{}","creatorId":2,"createdAt":"2020-08-20T03:09:29.000Z","updatedAt":"2020-08-20T03:09:29.000Z","deletedAt":null,"creator":{"id":2,"erp":"wangjianhui16"},"dataName":"getProjectDataSource","body":{"param1":{"title":"参数名称","scope":"static","value":"111"},"param2":{"title":"参数名称","scope":"window","name":"PARAM1","value":"111"},"pageId":{"title":"页面id","scope":"hash","name":"pId","value":"111"},"param5":{"title":"参数名称","scope":"url","name":"pageId","value":"111"},"param7":{"title":"参数名称","scope":"dynamic","dataName":"api3","body":{"param2":{"title":"参数名称","scope":"static","value":"222"},"param3":{"title":"参数名称","scope":"static","value":"333"}}}}}]}',
          creatorId: 2,
          createdAt: '2020-08-20T03:09:29.000Z',
          updatedAt: '2020-08-20T12:40:19.000Z',
          deletedAt: null,
          creator: {
            id: 2,
            erp: 'wangjianhui16',
          },
          dataName: 'getProjectDataSource',
          body:
            '{"param1":{"title":"参数名称","scope":"static","value":"111"},"param2":{"title":"参数名称","scope":"window","name":"PARAM1","value":"111"},"pageId":{"title":"页面id","scope":"hash","name":"pId","value":"111"},"param5":{"title":"参数名称","scope":"url","name":"pageId","value":"111"},"param7":{"title":"参数名称","scope":"dynamic","dataName":"api3","body":{"param2":{"title":"参数名称","scope":"static","value":"222"},"param3":{"title":"参数名称","scope":"static","value":"333"}}}}',
        },
        {
          id: 4,
          projectId: 97,
          type: '1',
          title: 'getAttr2',
          name: 'getAttr2',
          desc: 'getAttr2',
          url: 'http://getAttr2',
          method: 'POST',
          headers: null,
          options: null,
          reqParams: null,
          dynamicParams:
            '{\n          "param1": {\n            "title": "参数名称",\n            "scope": "static",\n            "value": "111"\n          },\n          "param2": {\n            "title": "参数名称",\n            "scope": "window",\n            "name": "PARAM1",\n            "value": "111"\n          },\n          "pageId": {\n            "title": "页面id",\n            "scope": "hash",\n            "name": "pId",\n            "value": "111"\n          }\n        }\n',
          respMock: null,
          creatorId: 2,
          createdAt: '2020-08-20T14:54:17.000Z',
          updatedAt: '2020-08-20T14:54:17.000Z',
          deletedAt: null,
          creator: {
            id: 2,
            erp: 'wangjianhui16',
          },
          dataName: 'getAttr2',
          body:
            '{"param1":{"title":"参数名称","scope":"static","value":"111"},"param2":{"title":"参数名称","scope":"window","name":"PARAM1","value":"111"},"pageId":{"title":"页面id","scope":"hash","name":"pId","value":"111"}}',
        },
      ],
      wideScreen: false,
      jsonView: false,
      schemaCodeView: false, // schema源码模式
      viewStyle: 'tabs', // 默认折叠模式
      curTypeList: {
        func: [
          'input',
          'boolean',
          'number',
          'color',
          'url',
          'textarea',
          'text-editor',
          'radio',
          'single-select',
          'select',
          'date',
          'date-time',
          'time',
          'quantity',
          'json',
          'codearea',
          'htmlarea',
          'event',
          'array',
          'object',
        ],
        style: [
          'color',
          'quantity',
          'input',
          'boolean',
          'number',
          'radio',
          'single-select',
          'select',
          'box-style',
        ],
        data: [
          'json',
          'codearea',
          'htmlarea',
          'text-editor',
          'dynamic-data',
          'datasource',
          'object',
          'array',
        ],
        'event-schema': ['event'],
        object: [
          'input',
          'boolean',
          'color',
          'date',
          'date-time',
          'time',
          'url',
          'textarea',
          'number',
          'object',
          'array',
        ],
        'array-object': [
          'input',
          'boolean',
          'color',
          'date',
          'date-time',
          'time',
          'url',
          'textarea',
          'number',
          'object',
          'array',
        ],
        all: [
          'input',
          'boolean',
          'number',
          'color',
          'url',
          'textarea',
          'text-editor',
          'radio',
          'single-select',
          'select',
          'date',
          'date-time',
          'time',
          'quantity',
          'json',
          'codearea',
          'htmlarea',
          'event',
          'array',
          'object',
        ],
      },
    };
  }

  render() {
    const {
      jsonSchema,
      jsonData,
      dynamicDataList,
      wideScreen,
      schemaCodeView,
      jsonView,
      viewStyle,
      curTypeList,
    } = this.state;
    return (
      <>
        <div className="title-container">
          <div className="title1-box">
            <p>
              <b>JSONSchema</b>: 提供可视化界面编辑json格式/结构；
              <br />
              主要用于可视化模型设置（定义可配置项）。&nbsp;&nbsp;
              <Switch
                style={{ display: 'inline-block' }}
                defaultChecked={schemaCodeView}
                checkedChildren="code"
                unCheckedChildren="view"
                onChange={(checked) => {
                  this.setState({
                    schemaCodeView: checked,
                  });
                }}
              />
            </p>
          </div>
          <div className="title2-box">
            <p>
              <b>JSONEditor</b>:
              提供可视化界面编辑json数据内容，用于可视化编辑配置项内容，避免用户直接编辑json数据内容。
            </p>
            <div>
              <b>自定义展示</b>: &nbsp;&nbsp;
              <Switch
                style={{ display: 'inline-block' }}
                defaultChecked={wideScreen}
                checkedChildren="大屏"
                unCheckedChildren="小屏"
                onChange={(checked) => {
                  this.setState({
                    wideScreen: checked,
                  });
                }}
              />
              &nbsp;&nbsp;
              <Switch
                style={{ display: 'inline-block' }}
                defaultChecked={viewStyle === 'tabs' ? true : false}
                checkedChildren="tabs"
                unCheckedChildren="fold"
                onChange={(checked) => {
                  this.setState({
                    viewStyle: checked ? 'tabs' : 'fold',
                  });
                }}
              />
              &nbsp;&nbsp;
              <Switch
                style={{ display: 'inline-block' }}
                defaultChecked={jsonView}
                checkedChildren="code"
                unCheckedChildren="view"
                onChange={(checked) => {
                  this.setState({
                    jsonView: checked,
                  });
                }}
              />
            </div>
          </div>
        </div>
        <div className="json-action-container">
          <div className="json-schema-box">
            {!schemaCodeView && (
              <JSONSchemaEditor
                data={jsonSchema}
                typeList={curTypeList}
                onChange={(newJsonSchema) => {
                  this.setState({
                    jsonSchema: newJsonSchema,
                  });
                }}
              />
            )}
            {schemaCodeView && (
              <AceEditor
                id="json_area_ace"
                value={JSON.stringify(jsonSchema, null, 2)}
                className="json-view-ace"
                mode="json"
                theme="solarized_light"
                name="JSON_CODE_EDIT"
                fontSize={14}
                showPrintMargin={true}
                showGutter={true}
                highlightActiveLine={true}
                readOnly={false}
                minLines={5}
                maxLines={33}
                width={'100%'}
                setOptions={{
                  useWorker: false,
                  showLineNumbers: true,
                  tabSize: 2,
                }}
              />
            )}
          </div>
          <div className="json-editor-box">
            <JSONEditor
              viewStyle={viewStyle}
              jsonView={jsonView} // code模式
              wideScreen={wideScreen} // 宽屏和小屏的配置项
              schemaData={jsonSchema}
              jsonData={jsonData}
              dynamicDataList={dynamicDataList}
              onChange={(newJsonData) => {
                console.log('jsonDataChange', newJsonData);
                this.setState({
                  jsonData: newJsonData,
                });
              }}
            />
          </div>
        </div>
      </>
    );
  }
}

ReactDOM.render(
  <div>
    <h1 className="demoTitle">JSON数据可视化/JSONSchema Demo</h1>

    <br />

    <IndexDemo />
  </div>,
  document.getElementById('root'),
);
