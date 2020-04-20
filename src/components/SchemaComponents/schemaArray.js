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

import utils from "../../utils";

import _ from "underscore";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import SchemaItem from "./schemaItem";

import { JSONPATH_JOIN_CHAR, SCHEMA_TYPE } from "../../utils";

import LocaleProvider from "../LocalProvider/index.js";

import MockSelect from "../MockSelect/index.js";

import mapping from "./mapping";
const { Option } = Select;
class SchemaArray extends PureComponent {
  constructor(props, context) {
    super(props);
    this._tagPaddingLeftStyle = {};
    this.Model = context.Model.schema;
  }

  componentWillMount() {
    const { prefix } = this.props;
    let length = prefix.filter(name => name != "properties").length;
    this.__tagPaddingLeftStyle = {
      paddingLeft: `${20 * (length + 1)}px`
    };
  }

  getPrefix() {
    return [].concat(this.props.prefix, "items");
  }

  // 修改数据类型
  handleChangeType = value => {
    let prefix = this.getPrefix();
    let key = [].concat(prefix, "type");

    this.Model.changeTypeAction({ key, value });
  };

  // 修改备注信息
  handleChangeDesc = e => {
    let prefix = this.getPrefix();
    let key = [].concat(prefix, `description`);
    let value = e.target.value;
    this.Model.changeValueAction({ key, value });
  };

  // 修改mock信息
  handleChangeMock = e => {
    let prefix = this.getPrefix();
    let key = [].concat(prefix, `mock`);
    let value = e ? { mock: e } : "";
    this.Model.changeValueAction({ key, value });
  };

  // 增加子节点
  handleAddChildField = () => {
    let prefix = this.getPrefix();
    let keyArr = [].concat(prefix, "properties");
    this.Model.addChildFieldAction({ key: keyArr });
    this.Model.setOpenValueAction({ key: keyArr, value: true });
  };

  handleClickIcon = () => {
    let prefix = this.getPrefix();
    // 数据存储在 properties.name.properties下
    let keyArr = [].concat(prefix, "properties");
    this.Model.setOpenValueAction({ key: keyArr });
  };

  handleShowEdit = (name, type) => {
    let prefix = this.getPrefix();
    this.props.showEdit(prefix, name, this.props.data.items[name], type);
  };

  handleShowAdv = () => {
    this.props.showAdv(this.getPrefix(), this.props.data.items);
  };

  render() {
    const { data, prefix, showEdit, showAdv } = this.props;
    const items = data.items;
    let prefixArray = [].concat(prefix, "items");

    let prefixArrayStr = []
      .concat(prefixArray, "properties")
      .join(JSONPATH_JOIN_CHAR);
    let showIcon = this.context.getOpenValue([prefixArrayStr]);

    return (
      !_.isUndefined(data.items) && (
        <div className="array-type">
          <Row
            className="array-item-type"
            type="flex"
            justify="space-around"
            align="middle"
          >
            <Col
              span={12}
              className="col-item name-item col-item-name"
              style={this.__tagPaddingLeftStyle}
            >
              <Row type="flex" justify="space-around" align="middle">
                <Col span={2} className="down-style-col">
                  {items.type === "object" ? (
                    <span className="down-style" onClick={this.handleClickIcon}>
                      {showIcon ? (
                        <Icon className="icon-object" type="caret-down" />
                      ) : (
                        <Icon className="icon-object" type="caret-right" />
                      )}
                    </span>
                  ) : null}
                </Col>
                <Col span={22}>
                  <Input
                    // addonAfter={<Checkbox disabled />}
                    disabled
                    value="Items"
                  />
                </Col>
              </Row>
            </Col>
            <Col span={4} className="col-item col-item-type">
              <Select
                name="itemtype"
                className="type-select-style"
                onChange={this.handleChangeType}
                value={items.type}
                disabled={
                  data.format === "array" && data.type === "array"
                    ? true
                    : false
                }
              >
                {SCHEMA_TYPE.map((item, index) => {
                  return (
                    <Option value={item} key={index}>
                      {item}
                    </Option>
                  );
                })}
              </Select>
            </Col>
            <Col span={5} className="col-item col-item-desc">
              <Input
                // addonAfter={
                //   <Icon
                //     type="edit"
                //     onClick={() => this.handleShowEdit("description")}
                //   />
                // }
                placeholder={LocaleProvider("description")}
                value={items.description}
                onChange={this.handleChangeDesc}
              />
            </Col>
            <Col span={3} className="col-item col-item-setting">
              {items.type === "object" ? (
                <span onClick={this.handleAddChildField}>
                  <Tooltip
                    placement="top"
                    title={LocaleProvider("add_child_node")}
                  >
                    <Icon type="plus" className="plus" />
                  </Tooltip>
                </span>
              ) : null}
            </Col>
          </Row>
          <div className="option-formStyle">
            {mapping(prefixArray, items, showEdit, showAdv)}
          </div>
        </div>
      )
    );
  }
}

SchemaArray.contextTypes = {
  getOpenValue: PropTypes.func,
  Model: PropTypes.object,
  isMock: PropTypes.bool
};

export default SchemaArray;
