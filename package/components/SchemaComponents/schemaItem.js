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

import {
  JSONPATH_JOIN_CHAR,
  SCHEMA_TYPE,
  FUNCSCHEME_TYPE,
  STYLESCHEME_TYPE,
  DATASCHEME_TYPE
} from "../../utils.js";

import LocaleProvider from "../LocalProvider/index.js";

import MockSelect from "../MockSelect/index.js";

import mapping from "./mapping";

import DropPlus from "./dropplus";
const { Option } = Select;

class SchemaItem extends PureComponent {
  constructor(props, context) {
    super(props);
    this._tagPaddingLeftStyle = {};
    // this.num = 0
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
    return [].concat(this.props.prefix, this.props.name);
  }

  // 修改节点字段名
  handleChangeName = value => {
    const { data, prefix, name } = this.props;

    if (data.properties[value] && typeof data.properties[value] === "object") {
      return message.error(`The field "${value}" already exists.`);
    }
    // this.Model.changeNameAction({
    //   value,
    //   prefix: [].concat(prefix, name),
    //   name: "local"
    // });
    this.Model.changeValueAction({
      key: [].concat(prefix, [name, "default"]),
      value: value
    });
  };

  // 修改备注信息
  handleChangeDesc = e => {
    let prefix = this.getPrefix();
    let key = [].concat(prefix, "description");
    let value = e.target.value;
    this.Model.changeValueAction({ key, value });
  };

  // 修改mock 信息
  handleChangeMock = e => {
    let prefix = this.getPrefix();
    let key = [].concat(prefix, `mock`);
    let value = e ? { mock: e } : "";
    this.Model.changeValueAction({ key, value });
  };

  // 修改数据类型
  handleChangeType = e => {
    let prefix = this.getPrefix();
    let key = [].concat(prefix, "type");
    this.Model.changeTypeAction({ key, value: e });
  };

  // 删除节点
  handleDeleteItem = () => {
    const { prefix, name } = this.props;
    let nameArray = this.getPrefix();
    this.Model.deleteItemAction({ key: nameArray });
    this.Model.enableRequireAction({ prefix, name, required: false });
  };
  /*
    展示备注编辑弹窗
    editorName: 弹窗名称 ['description', 'mock']
    type: 如果当前字段是object || array showEdit 不可用
    */
  handleShowEdit = (editorName, type) => {
    const { data, name, showEdit } = this.props;

    showEdit(
      this.getPrefix(),
      editorName,
      data.properties[name][editorName],
      type
    );
  };

  // 展示高级设置弹窗
  handleShowAdv = () => {
    const { data, name, showAdv } = this.props;
    showAdv(this.getPrefix(), data.properties[name]);
  };

  //  增加相邻
  handleAddField = () => {
    const { prefix, name } = this.props;
    this.Model.addFieldAction({
      prefix,
      name
    });
    //this.Model.addChildFieldAction({ key: ["properties"] });
  };

  // 增加子节点

  handleChildNode = () => {
    const { prefix, name } = this.props;
    this.Model.setOpenValueAction({
      key: [].concat(prefix, name, "properties"),
      value: true
    });
    this.Model.addChildFieldAction({
      key: [].concat(prefix, name, "properties")
    });
  };

  // 控制三角形按钮
  handleClickIcon = () => {
    let prefix = this.getPrefix();
    // 数据存储在 properties.xxx.properties 下
    let keyArr = [].concat(prefix, "properties");
    this.Model.setOpenValueAction({ key: keyArr });
  };

  // 修改是否必须
  handleEnableRequire = e => {
    const { prefix, name } = this.props;
    let required = e.target.checked;
    // this.enableRequire(this.props.prefix, this.props.name, e.target.checked);
    this.Model.enableRequireAction({ prefix, name, required });
  };

  renderTypeSelectOption = typeArr => {
    return typeArr.map((item, index) => {
      return (
        <Option value={item} key={index}>
          {item}
        </Option>
      );
    });
  };

