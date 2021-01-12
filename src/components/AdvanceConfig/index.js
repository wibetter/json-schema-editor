import * as React from 'react';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import { Input, Switch, InputNumber, Checkbox, Radio, Tooltip } from 'antd';
const { TextArea } = Input;
import {
  isNeedDescriptionOption,
  isNeedDefaultOption,
  isNeedPlaceholderOption,
  isNeedReadOnlyOption,
  isNeedIsRequiredOption,
  isNeedMinMaxOption,
  isNeedMinMaxChildOption,
} from '$utils/advanced.config';
import { getCurrentFormat } from '@wibetter/json-utils';
import './index.scss';

class AdvanceConfig extends React.PureComponent {
  static propTypes = {
    jsonKey: PropTypes.string,
    indexRoute: PropTypes.string,
    nodeKey: PropTypes.string,
    targetJsonSchema: PropTypes.any,
  };

  constructor(props) {
    super(props);
    // 这边绑定是必要的，这样 `this` 才能在回调函数中使用
    this.handleValueChange = this.handleValueChange.bind(this);
  }

  /** 数值变动事件处理器 */
  handleValueChange = (curKey, newVal) => {
    const { indexRoute, jsonKey, targetJsonSchema, editJsonData } = this.props;
    if (targetJsonSchema[curKey] === newVal) return; // title值未改变则直接跳出
    const newJsonData = {};
    newJsonData[curKey] = newVal;
    editJsonData(indexRoute, jsonKey, newJsonData);
  };

  /** 根据当前类型显示对应的输入组件 */
  renderDefaultContent = (currentFormat, targetJsonSchema, nodeKey) => {
    if (currentFormat === 'boolean') {
      return (
        <Switch
          style={{ display: 'inline-block' }}
          defaultChecked={targetJsonSchema.default}
          checkedChildren="true"
          unCheckedChildren="false"
          onChange={(checked) => {
            this.handleValueChange('default', checked);
          }}
        />
      );
    }
    if (currentFormat === 'radio') {
      // 如果是选择类型的组件，需要提取选择项
      const enumKeys = targetJsonSchema.items.enum;
      const enumTexts = targetJsonSchema.items.enumextra;
      return (
        <Radio.Group
          style={{ display: 'inline-block' }}
          defaultValue={targetJsonSchema.default}
          onChange={(event) => {
            const { value } = event.target;
            this.handleValueChange('default', value);
          }}
        >
          {enumKeys &&
            enumKeys.length > 0 &&
            enumKeys.map((enumKey, enumIndex) => {
              /** 1. 获取当前enum的title */
              const enumText = enumTexts[enumIndex];
              /** 2. 获取当前元素的id，用于做唯一标识 */
              const enumNodeKey = `${nodeKey}-radio-${enumKey}`;
              return (
                <Radio value={enumKey} key={enumNodeKey}>
                  {enumText}
                </Radio>
              );
            })}
        </Radio.Group>
      );
    }
    if (currentFormat === 'select') {
      // 如果是选择类型的组件，需要提取选择项
      const enumKeys = targetJsonSchema.items.enum;
      const enumTexts = targetJsonSchema.items.enumextra;
      return (
        <Checkbox.Group
          style={{ display: 'inline-block' }}
          onChange={(checkedValue) => {
            this.handleValueChange('default', checkedValue);
          }}
          defaultValue={targetJsonSchema.default}
        >
          {enumKeys &&
            enumKeys.length > 0 &&
            enumKeys.map((enumKey, enumIndex) => {
              /** 1. 获取当前enum的title */
              const enumText = enumTexts[enumIndex];
              /** 2. 获取当前元素的id，用于做唯一标识 */
              const enumNodeKey = `${nodeKey}-radio-${enumKey}`;
              return (
                <Checkbox value={enumKey} key={enumNodeKey}>
                  {enumText}
                </Checkbox>
              );
            })}
        </Checkbox.Group>
      );
    }
    if (currentFormat === 'color') {
      return (
        <Input
          style={{ display: 'inline-block' }}
          className="color-item-form"
          type="color"
          defaultValue={targetJsonSchema.default}
          onChange={(event) => {
            const { value } = event.target;
            this.handleValueChange('default', value);
          }}
        />
      );
    }
    if (
      currentFormat === 'textarea' ||
      currentFormat === 'codearea' ||
      currentFormat === 'htmlarea' ||
      currentFormat === 'json'
    ) {
      return (
        <TextArea
          style={{ display: 'inline-block' }}
          rows={4}
          placeholder={`请输入${targetJsonSchema.title}的默认值`}
          defaultValue={targetJsonSchema.default}
          onPressEnter={(event) => {
            const { value } = event.target;
            this.handleValueChange('default', value);
          }}
          onBlur={(event) => {
            const { value } = event.target;
            this.handleValueChange('default', value);
          }}
        />
      );
    }
    if (currentFormat === 'number') {
      return (
        <InputNumber
          style={{ display: 'inline-block' }}
          placeholder={`请输入${targetJsonSchema.title}的默认值`}
          defaultValue={targetJsonSchema.default}
          onChange={(newVal) => {
            this.handleValueChange('default', newVal);
          }}
        />
      );
    }
    // 其他都默认以input控件进行录入
    return (
      <Input
        style={{ display: 'inline-block' }}
        placeholder={`请输入${targetJsonSchema.title}的默认值`}
        defaultValue={targetJsonSchema.default}
        onPressEnter={(event) => {
          const { value } = event.target;
          this.handleValueChange('default', value);
        }}
        onBlur={(event) => {
          const { value } = event.target;
          this.handleValueChange('default', value);
        }}
      />
    );
  };

