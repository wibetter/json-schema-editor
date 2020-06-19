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

  getCurrentTypeList = (parentType) => {
    const myParentType = parentType || 'all';
    let typeList = TypeList[myParentType];
    if (!typeList || typeList.length === 0) {
      typeList = TypeList['all']; // 如果当前类型清单为空，则默认展示所有的字段类型
    }
    return typeList;
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
            defaultValue={targetJsonData.format}
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
