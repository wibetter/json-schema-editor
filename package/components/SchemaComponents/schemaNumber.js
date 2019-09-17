import React, { Component, PureComponent } from "react";
import {
  Dropdown,
  Menu,
  Row,
  Col,
  Form,
  Select,
  Checkbox,
  Button,
  Icon,
  Input,
  Modal,
  message,
  Tooltip,
  InputNumber,
  Table,
  Tag,
  Divider
} from "antd";
import FieldInput from "./FieldInput";

import utils from "../../utils";

import _ from "underscore";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import SchemaItem from "./schemaItem";

import { JSONPATH_JOIN_CHAR, SCHEMA_TYPE } from "../../utils.js";

import LocaleProvider from "../LocalProvider/index.js";

import MockSelect from "../MockSelect/index.js";

import mapping from "./mapping";

class SchemaNumberComponent extends Component {
  constructor(props, context) {
    super(props);
    this.Model = context.Model.schema;
  }

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

  changeValue = (value, title) => {
    const { data, name } = this.props;
    const tmpValue = { ...data };
    tmpValue[title] = value;
    this.Model.changeValueAction({
      key: ["properties", name.splice(name.length - 1, name.length)],
      value: tmpValue
    });
  };

  render() {
    const { data, prefix, showEdit, showAdv, level } = this.props;

    return (
      <div className="array-inner-style">
        {Object.keys(data)
          .filter(d => d !== "type" && d !== "description")
          .map((d, i) => (
            <div className="array-inner-item" key={i}>
              <span>{d}</span>
              <InputNumber
                defaultValue={data[d]}
                onChange={value => {
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
  Model: PropTypes.object
};
const SchemaNumber = connect(state => ({
  open: state.schema.open
}))(SchemaNumberComponent);

export default SchemaNumber;
