import * as React from 'react';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import { Input, message, Select } from 'antd';
const { Option } = Select;
import { getCurrentFormat, getNextIndexRoute } from '$utils/jsonSchema';
import './index.scss';

// 选择不同的数据源类型，则展示不同的data内容(均为不可编辑状态)
const dataSelect = {
  local: {
    type: 'string',
    title: '本地静态json数据',
    format: 'json',
    default: '{}', // 默认值
    isRequired: true,
    description: '用于设置本地的静态json数据',
  },
  remote: {
    type: 'string',
    title: '远程json数据源',
    format: 'url',
    default: 'http://xxx', // 默认值
    isRequired: true,
    description: '用于设置获取元素数据的请求地址',
  },
};

/** 主要用于渲染typeSelect类型的元素
 * 备注：TypeSelectFormSchema组件中只有default是可编辑的（提供选择列表） */
class TypeSelectFormSchema extends React.PureComponent {
  static propTypes = {
    parentType: PropTypes.string,
    jsonKey: PropTypes.string,
    indexRoute: PropTypes.string,
    nodeKey: PropTypes.string,
    targetJsonData: PropTypes.any,
    isFixed: PropTypes.any,
    typeChange: PropTypes.func,
  };

  constructor(props) {
    super(props);
    // 这边绑定是必要的，这样 `this` 才能在回调函数中使用
    this.typeHandleChange = this.typeHandleChange.bind(this);
  }

  /** 数据源类型变动事件处理器 */
  typeHandleChange = (newType) => {
    console.log(`selected ${newType}`);
    const {
      indexRoute,
      jsonKey,
      targetJsonData,
      editJsonData,
      typeChange,
    } = this.props;
    if (targetJsonData.default === newType) return; // default值未改变则直接跳出
    editJsonData(indexRoute, jsonKey, {
      default: newType,
    });
    const newDataJSONObj = dataSelect[newType];
    if (newDataJSONObj) {
      // 根据indexRoute获取下一个子元素的路径值
      const nextIndexRoute = getNextIndexRoute(indexRoute);
      // 类型改变时更新targetJsonData.properties.data中的数据
      editJsonData(nextIndexRoute, 'data', newDataJSONObj);
    }
  };

  render() {
    const { nodeKey, targetJsonData } = this.props;
    const currentFormat = getCurrentFormat(targetJsonData);

    return (
      <div className="typeSelect-schema-box" id={nodeKey}>
        <div className="key-input-item">
          <Select
            defaultValue={targetJsonData.default || 'local'}
            onChange={this.typeHandleChange}
          >
            <Option key={'local'} value={'local'}>
              {'local'}
            </Option>
            <Option key={'remote'} value={'remote'}>
              {'remote'}
            </Option>
          </Select>
        </div>
        <div className="type-select-item">
          <Select
            defaultValue={currentFormat}
            style={{ width: 120 }}
            disabled={true}
          >
            <Option key={currentFormat} value={currentFormat}>
              {currentFormat}
            </Option>
          </Select>
        </div>
        <div className="title-input-item">
          <Input defaultValue={targetJsonData.title} disabled={true} />
        </div>
        <div className="operate-item">&nbsp;</div>
      </div>
    );
  }
}

export default inject((stores) => ({
  editJsonData: stores.jsonSchemaStore.editJsonData,
}))(observer(TypeSelectFormSchema));
