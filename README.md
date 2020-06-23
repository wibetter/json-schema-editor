# json-schema-editor

> JSON数据可视化/JSONSchema

## Install

```bash
npm install --save @jdwork/json-schema-editor
```

## Usage

```jsx
import React, { Component } from 'react';

import JSONSchemaEditor from '@jdwork/json-schema-editor';
import '@jdwork/json-schema-editor/dist/index.css';

const SchemaEditorElem = JSONSchemaEditor(option);
const option = {};

class Example extends Component {
  render() {
    return <SchemaEditorElem />
  }
}
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

## License