  render() {
    const { nodeKey, targetJsonSchema } = this.props;
    const currentFormat = getCurrentFormat(targetJsonSchema);

    /** 默认值需要进行细分
     *  输入形式的基础类型组件（input、boolean、 date、date-time、 time、 url、number），以input表单形式让用户填充；
     *  textarea和3种特殊类型组件（Json、CodeArea、htmlArea），以textarea表单形式让用户填充；
     *  color选择类型，以type=color的颜色取值控件让用户选择；
     *  radio、 select选择类型，以其自身在JSONEditor中的展示让用户选择默认值；
     * */

    return (
      <div className="advance-config-model">
        {isNeedReadOnlyOption(currentFormat) && (
          <div
            className="wide-screen-element-warp"
            key={`${nodeKey}-readOnly-${targetJsonSchema.readOnly}`}
          >
            <div className="element-title">
              <Tooltip
                title={'当前属性设置为只读后，用户不能对其进行任何编辑操作'}
                placement="top"
              >
                <span className="title-text">是否只读</span>
              </Tooltip>
            </div>
            <div className="content-item">
              <div className="form-item-box">
                <Switch
                  style={{ display: 'inline-block' }}
                  defaultChecked={targetJsonSchema.readOnly}
                  checkedChildren="true"
                  unCheckedChildren="false"
                  onChange={(checked) => {
                    this.handleValueChange('readOnly', checked);
                  }}
                />
              </div>
            </div>
          </div>
        )}
        {isNeedIsRequiredOption(currentFormat) && (
          <div
            className="wide-screen-element-warp"
            key={`${nodeKey}-isRequired-${targetJsonSchema.isRequired}`}
          >
            <div className="element-title">
              <Tooltip
                title={
                  '当前属性设置为必填项后，如果用户没有给其设置数值，则会进行标红提示。'
                }
                placement="top"
              >
                <span className="title-text">是否必填项</span>
              </Tooltip>
            </div>
            <div className="content-item">
              <div className="form-item-box">
                <Switch
                  style={{ display: 'inline-block' }}
                  defaultChecked={targetJsonSchema.isRequired}
                  checkedChildren="true"
                  unCheckedChildren="false"
                  onChange={(checked) => {
                    this.handleValueChange('isRequired', checked);
                  }}
                />
              </div>
            </div>
          </div>
        )}
        {isNeedDefaultOption(currentFormat) && (
          <div className="wide-screen-element-warp" key={`${nodeKey}-default`}>
            <div className="element-title">
              <Tooltip placement="top">
                <span className="title-text">默认值</span>
              </Tooltip>
            </div>
            <div className="content-item">
              <div className="form-item-box">
                {this.renderDefaultContent(
                  currentFormat,
                  targetJsonSchema,
                  nodeKey,
                )}
              </div>
            </div>
          </div>
        )}
        {isNeedDescriptionOption(currentFormat) && (
          <div
            className="wide-screen-element-warp"
            key={`${nodeKey}-description`}
          >
            <div className="element-title">
              <Tooltip
                title={'字段描述内容将作为Title的补充信息提供给用户'}
                placement="top"
              >
                <span className="title-text">字段描述</span>
              </Tooltip>
            </div>
            <div className="content-item">
              <div className="form-item-box">
                <Input
                  style={{ display: 'inline-block' }}
                  placeholder={`请输入${targetJsonSchema.title}的字段描述`}
                  defaultValue={targetJsonSchema.description}
                  onPressEnter={(event) => {
                    const { value } = event.target;
                    this.handleValueChange('description', value);
                  }}
                  onBlur={(event) => {
                    const { value } = event.target;
                    this.handleValueChange('description', value);
                  }}
                />
              </div>
            </div>
          </div>
        )}
        {isNeedPlaceholderOption(currentFormat) && (
          <div
            className="wide-screen-element-warp"
            key={`${nodeKey}-placeholder`}
          >
            <div className="element-title">
              <Tooltip
                title={'输入提示内容将作为输入区域的提示信息展示给用户'}
                placement="top"
              >
                <span className="title-text">输入提示</span>
              </Tooltip>
            </div>
            <div className="content-item">
              <div className="form-item-box">
                <Input
                  style={{ display: 'inline-block' }}
                  placeholder={`请输入${targetJsonSchema.title}的输入提示`}
                  defaultValue={targetJsonSchema.placeholder}
                  onPressEnter={(event) => {
                    const { value } = event.target;
                    this.handleValueChange('placeholder', value);
                  }}
                  onBlur={(event) => {
                    const { value } = event.target;
                    this.handleValueChange('placeholder', value);
                  }}
                />
              </div>
            </div>
          </div>
        )}
        {isNeedMinMaxOption(currentFormat) && (
          <div
            className="wide-screen-element-warp"
            key={`${nodeKey}-minimum-${targetJsonSchema.minimum}`}
          >
            <div className="element-title">
              <Tooltip
                title={'设置最小值后，用户输入的数值必须大于当前最小值'}
                placement="top"
              >
                <span className="title-text">最小值</span>
              </Tooltip>
            </div>
            <div className="content-item">
              <div className="form-item-box">
                <InputNumber
                  style={{ display: 'inline-block' }}
                  defaultValue={targetJsonSchema.minimum}
                  onPressEnter={(event) => {
                    const { value } = event.target;
                    this.handleValueChange('minimum', value);
                  }}
                  onBlur={(event) => {
                    const { value } = event.target;
                    this.handleValueChange('minimum', value);
                  }}
                />
              </div>
            </div>
          </div>
        )}
        {isNeedMinMaxOption(currentFormat) && (
          <div
            className="wide-screen-element-warp"
            key={`${nodeKey}-maximum-${targetJsonSchema.maximum}`}
          >
            <div className="element-title">
              <Tooltip
                title={'设置最大值后，用户输入的数值必须大于当前最大值'}
                placement="top"
              >
                <span className="title-text">最大值</span>
              </Tooltip>
            </div>
            <div className="content-item">
              <div className="form-item-box">
                <InputNumber
                  style={{ display: 'inline-block' }}
                  defaultValue={targetJsonSchema.maximum}
                  onPressEnter={(event) => {
                    const { value } = event.target;
                    this.handleValueChange('maximum', value);
                  }}
                  onBlur={(event) => {
                    const { value } = event.target;
                    this.handleValueChange('maximum', value);
                  }}
                />
              </div>
            </div>
          </div>
        )}
        {isNeedMinMaxChildOption(currentFormat) && (
          <div
            className="wide-screen-element-warp"
            key={`${nodeKey}-minimum-child-${targetJsonSchema['minimum-child']}`}
          >
            <div className="element-title">
              <Tooltip
                title={
                  '设置最少子项个数后，当前字段的子字段数量必须大于最少子项数'
                }
                placement="top"
              >
                <span className="title-text">最少子项数</span>
              </Tooltip>
            </div>
            <div className="content-item">
              <div className="form-item-box">
                <InputNumber
                  style={{ display: 'inline-block' }}
                  defaultValue={targetJsonSchema['minimum-child']}
                  onChange={(newVal) => {
                    this.handleValueChange('minimum-child', newVal);
                  }}
                />
              </div>
            </div>
          </div>
        )}
        {isNeedMinMaxChildOption(currentFormat) && (
          <div
            className="wide-screen-element-warp"
            key={`${nodeKey}-maximum-child-${targetJsonSchema['maximum-child']}`}
          >
            <div className="element-title">
              <Tooltip
                title={
                  '设置最多子项个数后，当前字段的子字段数量必须少于最多子项数'
                }
                placement="top"
              >
                <span className="title-text">最多子项数</span>
              </Tooltip>
            </div>
            <div className="content-item">
              <div className="form-item-box">
                <InputNumber
                  style={{ display: 'inline-block' }}
                  defaultValue={targetJsonSchema['maximum-child']}
                  onChange={(newVal) => {
                    this.handleValueChange('maximum-child', newVal);
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default inject((stores) => ({
  getSchemaByIndexRoute: stores.jsonSchemaStore.getSchemaByIndexRoute,
  editJsonData: stores.jsonSchemaStore.editJsonData,
}))(observer(AdvanceConfig));
