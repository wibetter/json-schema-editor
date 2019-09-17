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
const { Option } = Select;

class SchemaRadioComponent extends Component {
  constructor(props, context) {
    super(props);
    this.Model = context.Model.schema;
  }

  componentWillMount() {
    const { prefix } = this.props;
    let length = prefix.filter(name => name != "properties").length;
    this.__tagPaddingLeftStyle = {
      paddingLeft: `${20 * (length + 1)}px`,
      marginBottom: "10px"
    };
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

  // 修改节点字段名
  handleChangeName = (e, i, title) => {
    const { data, prefix, name } = this.props;
    let value = e.target.value;
    let tmpValue = [...data[title]];
    tmpValue[i] = value;
    let totalValue = { ...data };
    totalValue[title] = tmpValue;

    this.Model.changeValueAction({
      key: [].concat(prefix.slice(0, prefix.length - 1)),
      value: totalValue
    });
    // this.Model.changeNameAction({ value, prefix, name });
  };

  // 修改备注信息
  handleChangeDesc = e => {
    let prefix = this.getPrefix();
    let key = [].concat(prefix, "description");
    let value = e.target.value;
    this.Model.changeValueAction({ key, value });
  };

  //  增加子节点
  handleAddField = () => {
    const { prefix, name, data } = this.props;
    let tmpValue = [...data.enum];
    tmpValue[data.enum.length] = "默认选项";
    let tmpValue1 = [...data.enum];
    tmpValue1[data.enumextra.length] = "默认描述";
    let totalValue = { ...data };
    totalValue.enum = tmpValue;
    totalValue.enumextra = tmpValue;
    this.Model.changeValueAction({
      key: [].concat(prefix.slice(0, prefix.length - 1)),
      value: totalValue
    });
  };

  handleDeleteItem = i => {
    const { prefix, name, data } = this.props;
    let enumArr = [...data.enum];
    let extarArr = [[...data.enum]];
    enumArr.splice(i, 1);
    extarArr.splice(i, 1);
    let totalValue = { ...data };
    totalValue.enum = enumArr;
    totalValue.enumextra = extarArr;
    this.Model.changeValueAction({
      key: [].concat(prefix.splice(0, prefix.length - 1)),
      value: totalValue
    });
  };

  //   changeValue = (value, title) => {
  //     const { data, name } = this.props;
  //     const tmpValue = { ...data };
  //     tmpValue[title] = value;
  //     this.Model.changeValueAction({
  //       key: ["properties", name.splice(name.length - 1, name.length)],
  //       value: tmpValue
  //     });
  //   };

  render() {
    const { name, data, prefix, level, parentType } = this.props;
    let value = data;
    let prefixArray = [].concat(prefix, name);
    let prefixStr = prefix.join(JSONPATH_JOIN_CHAR);
    let prefixArrayStr = []
      .concat(prefixArray, "properties")
      .join(JSONPATH_JOIN_CHAR);
    let show = this.context.getOpenValue([prefixStr]);
    let showIcon = this.context.getOpenValue([prefixArrayStr]);
    return show ? (
      <div>
        {data.enum.map((d, i) => (
          <Row type="flex" justify="space-around" align="middle" key={i}>
            <Col
              span={12}
              className="col-item name-item col-item-name"
              style={this.__tagPaddingLeftStyle}
            >
              <Row type="flex" justify="space-around" align="middle">
                <Col span={2} className="down-style-col">
                  {utils.canDropDown(value.type) ? (
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
                  <FieldInput
                    // addonAfter={
                    //   <Tooltip
                    //     placement="top"
                    //     title={LocaleProvider("required")}
                    //   >
                    //     <Checkbox
                    //       onChange={this.handleEnableRequire}
                    //       disabled={
                    //         parentType === "event" ||
                    //         parentType === "datasource"
                    //           ? true
                    //           : level === 0 &&
                    //             (value === "tpl" || value === "css")
                    //           ? true
                    //           : false
                    //       }
                    //       checked={
                    //         _.isUndefined(data.required)
                    //           ? false
                    //           : data.required.indexOf(name) != -1
                    //       }
                    //     />
                    //   </Tooltip>
                    // }
                    onChange={e => {
                      this.handleChangeName(e, i, "enum");
                    }}
                    value={d}
                  />
                </Col>
              </Row>
            </Col>

            <Col span={4} className="col-item col-item-type">
              <Select
                disabled={
                  parentType === "event" || parentType === "datasource"
                    ? true
                    : false
                }
                className="type-select-style"
                onChange={this.handleChangeType}
                value="string"
              >
                {["string"].map((item, index) => {
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
                defaultValue={value.enumextra[i]}
                onChange={e => {
                  this.handleChangeName(e, i, "enumextra");
                }}
              />
            </Col>

            <Col span={3} className="col-item col-item-setting">
              {parentType !== "event" && parentType !== "datasource" && (
                <div>
                  {data.enum.length > 2 && (
                    <span
                      className="delete-item"
                      onClick={this.handleDeleteItem.bind(this, i)}
                    >
                      <Icon type="close" className="close" />
                    </span>
                  )}

                  {value.type === "object" ? (
                    <DropPlus prefix={prefix} name={name} />
                  ) : (
                    <span onClick={this.handleAddField}>
                      <Tooltip
                        placement="top"
                        title={LocaleProvider("add_sibling_node")}
                      >
                        <Icon type="plus" className="plus" />
                      </Tooltip>
                    </span>
                  )}
                </div>
              )}
            </Col>
          </Row>
        ))}
      </div>
    ) : null;
  }
}

SchemaRadioComponent.contextTypes = {
  Model: PropTypes.object,
  getOpenValue: PropTypes.func
};
const SchemaRadio = connect(state => ({
  open: state.schema.open
}))(SchemaRadioComponent);

export default SchemaRadio;
