import React from 'react';

import SchemaArray from './schemaArray';
import SchemaObject from './schemaObject';
import SchemaNumber from './schemaNumber';
import SchemaRadio from './schemaRadio';
import SchemaSelect from './schemaSelect';

const mapping = (name, data, showEdit, showAdv) => {
  let { type } = data;
  if (data.format === 'radio' || data.format === 'select') {
    type = data.format;
  }

  switch (type) {
    case 'array':
      return (
        <SchemaArray
          prefix={name}
          data={data}
          showEdit={showEdit}
          showAdv={showAdv}
        />
      );
      break;
    case 'object':
      return (
        <SchemaObject
          prefix={[].concat(name, 'properties')}
          data={data}
          showEdit={showEdit}
          showAdv={showAdv}
          level={name.length}
        />
      );
      break;
    case 'number':
      return (
        <SchemaNumber
          name={name}
          prefix={[].concat(name, 'properties')}
          data={data}
          showEdit={showEdit}
          showAdv={showAdv}
          level={name.length}
        />
      );
      break;
    case 'radio':
      return (
        <SchemaRadio
          name={name}
          prefix={[].concat(name, 'properties')}
          data={data}
          showEdit={showEdit}
          showAdv={showAdv}
          level={name.length}
        />
      );
      break;
    case 'select':
      return (
        <SchemaSelect
          name={name}
          prefix={[].concat(name, 'properties')}
          data={data}
          showEdit={showEdit}
          showAdv={showAdv}
          level={name.length}
        />
      );
      break;
    default:
      return null;
  }
};

export default mapping;
