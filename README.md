# json-schema-editor-visual

A json-schema editor of high efficient and easy-to-use, base on React.

## dev

```
yarn start
```

浏览器打开： http://127.0.0.1:8084/index.html

将 package/json.json 中的内容拷贝到输入框，即可查看效果。

## build

```
yarn build
```

## upload

修改版本号

```
npm publish
```

## Usage

```
npm install json-schema-editor-visual
```

```js
const option = {};
import "antd/dist/antd.css";
require("json-schema-editor-visual/dist/main.css");
const schemaEditor = require("json-schema-editor-visual/dist/main.js");
const SchemaEditor = schemaEditor(option);

render(<SchemaEditor />, document.getElementById("root"));
```

## Option Object

| name | desc                                 | default |
| ---- | ------------------------------------ | ------- |
| `lg` | language, support `en_US` or `zh_CN` | en_US   |

## SchemaEditor Props

| name         | type     | default | desc               |
| ------------ | -------- | ------- | ------------------ |
| `data`       | string   | null    | the data of editor |
| `onChange`   | function | null    |
| `showEditor` | boolean  | false   |
