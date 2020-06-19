import * as React from 'react';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import { Input, Select, Tooltip } from 'antd';
const { Option } = Select;
import { TypeList } from '$data/TypeList';
import { PlusOutlined, CloseOutlined } from '@ant-design/icons';
import './index.scss';

class BaseFormSchema extends React.PureComponent {
  static propTypes = {
    parentType: PropTypes.string,
    jsonKey: PropTypes.string,
    indexRoute: PropTypes.string,
    targetJsonData: PropTypes.any,
  };

  selectHandleChange = (value) => {
    console.log(`selected ${value}`);
  };

  /** 获取当前字段的类型清单
   *  根据父元素的类型决定当前字段的类型可选择范围，如果父类型为空则默认使用全新的可选择类型 */
  getCurrentTypeList = (parentType) => {
    const myParentType = parentType || 'all';
    let typeList = TypeList[myParentType];
    if (!typeList || typeList.length === 0) {
      typeList = TypeList['all']; // 如果当前类型清单为空，则默认展示所有的字段类型
    }
    return typeList;
  };

  /** 获取当前字段的类型（format）
   *  如果当前字段没有format字段，则根据type字段赋予默认的类型 */
  getCurrentType = (targetJsonData) => {
    let currentType = targetJsonData.format;
    if (!currentType) {
      if (targetJsonData.type === 'object') {
        currentType = 'object';
      } else if (targetJsonData.type === 'array') {
        currentType = 'array';
      } else {
        currentType = 'input';
      }
    }
    return currentType;
  };

  render() {
    const { parentType, jsonKey, targetJsonData } = this.props;

    const readOnly = targetJsonData.readOnly || false; // 是否不可编辑状态，默认为可编辑状态

    const currentTypeList = this.getCurrentTypeList(parentType); // 根据父级元素类型获取可供使用的类型清单

    return (
      <div className="base-schema-box">
        <div className="key-input-item">
          <Input value={jsonKey} disabled={readOnly} />
        </div>
        <div className="type-select-item">
          <Select
            defaultValue={this.getCurrentType(targetJsonData)}
            style={{ width: 120 }}
            onChange={this.selectHandleChange}
            disabled={readOnly}
          >
            {currentTypeList.map((item) => {
              return (
                <Option key={item} value={item}>
                  {item}
                </Option>
              );
            })}
          </Select>
        </div>
        <div className="title-input-item">
          <Input value={targetJsonData.title} disabled={readOnly} />
        </div>
        <div className="operate-item">
          {!readOnly && (
            <CloseOutlined className="operate-btn delete-operate" />
          )}
          <PlusOutlined className="operate-btn" />
        </div>
      </div>
    );
  }
}

export default inject((stores) => ({
  jsonSchema: stores.jsonSchema,
}))(observer(BaseFormSchema));
