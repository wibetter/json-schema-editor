# json-schema-editor

> JSON数据可视化/JSONSchema, 主要用于json结构/格式的可视化编辑

使用场景：主要用于json结构/格式的可视化编辑

技术栈：React/Mobx/Ant Design

Demo：http://qcsatw77d.bkt.clouddn.com/demoV3.1.13.html

特点：
1. 支持11种基础类型组件（input、boolean、 date、date-time、 time、 url、 textarea、number、color、radio、 select）
2. 支持8个特殊类型组件（Object、Array、Json、datasource、Event、CodeArea、htmlArea、quantity）
3. 拖拽排序
4. 复制功能
5. 复杂嵌套
6. 高级配置功能

## Install

```bash
npm install --save @wibetter/json-schema-editor
```


## Usage

```
npm install --save @wibetter/json-schema-editor
```

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

## JSONSchema Props

| name         | type     | default | desc                            |
| ------------ | -------- | ------- | ------------------------------- |
| `schemaData` | object   | {}      | json的结构数据                    |
| `onChange`   | function | null    | schemaData内容变动时会触发onChange |
