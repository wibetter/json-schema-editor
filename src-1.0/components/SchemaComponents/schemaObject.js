import React, { Component } from 'react';

import _ from 'underscore';
import { connect } from 'react-redux';

import SchemaItem from './schemaItem';

class SchemaObjectComponent extends Component {
  shouldComponentUpdate(nextProps) {
    if (
      _.isEqual(nextProps.data, this.props.data) &&
      _.isEqual(nextProps.prefix, this.props.prefix) &&
      _.isEqual(nextProps.open, this.props.open)
    ) {
      return false;
    }
    return true;
  }

  render() {
    const { data, prefix, showEdit, showAdv, level } = this.props;
    return (
      <div className="object-style">
        {Object.keys(data.properties).map((name, index) => (
          <SchemaItem
            key={index}
            data={this.props.data}
            name={name}
            prefix={prefix}
            showEdit={showEdit}
            showAdv={showAdv}
            level={level}
            parentType={data.format || data.type}
          />
        ))}
      </div>
    );
  }
}

const SchemaObject = connect((state) => ({
  open: state.schema.open,
}))(SchemaObjectComponent);

export default SchemaObject;
