# json-schema-editor

> JSON数据可视化/JSONSchema, 以可视化界面编辑json schema数据（带结构/格式的json数据）。

技术栈：React/Mobx/Ant Design

特点：
1. 支持11种基础类型组件（input、boolean、 date、date-time、 time、 url、 textarea、number、color、radio、 select）
2. 支持10个特殊类型组件（object、array、Json、datasource、dynamic-data、event、codearea、htmlarea、text-editor、quantity）
3. 拖拽排序
4. 复制功能
5. 复杂嵌套
6. 高级配置功能

## 功能示例

![image](https://user-images.githubusercontent.com/11958920/104154681-78f5e680-5420-11eb-978f-6219acfa933d.png)

## 安装

```bash
npm install --save @wibtter/json-schema-editor
```


## 使用示例

```js
import * as React from 'react';
import JSONSchemaEditor from '@wibetter/json-schema-editor';
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
| `schemaData` | object   | {}      | json schema（带结构的json数据）    |
| `onChange`   | function | () => {}  | schemaData内容变动时会触发onChange |
