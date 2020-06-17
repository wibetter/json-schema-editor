import React, { PureComponent } from 'react';
import { Row, Col, Select, Icon, Input, Tooltip } from 'antd';

import _ from 'underscore';
import PropTypes from 'prop-types';

import { JSONPATH_JOIN_CHAR, SCHEMA_TYPE } from '../../utils';

import LocaleProvider from '../LocalProvider/index';

import mapping from './mapping';
const { Option } = Select;

class SchemaArray extends PureComponent {
  constructor(props, context) {
    super(props);
    this._tagPaddingLeftStyle = {};
    this.Model = context.Model.schema;
  }

  componentWillMount() {
    const { prefix } = this.props;
    const { length } = prefix.filter((name) => name != 'properties');
    this.__tagPaddingLeftStyle = {
      paddingLeft: `${20 * (length + 1)}px`,
    };
  }

  getPrefix() {
    return [].concat(this.props.prefix, 'items');
  }

  // 修改数据类型
  handleChangeType = (value) => {
    const prefix = this.getPrefix();
    const key = [].concat(prefix, 'type');

    this.Model.changeTypeAction({ key, value });
  };

  // 修改备注信息
  handleChangeDesc = (e) => {
    const prefix = this.getPrefix();
    const key = [].concat(prefix, 'description');
    const { value } = e.target;
    this.Model.changeValueAction({ key, value });
  };

  // 修改mock信息
  handleChangeMock = (e) => {
    const prefix = this.getPrefix();
    const key = [].concat(prefix, 'mock');
    const value = e ? { mock: e } : '';
    this.Model.changeValueAction({ key, value });
  };

  // 增加子节点
  handleAddChildField = () => {
    const prefix = this.getPrefix();
    const keyArr = [].concat(prefix, 'properties');
    this.Model.addChildFieldAction({ key: keyArr });
    this.Model.setOpenValueAction({ key: keyArr, value: true });
  };

  handleClickIcon = () => {
    const prefix = this.getPrefix();
    // 数据存储在 properties.name.properties下
    const keyArr = [].concat(prefix, 'properties');
    this.Model.setOpenValueAction({ key: keyArr });
  };

  handleShowEdit = (name, type) => {
    const prefix = this.getPrefix();
    this.props.showEdit(prefix, name, this.props.data.items[name], type);
  };

  handleShowAdv = () => {
    this.props.showAdv(this.getPrefix(), this.props.data.items);
  };

  render() {
    const { data, prefix, showEdit, showAdv } = this.props;
    const { items } = data;
    const prefixArray = [].concat(prefix, 'items');

    const prefixArrayStr = []
      .concat(prefixArray, 'properties')
      .join(JSONPATH_JOIN_CHAR);
    const showIcon = this.context.getOpenValue([prefixArrayStr]);

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
                  {items.type === 'object' ? (
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
                disabled={!!(data.format === 'array' && data.type === 'array')}
              >
                {SCHEMA_TYPE.map((item, index) => (
                  <Option value={item} key={index}>
                    {item}
                  </Option>
                ))}
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
                placeholder={LocaleProvider('description')}
                value={items.description}
                onChange={this.handleChangeDesc}
              />
            </Col>
            <Col span={3} className="col-item col-item-setting">
              {items.type === 'object' ? (
                <span onClick={this.handleAddChildField}>
                  <Tooltip
                    placement="top"
                    title={LocaleProvider('add_child_node')}
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
  isMock: PropTypes.bool,
};

export default SchemaArray;
