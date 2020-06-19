import * as React from 'react';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import { Input, Select, Tooltip } from 'antd';
const { Option } = Select;
import { PlusOutlined, CloseOutlined } from '@ant-design/icons';
import { isBoxSchemaData } from '$utils/jsonSchema';
import { TypeList } from '$data/TypeList';
import './index.scss';

class BaseFormSchema extends React.PureComponent {
  static propTypes = {
    parentType: PropTypes.string,
    jsonKey: PropTypes.string,
    indexRoute: PropTypes.string,
    targetJsonData: PropTypes.any,
  };

  constructor(props) {
    super(props);

    // 这边绑定是必要的，这样 `this` 才能在回调函数中使用
    this.onAddBtnEvent = this.onAddBtnEvent.bind(this);
    this.onDeleteBtnEvent = this.onDeleteBtnEvent.bind(this);
  }

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
  getCurrentFormat = (targetJsonData) => {
    let currentType = targetJsonData.format;
    if (!currentType) {
      if (targetJsonData.type === 'object' || targetJsonData.type === 'array') {
        currentType = targetJsonData.type;
      } else {
        currentType = 'input';
      }
    }
    return currentType;
  };

  /** 新增字段项
   *  备注：如果当前字段是容器类型，则为其添加子字段项，如果是基本类型则为其添加兄弟节点字段项 */
  onAddBtnEvent = () => {
    const {
      indexRoute,
      targetJsonData,
      addChildJson,
      insertJsonData,
    } = this.props;
    if (isBoxSchemaData(targetJsonData.format)) {
      // 表示当前是容器类型字段
      addChildJson(indexRoute);
    } else {
      // 插入兄弟节点
      insertJsonData(indexRoute);
    }
  };

  /** 删除字段项 */
  onDeleteBtnEvent = () => {
    const { jsonKey, indexRoute, deleteJsonByIndex } = this.props;
    deleteJsonByIndex(indexRoute, jsonKey); // 删除对应的json数据对象
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
            defaultValue={this.getCurrentFormat(targetJsonData)}
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
            <CloseOutlined
              className="operate-btn delete-operate"
              onClick={this.onDeleteBtnEvent}
            />
          )}
          <PlusOutlined className="operate-btn" onClick={this.onAddBtnEvent} />
        </div>
      </div>
    );
  }
}

export default inject((stores) => ({
  deleteJsonByIndex: stores.jsonSchemaStore.deleteJsonByIndex,
  getJSONDataByIndex: stores.jsonSchemaStore.getJSONDataByIndex,
  addChildJson: stores.jsonSchemaStore.addChildJson,
  insertJsonData: stores.jsonSchemaStore.insertJsonData,
}))(observer(BaseFormSchema));
