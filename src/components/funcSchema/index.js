import * as React from 'react';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import { Row, Col, Select, Icon, Input, message, Tooltip } from 'antd';
import * as utils from '../../../src-1.0/utils';
import LocaleProvider from '../../../src-1.0/components/LocalProvider';
import mapping from '../../../src-1.0/components/SchemaComponents/mapping';

class FieldInput extends React.PureComponent {
  static propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
    };
  }

  handleChange = (e) => {
    const { value } = e.target;
    this.setState({
      value,
    });
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setState({
        value: nextProps.value,
      });
    }
  }

  onKeyup = (e) => {
    if (e.keyCode === 13) {
      if (e.target.value !== this.props.value) {
      }
    }
  };

  handleBlur = (e) => {
    if (e.target.value !== this.props.value) {
    }
  };

  render() {
    const { value } = this.state;
    const { onChange, disabled } = this.props;

    return (
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
                (value.format === 'quantitySelect' ||
                  value.format === 'typeSelect') ? (
                  <Select
                    defaultValue={value.default}
                    onChange={(e) => {
                      this.handleChangeName(e, value.format);
                    }}
                    style={{ width: '100%' }}
                  >
                    {value.enum.map((d, i) => (
                      <Option value={d} key={i}>
                        {d}
                      </Option>
                    ))}
                  </Select>
                ) : (
                  <FieldInput
                    onChange={(e) => {
                      this.handleChangeName(e.target.value, value.format);
                    }}
                    disabled={!!value.readOnly}
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
                !!(
                  value.format === 'func' ||
                  value.format === 'style' ||
                  value.format === 'data' ||
                  parentType === 'datasource' ||
                  parentType === 'event'
                )
              }
            >
              {this.renderTypeSelect(parentType)}
            </Select>
          </Col>
          <Col span={5} className="col-item col-item-desc">
            <Input
              placeholder={LocaleProvider('description')}
              value={value.description}
              onChange={this.handleChangeDesc}
              disabled={
                !!(
                  value.format === 'func' ||
                  value.format === 'style' ||
                  value.format === 'data'
                )
              }
            />
          </Col>

          <Col span={3} className="col-item col-item-setting">
            {((parentType !== 'event' && parentType !== 'datasource') ||
              (parentType === 'datasource' &&
                name !== 'name' &&
                name !== 'filter' &&
                name !== 'type')) && (
              <div>
                {parentType !== 'quantity' &&
                  value.format !== 'func' &&
                  value.format !== 'style' &&
                  value.format !== 'data' && (
                    <span
                      className="delete-item"
                      onClick={this.handleDeleteItem}
                    >
                      <Icon type="close" className="close" />
                    </span>
                  )}
                {parentType !== 'quantity' &&
                  (value.type === 'object' &&
                  value.format !== 'quantity' &&
                  value.format !== 'datasource' &&
                  value.format !== 'event' ? (
                    <span onClick={this.handleChildNode}>
                      <Tooltip
                        placement="top"
                        title={LocaleProvider('child_node')}
                      >
                        <Icon type="plus" className="plus" />
                      </Tooltip>
                    </span>
                  ) : (
                    <span onClick={this.handleAddField}>
                      <Tooltip
                        placement="top"
                        title={LocaleProvider('add_sibling_node')}
                      >
                        <Icon type="plus" className="plus" />
                      </Tooltip>
                    </span>
                  ))}
              </div>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

export default inject((stores) => ({
  jsonSchema: stores.jsonSchema,
}))(observer(FieldInput));
