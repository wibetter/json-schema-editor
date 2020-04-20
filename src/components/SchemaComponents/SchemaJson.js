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
  Tooltip
} from "antd";
import FieldInput from "./FieldInput";

const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;
import "./schemaJson.css";
import _ from "underscore";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const InputGroup = Input.Group;
import LocaleProvider from "../LocalProvider/index.js";
import utils from "../../utils";

import mapping from "./mapping";

const SchemaJson = props => {
  const item = mapping([], props.data, props.showEdit, props.showAdv);
  return <div className="schema-content">{item}</div>;
};

export default SchemaJson;