  renderTypeSelect = format => {
    switch (format) {
      case "func":
        return this.renderTypeSelectOption(FUNCSCHEME_TYPE);
      case "style":
        return this.renderTypeSelectOption(STYLESCHEME_TYPE);
      case "data":
        return this.renderTypeSelectOption(DATASCHEME_TYPE);
      default:
        return this.renderTypeSelectOption(SCHEMA_TYPE);
    }
  };

  render() {
    let {
      name,
      data,
      prefix,
      showEdit,
      showAdv,
      level,
      parentType
    } = this.props;
    let value = data.properties[name];
    let prefixArray = [].concat(prefix, name);
    let prefixStr = prefix.join(JSONPATH_JOIN_CHAR);
    let prefixArrayStr = []
      .concat(prefixArray, "properties")
      .join(JSONPATH_JOIN_CHAR);
    let show = this.context.getOpenValue([prefixStr]);
    let showIcon = this.context.getOpenValue([prefixArrayStr]);
    return show ? (
      <div>
        <Row type="flex" justify="space-around" align="middle">
          <Col
            span={12}
            className="col-item name-item col-item-name"
            style={this.__tagPaddingLeftStyle}
          >
            <Row type="flex" justify="space-around" align="middle">
              <Col span={2} className="down-style-col">
                {utils.canDropDown(value.type, value.format) ? (
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
                {value.format &&
                (value.format === "quantitySelect" ||
                  value.format === "typeSelect") ? (
                  <Select
                    defaultValue={value.default}
                    onChange={this.handleChangeName}
                    style={{ width: "100%" }}
                  >
                    {value.enum.map((d, i) => (
                      <Option value={d} key={i}>
                        {d}
                      </Option>
                    ))}
                  </Select>
                ) : (
                  <FieldInput
                    onChange={e => {
                      let value = e.target.value;
                      this.handleChangeName(value);
                    }}
                    disabled={value.readOnly ? true : false}
                    value={name}
                  />
                )}
              </Col>
            </Row>
          </Col>

          <Col span={4} className="col-item col-item-type">
            <Select
              className="type-select-style"
              onChange={this.handleChangeType}
              value={value.format || value.type}
              disabled={
                value.format === "func" ||
                value.format === "style" ||
                value.format === "data"
                  ? true
                  : false
              }
            >
              {this.renderTypeSelect(parentType)}
            </Select>
          </Col>

          <Col span={5} className="col-item col-item-desc">
            <Input
              placeholder={LocaleProvider("description")}
              value={value.description}
              onChange={this.handleChangeDesc}
              disabled={
                value.format === "func" ||
                value.format === "style" ||
                value.format === "data"
                  ? true
                  : false
              }
            />
          </Col>

          <Col span={3} className="col-item col-item-setting">
            {((parentType !== "event" && parentType !== "datasource") ||
              (parentType === "datasource" &&
                (name !== "name" && name !== "filter" && name !== "type"))) && (
              <div>
                {parentType !== "quantity" &&
                  value.format !== "func" &&
                  value.format !== "style" &&
                  value.format !== "data" && (
                    <span
                      className="delete-item"
                      onClick={this.handleDeleteItem}
                    >
                      <Icon type="close" className="close" />
                    </span>
                  )}
                {parentType !== "quantity" &&
                  (value.type === "object" &&
                  value.format !== "quantity" &&
                  value.format !== "datasource" &&
                  value.format !== "event" ? (
                    <span onClick={this.handleChildNode}>
                      <Tooltip
                        placement="top"
                        title={LocaleProvider("child_node")}
                      >
                        <Icon type="plus" className="plus" />
                      </Tooltip>
                    </span>
                  ) : (
                    <span onClick={this.handleAddField}>
                      <Tooltip
                        placement="top"
                        title={LocaleProvider("add_sibling_node")}
                      >
                        <Icon type="plus" className="plus" />
                      </Tooltip>
                    </span>
                  ))}
              </div>
            )}
          </Col>
        </Row>
        <div className="option-formStyle">
          {mapping(prefixArray, value, showEdit, showAdv)}
        </div>
      </div>
    ) : null;
  }
}

SchemaItem.contextTypes = {
  getOpenValue: PropTypes.func,
  Model: PropTypes.object,
  isMock: PropTypes.bool
};

export default SchemaItem;
