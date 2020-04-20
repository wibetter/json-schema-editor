# json-schema-editor-visual

A json-schema editor of high efficient and easy-to-use, base on React.


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

|  name  | desc                                 | default |
| ------ | ------------------------------------ | ------- |
| `lang` | language, support `en_US` or `zh_CN` | en_US   |

## SchemaEditor Props

| name         | type     | default | desc               |
| ------------ | -------- | ------- | ------------------ |
| `data`       | string   | null    | the data of editor |
| `onChange`   | function | null    |
| `showEditor` | boolean  | false   |
