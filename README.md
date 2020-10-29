# json-schema-editor

> JSON数据可视化/JSONSchema, 主要用于json结构/格式（json schema）的可视化编辑

使用场景：主要用于json结构/格式（json schema）的可视化编辑

技术栈：React/Mobx/Ant Design

特点：
1. 支持11种基础类型组件（input、boolean、 date、date-time、 time、 url、 textarea、number、color、radio、 select）
2. 支持9个特殊类型组件（Object、Array、Json、datasource、dynamic-data、Event、CodeArea、htmlArea、quantity）
3. 拖拽排序
4. 复制功能
5. 复杂嵌套
6. 高级配置功能

## 功能示例

##### JSON结构数据源（jsonSchema）：
```
{
        type: 'object',
        format: 'object',
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
      }
```

##### JSONSchema编辑界面：
![image](https://user-images.githubusercontent.com/11958920/97534045-4a0cce80-19f4-11eb-9cad-4373fc23495f.png)

***

## 安装

```bash
npm install --save @wibetter/json-schema-editor
```


## 使用示例

```js
import * as React from 'react';
import JSONSchemaEditor from '@wibetter/json-schema-editor/dist/index.umd';
import '@wibetter/json-schema-editor/dist/index.css';

class IndexDemo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      jsonSchema: {},
    };
  }

  render() {
    const { jsonSchema } = this.state;
    return (
      <>
        <div className="json-action-container">
          <div className="json-schema-box">
             <JSONSchemaEditor
                data={jsonSchema}
                onChange={(newJsonSchema) => {
                  console.log('jsonSchemaChange', JSON.stringify(newJsonSchema));
                  this.setState({
                    jsonSchema: newJsonSchema,
                  });
                }}
             />
          </div>
        </div>
      </>
    );
  }
}
```

## JSONSchema 可配置参数说明

| name         | type     | default | desc                            |
| ------------ | -------- | ------- | ------------------------------- |
| `schemaData` | object   | {}      | json的结构数据（json schema）      |
| `onChange`   | function | () => {}  | schemaData内容变动时会触发onChange |
