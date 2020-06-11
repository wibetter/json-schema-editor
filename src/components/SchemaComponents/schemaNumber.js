import React, { Component } from 'react';
import { InputNumber } from 'antd';

import _ from 'underscore';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class SchemaNumberComponent extends Component {
  constructor(props, context) {
    super(props);
    this.Model = context.Model.schema;
  }

  shouldComponentUpdate(nextProps) {
    if (
      _.isEqual(nextProps.data, this.props.data)
      && _.isEqual(nextProps.prefix, this.props.prefix)
      && _.isEqual(nextProps.open, this.props.open)
    ) {
      return false;
    }
    return true;
  }

  changeValue = (value, title) => {
    const { data, name } = this.props;
    const tmpValue = { ...data };
    tmpValue[title] = value;
    this.Model.changeValueAction({
      key: name,
      value: tmpValue,
    });
  };

  render() {
    const { data } = this.props;

    return (
      <div className="array-inner-style">
        {Object.keys(data)
          .filter((d) => d !== 'type' && d !== 'description')
          .map((d, i) => (
            <div className="array-inner-item" key={i}>
              <span>{d}</span>
              <InputNumber
                defaultValue={data[d]}
                onChange={(value) => {
                  this.changeValue(value, d);
                }}
              />
            </div>
          ))}
      </div>
    );
  }
}
SchemaNumberComponent.contextTypes = {
  Model: PropTypes.object,
};
const SchemaNumber = connect((state) => ({
  open: state.schema.open,
}))(SchemaNumberComponent);

export default SchemaNumber;
