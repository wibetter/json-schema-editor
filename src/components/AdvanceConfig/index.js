import * as React from 'react';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import { Input, message, Tooltip } from 'antd';
import './index.scss';

class AdvanceConfig extends React.PureComponent {
  static propTypes = {
    jsonKey: PropTypes.string,
    indexRoute: PropTypes.string,
    nodeKey: PropTypes.string,
    targetJsonData: PropTypes.any,
  };

  constructor(props) {
    super(props);
    // 这边绑定是必要的，这样 `this` 才能在回调函数中使用
    this.handleJsonKeyChange = this.handleJsonKeyChange.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.selectHandleChange = this.selectHandleChange.bind(this);
  }

  /** description变动事件处理器 */
  handleDescriptionChange = (event) => {
    const { value } = event.target;
    const { indexRoute, jsonKey, targetJsonData, editJsonData } = this.props;
    if (targetJsonData.description === value) return; // title值未改变则直接跳出
    editJsonData(indexRoute, jsonKey, {
      description: value,
    });
  };

  render() {
    const { nodeKey, targetJsonData, pageScreen } = this.props;

    const pageScreenClassName =
      pageScreen === 'wideScreen'
        ? 'wide-screen-element-warp'
        : 'mobile-screen-element-warp';
    const curPlacement = pageScreen === 'wideScreen' ? 'topRight' : 'topLeft';

    return (
      <div className="advance-config-model">
        <div className={pageScreenClassName}>
          <div className="element-title">
            <Tooltip
              title={'字段描述内容将作为Title的补充信息提供给用户'}
              placement={curPlacement}
            >
              <span className="title-text">字段描述</span>
            </Tooltip>
          </div>
          <div className="content-item">
            <div className="form-item-box">
              <Input
                style={{ display: 'inline-block' }}
                placeholder={`请输入${targetJsonData.title}的描述信息`}
                defaultValue={targetJsonData.description}
                onPressEnter={this.handleDescriptionChange}
                onBlur={this.handleDescriptionChange}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default inject((stores) => ({
  pageScreen: stores.JSONSchemaStore.pageScreen,
  getJSONDataByIndex: stores.jsonSchemaStore.getJSONDataByIndex,
  editJsonData: stores.jsonSchemaStore.editJsonData,
}))(observer(AdvanceConfig));
