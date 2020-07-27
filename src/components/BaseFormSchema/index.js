import * as React from 'react';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import { Input, message, Select, Modal, Button, Tooltip } from 'antd';
const { Option } = Select;
import {
  PlusOutlined,
  CloseOutlined,
  CopyOutlined,
  DragOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import AdvanceConfig from '$components/AdvanceConfig/index'; // 高级配置内容
import {
  isBoxSchemaData,
  getNextIndexRoute,
  isFirstSchemaData,
  getCurrentFormat,
  getParentIndexRoute,
} from '$utils/jsonSchema';
import { objClone, saveWebCacheData } from '$utils/index';
import { TypeList } from '$data/TypeList';
import { TypeDataList } from '$data/TypeDataList';
import './index.scss';

class BaseFormSchema extends React.PureComponent {
  static propTypes = {
    parentType: PropTypes.string,
    jsonKey: PropTypes.string,
    indexRoute: PropTypes.string,
    nodeKey: PropTypes.string,
    targetJsonData: PropTypes.any,
    isFixed: PropTypes.any,
    hideOperaBtn: PropTypes.any,
    keyIsFixed: PropTypes.any,
    typeIsFixed: PropTypes.any,
    titleIsFixed: PropTypes.any,
  };

  constructor(props) {
    super(props);
    this.state = {
      isShowAdvance: false,
    };
    // 这边绑定是必要的，这样 `this` 才能在回调函数中使用
    this.onAddBtnEvent = this.onAddBtnEvent.bind(this);
    this.onCopyBtnEvent = this.onCopyBtnEvent.bind(this);
    this.onDeleteBtnEvent = this.onDeleteBtnEvent.bind(this);
    this.handleJsonKeyChange = this.handleJsonKeyChange.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.selectHandleChange = this.selectHandleChange.bind(this);
  }

  /** select类型变动事件处理器 */
  selectHandleChange = (newFormat) => {
    const { indexRoute, jsonKey, changeType, targetJsonData } = this.props;
    if (targetJsonData.format === newFormat) return; // format值未改变则直接跳出
    // 根据当前新的类型获取初始化的对象数据
    const newTypeData = TypeDataList[newFormat];
    changeType(indexRoute, jsonKey, newTypeData);
  };

  /** jsonKey类型输入值变动事件处理器 */
  handleJsonKeyChange = (event) => {
    const { value } = event.target;
    const { indexRoute, jsonKey, editJsonKey, isExitJsonKey } = this.props;
    if (jsonKey === value) return; // jsonKey值未改变则直接跳出
    if (isExitJsonKey(indexRoute, value)) {
      message.warning('当前key已存在，请换一个吧。');
      return;
    }
    editJsonKey(indexRoute, value);
  };

  /** title类型输入值变动事件处理器 */
  handleTitleChange = (event) => {
    const { value } = event.target;
    const { indexRoute, jsonKey, editJsonData, targetJsonData } = this.props;
    if (targetJsonData.title === value) return; // title值未改变则直接跳出
    editJsonData(indexRoute, jsonKey, {
      title: value,
    });
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

  /** 新增字段项
   *  备注：如果当前字段是容器类型，则为其添加子字段项，如果是基本类型则为其添加兄弟节点字段项 */
  onAddBtnEvent = () => {
    const {
      indexRoute,
      targetJsonData,
      addChildJson,
      addNextJsonData,
    } = this.props;
    const currentFormat = getCurrentFormat(targetJsonData);

    if (isBoxSchemaData(currentFormat)) {
      // 表示当前是容器类型字段
      addChildJson(indexRoute);
    } else {
      // 插入兄弟节点
      addNextJsonData(indexRoute);
    }
  };

  /** 复制功能
   *  备注：需要自动生成一个key值 */
  onCopyBtnEvent = () => {
    const {
      indexRoute,
      targetJsonData,
      getJSONDataByIndex,
      jsonKey,
      insertJsonData,
      getNewJsonKeyIndex,
    } = this.props;
    const newJsonData = objClone(targetJsonData);
    // 1.获取父元素
    const parentIndexRoute = getParentIndexRoute(indexRoute);
    const parentJSONObj = getJSONDataByIndex(parentIndexRoute);
    // 2.生成一个新的key值
    const newJsonKey = getNewJsonKeyIndex(parentJSONObj, jsonKey);
    // 3.复制时记录数据来源的路径值（备注：只保留最近的一次copy数值源）
    /*saveWebCacheData(
      `${getNextIndexRoute(indexRoute)}-${newJsonKey}`,
      indexRoute,
    );*/
    // 4.插入复制的json数据
    insertJsonData(indexRoute, newJsonKey, newJsonData);
  };

  /** 删除字段项 */
  onDeleteBtnEvent = () => {
    const { jsonKey, indexRoute, deleteJsonByIndex_CurKey } = this.props;
    deleteJsonByIndex_CurKey(indexRoute, jsonKey); // 删除对应的json数据对象
  };

  /** 拦截拖拽事件 */
  ignoreDragEvent = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  render() {
    const {
      parentType,
      indexRoute,
      jsonKey,
      nodeKey,
      targetJsonData,
    } = this.props;
    const { isShowAdvance } = this.state;
    const isFixed = this.props.isFixed || false; // 是否为固有的属性（不可编辑、不可删除）
    const keyIsFixed = this.props.keyIsFixed || false; // key是否为不可编辑的属性
    const typeIsFixed = this.props.typeIsFixed || false; // type是否为不可编辑的属性
    const titleIsFixed = this.props.titleIsFixed || false; // title是否为不可编辑的属性
    const hideOperaBtn = this.props.hideOperaBtn || false; // 是否隐藏操作类按钮
    const currentTypeList = this.getCurrentTypeList(parentType); // 根据父级元素类型获取可供使用的类型清单
    const currentFormat = getCurrentFormat(targetJsonData);
    const isFirstSchema = isFirstSchemaData(currentFormat); // 一级固定类型元素不允许拖拽
    const readOnly = isFirstSchema || isFixed || false; // 是否不可编辑状态，默认为可编辑状态

    return (
      <div className="base-schema-box" id={nodeKey}>
        <div
          className="key-input-item"
          draggable="true"
          onDragStart={this.ignoreDragEvent}
        >
          <Input
            defaultValue={jsonKey}
            disabled={readOnly || keyIsFixed}
            onPressEnter={this.handleJsonKeyChange}
            onBlur={this.handleJsonKeyChange}
          />
        </div>
        <div
          className="type-select-item"
          draggable="true"
          onDragStart={this.ignoreDragEvent}
        >
          <Select
            defaultValue={currentFormat}
            style={{ width: 120 }}
            onChange={this.selectHandleChange}
            disabled={readOnly || typeIsFixed}
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
        <div
          className="title-input-item"
          draggable="true"
          onDragStart={this.ignoreDragEvent}
        >
          <Input
            defaultValue={targetJsonData.title}
            disabled={readOnly || titleIsFixed}
            onPressEnter={this.handleTitleChange}
            onBlur={this.handleTitleChange}
          />
        </div>
        {!hideOperaBtn && (
          <div className="operate-item">
            {!readOnly && (
              <Tooltip title="删除">
                <CloseOutlined
                  className="operate-btn delete-operate"
                  onClick={this.onDeleteBtnEvent}
                />
              </Tooltip>
            )}
            <Tooltip
              title={
                isBoxSchemaData(currentFormat) ? '新增子节点' : '新增兄弟节点'
              }
            >
              <PlusOutlined
                className="operate-btn"
                onClick={this.onAddBtnEvent}
              />
            </Tooltip>
            {!readOnly && (
              <Tooltip title="复制">
                <CopyOutlined
                  className="operate-btn"
                  onClick={this.onCopyBtnEvent}
                />
              </Tooltip>
            )}
            {!readOnly && (
              <Tooltip title="高级设置">
                <SettingOutlined
                  className="operate-btn"
                  onClick={() => {
                    // 显示高级设置模态框
                    this.setState({
                      isShowAdvance: true,
                    });
                  }}
                />
              </Tooltip>
            )}
            {!readOnly && (
              <Tooltip title="按住进行拖拽">
                <DragOutlined className="operate-btn drag-btn" />
              </Tooltip>
            )}
          </div>
        )}
        {hideOperaBtn && <div className="operate-item">&nbsp;</div>}
        <Modal
          visible={isShowAdvance}
          title={`高级设置 / 当前字段：${targetJsonData.title}(${jsonKey})`}
          onCancel={() => {
            this.setState({
              isShowAdvance: false,
            });
          }}
          footer={[
            <Button
              key="submit"
              type="primary"
              onClick={() => {
                this.setState({
                  isShowAdvance: false,
                });
              }}
            >
              保存并关闭
            </Button>,
          ]}
        >
          <AdvanceConfig
            {...{
              indexRoute,
              jsonKey,
              targetJsonData,
            }}
          />
        </Modal>
      </div>
    );
  }
}

export default inject((stores) => ({
  getNewJsonKeyIndex: stores.jsonSchemaStore.getNewJsonKeyIndex,
  deleteJsonByIndex_CurKey: stores.jsonSchemaStore.deleteJsonByIndex_CurKey,
  getJSONDataByIndex: stores.jsonSchemaStore.getJSONDataByIndex,
  addChildJson: stores.jsonSchemaStore.addChildJson,
  addNextJsonData: stores.jsonSchemaStore.addNextJsonData,
  insertJsonData: stores.jsonSchemaStore.insertJsonData,
  editJsonData: stores.jsonSchemaStore.editJsonData,
  editJsonKey: stores.jsonSchemaStore.editJsonKey,
  changeType: stores.jsonSchemaStore.changeType,
  isExitJsonKey: stores.jsonSchemaStore.isExitJsonKey,
}))(observer(BaseFormSchema));
