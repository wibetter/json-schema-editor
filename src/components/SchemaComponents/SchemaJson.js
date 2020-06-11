import React from 'react';
import mapping from './mapping';
import './schemaJson.css';

const SchemaJson = (props) => {
  const item = mapping([], props.data, props.showEdit, props.showAdv);
  return <div className="schema-content">{item}</div>;
};

export default SchemaJson;
