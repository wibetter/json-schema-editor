import React, { Component } from 'react';
import { Row, Col, Select, Icon, Input, Tooltip } from 'antd';

import _ from 'underscore';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FieldInput from './FieldInput';

import { JSONPATH_JOIN_CHAR } from '../../utils';

import LocaleProvider from '../LocalProvider/index';

const { Option } = Select;

class SchemaSelectComponent extends Component {
  constructor(props, context) {
    super(props);
    this.Model = context.Model.schema;
  }

  componentWillMount() {
    const { prefix } = this.props;
    const { length } = prefix.filter((name) => name != 'properties');
    this.__tagPaddingLeftStyle = {
      paddingLeft: `${20 * (length + 1)}px`,
      marginBottom: '10px',
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
    const { value } = e.target;
    const tmpValue = JSON.parse(JSON.stringify([...data.items[title]]));
    tmpValue[i] = value;
    let totalValue = JSON.parse(JSON.stringify(data));
    totalValue.items[title] = tmpValue;
    totalValue = JSON.stringify(totalValue);

    this.Model.changeValueAction({
      key: [].concat(prefix.slice(0, prefix.length - 1)),
      value: JSON.parse(totalValue),
    });
    // this.Model.changeNameAction({ value, prefix, name });
  };

  // 修改备注信息
  handleChangeDesc = (e) => {
    const prefix = this.getPrefix();
    const key = [].concat(prefix, 'description');
    const { value } = e.target;
    this.Model.changeValueAction({ key, value });
  };

  //  增加子节点
  handleAddField = () => {
    const { prefix, name, data } = this.props;
    const tmpValue = [...data.items.enum];
    tmpValue[data.items.enum.length] = '默认选项';
    const tmpValue1 = [...data.items.enum];
    tmpValue1[data.items.enumextra.length] = '默认描述';
    const totalValue = { ...data };
    totalValue.items = {
      type: 'string',
      enum: tmpValue,
      enumextra: tmpValue1,
    };
    this.Model.changeValueAction({
      key: [].concat(prefix.slice(0, prefix.length - 1)),
      value: totalValue,
    });
  };

  handleDeleteItem = (i) => {
    const { prefix, name, data } = this.props;
    const enumArr = [...data.items.enum];
    const extarArr = [[...data.items.enum]];
    enumArr.splice(i, 1);
    extarArr.splice(i, 1);
    const totalValue = { ...data };
    totalValue.items.enum = enumArr;
    totalValue.items.enumextra = extarArr;
    this.Model.changeValueAction({
      key: [].concat(prefix.splice(0, prefix.length - 1)),
      value: totalValue,
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
    const value = data;
    const prefixArray = [].concat(prefix, name);
    const prefixStr = prefix.join(JSONPATH_JOIN_CHAR);
    const prefixArrayStr = []
      .concat(prefixArray, 'properties')
      .join(JSONPATH_JOIN_CHAR);
    const show = this.context.getOpenValue([prefixStr]);
    const showIcon = this.context.getOpenValue([prefixArrayStr]);
    return show ? (
      <div>
        {data.items.enum.map((d, i) => (
          <Row type="flex" justify="space-around" align="middle" key={i}>
            <Col
              span={12}
              className="col-item name-item col-item-name"
              style={this.__tagPaddingLeftStyle}
            >
              <Row type="flex" justify="space-around" align="middle">
                <Col span={2} className="down-style-col"></Col>
                <Col span={22}>
                  <FieldInput
                    onChange={(e) => {
                      this.handleChangeName(e, i, 'enum');
                    }}
                    value={d}
                  />
                </Col>
              </Row>
            </Col>

            <Col span={4} className="col-item col-item-type">
              <Select
                disabled={
                  !!(parentType === 'event' || parentType === 'datasource')
                }
                className="type-select-style"
                onChange={this.handleChangeType}
                value="string"
              >
                {['string'].map((item, index) => (
                  <Option value={item} key={index}>
                    {item}
                  </Option>
                ))}
              </Select>
            </Col>
            <Col span={5} className="col-item col-item-desc">
              <Input
                placeholder={LocaleProvider('description')}
                defaultValue={value.items.enumextra[i]}
                onChange={(e) => {
                  this.handleChangeName(e, i, 'enumextra');
                }}
              />
            </Col>

            <Col span={3} className="col-item col-item-setting">
              {parentType !== 'event' && parentType !== 'datasource' && (
                <div>
                  {data.items.enum.length > 1 && (
                    <span
                      className="delete-item"
                      onClick={() => {
                        this.handleDeleteItem(i);
                      }}
                    >
                      <Icon type="close" className="close" />
                    </span>
                  )}

                  {value.type === 'object' ? (
                    <DropPlus prefix={prefix} name={name} />
                  ) : (
                    <span onClick={this.handleAddField}>
                      <Tooltip
                        placement="top"
                        title={LocaleProvider('add_sibling_node')}
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

SchemaSelectComponent.contextTypes = {
  Model: PropTypes.object,
  getOpenValue: PropTypes.func,
};
const SchemaSelect = connect((state) => ({
  open: state.schema.open,
}))(SchemaSelectComponent);

export default SchemaSelect;
