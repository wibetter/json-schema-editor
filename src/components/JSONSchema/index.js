import * as React from 'react';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import { Tree, message } from 'antd';
import BaseFormSchema from '$components/BaseFormSchema/index';
const { TreeNode } = Tree;
import { isEqual, isFirstSchema } from '$utils/index';
import {
  isBoxSchemaData,
  isFirstSchemaData,
  getCurrentFormat,
  isSameParent,
  moveForward,
} from '$utils/jsonSchema';
import './index.scss';

class JSONSchema extends React.PureComponent {
  static propTypes = {
    onChange: PropTypes.func,
    data: PropTypes.object,
  };

  constructor(props) {
    super(props);
    // 根据props.data对jsonSchema进行初始化
    if (props.data) {
      this.props.initJSONSchemaData(props.data);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(nextProps.data, this.props.data)) {
      this.props.initJSONSchemaData(nextProps.data);
    }
  }

  /**
   * 拖拽相关方法：开始拖动时触发的事件
   */
  onDragStart = (eventData) => {
    const { node } = eventData;
    // 设置只有指定类型的元素可以拖拽
    if (node.className && isFirstSchema(node.className)) {
      message.warning('一级固定类型元素不支持拖拽哦');
      // eventData.event.preventDefault();
      // eventData.event.stopPropagation();
    }
  };

  /**
   * 拖拽相关方法：拖动完成时触发的事件
   */
  onDrop = (eventData) => {
    /**
     * dragNode：拖动的元素
     * node：拖拽的目标位置上的元素
     * 根据eventData中的dropPosition值判断插入位置会不准确
     * */
    const { dragNode, node } = eventData;
    const {
      getJSONDataByIndex,
      insertJsonData,
      deleteJsonByIndex,
      isExitJsonKey,
      isSupportCurType,
    } = this.props;

    if (dragNode.className && isFirstSchema(dragNode.className)) return; // 一级固定类型元素不允许拖拽
    // 拖动的元素key
    const curEventKey = dragNode.indexRoute;
    const curJsonKey = dragNode.jsonKey;
    // 获取当前拖动的元素
    const curJsonObj = getJSONDataByIndex(curEventKey);
    console.log(curEventKey);

    // 放置的目标元素key
    let targetEventKey = node.indexRoute;
    console.log(targetEventKey);

    // 判断是否是同一个父级容器
    const isSameParentElem = isSameParent(curEventKey, targetEventKey);
    // 如果是同级父级容器，则判断先后顺序
    let elemOrder = false; // 默认为false：表示拖动元素在后，目标元素在前，
    if (isSameParentElem) {
      const curKeyLastChar = curEventKey.substr(curEventKey.length - 1, 1);
      const targetKeyLastChar = targetEventKey.substr(
        curEventKey.length - 1,
        1,
      );
      if (curKeyLastChar < targetKeyLastChar) {
        // curKeyLastChar：拖动元素的最后一个路径值
        // 表示拖动的元素在前面，目标元素在后面
        elemOrder = true;
      }
      if (elemOrder) {
        /**
         * 当拖动的元素在前面，目标元素在后面，
         * 先删除拖动元素时会导致targetEventKey发生偏移，需要向前移动一位进行矫正
         */
        targetEventKey = moveForward(targetEventKey);
      }
      /**
       * node.dragOver: false（为true时表示在目标元素中间）
       * node.dragOverGapBottom: false（为true时表示在目标元素后面）
       * node.dragOverGapTop: false（为true时表示在目标元素前面）
       * */
      // 同级元素拖拽先删除
      if (node.dragOverGapTop) {
        /** 拖拽到目标元素前面 */
        // 先删除再插入，避免出现重复数据
        deleteJsonByIndex(curEventKey);
        insertJsonData(targetEventKey, curJsonKey, curJsonObj, 'before');
      } else if (node.dragOver || node.dragOverGapBottom) {
        /** 拖拽到目标元素当前位置，不进行位置置换，也认为是拖拽到目标元素后面 */
        deleteJsonByIndex(curEventKey);
        insertJsonData(targetEventKey, curJsonKey, curJsonObj);
      }
    } else {
      /** 非同级元素的拖拽交互 */
      // 判断是否有重名的jsonKey（非同级元素拖拽中可能出现重名）
      const isExitJsonKey_ = isExitJsonKey(targetEventKey, curJsonKey);
      if (isExitJsonKey_) {
        message.warning('目标位置中有重名的元素');
        return;
      }
      const curType = getCurrentFormat(curJsonObj);
      const isSupportCurType_ = isSupportCurType(targetEventKey, curType);
      if (!isSupportCurType_) {
        message.warning(`目标位置不支持${curType}类型元素`);
        return;
      }
      // 非同级元素拖拽后删除
      if (node.dragOverGapTop) {
        /** 拖拽到目标元素前面 */
        insertJsonData(targetEventKey, curJsonKey, curJsonObj, 'before');
        deleteJsonByIndex(curEventKey);
      } else if (node.dragOver || node.dragOverGapBottom) {
        /** 拖拽到目标元素当前位置，不进行位置置换，也认为是拖拽到目标元素后面 */
        insertJsonData(targetEventKey, curJsonKey, curJsonObj);
        deleteJsonByIndex(curEventKey);
      }
    }
  };

  /** 渲染当前字段的表单项（Tree的单项内容） */
  getTreeNodeTitleCont = (params) => {
    return (
      <BaseFormSchema
        indexRoute={params.indexRoute}
        jsonKey={params.jsonKey}
        targetJsonData={params.targetJsonData}
        parentType={params.parentType}
        nodeKey={params.nodeKey}
      />
    );
  };

  /** 渲染properties中的元素
   *  通过遍历propertyOrder有序的获取key值，
   *  再根据key值从properties中获取对应的json数据，
   *  parentIndexRoute用于拼接当前元素的完整索引路径。
   * */
  propertiesRender = (params) => {
    const {
      propertyOrder,
      properties,
      parentIndexRoute,
      parentNodeKey,
      parentType,
    } = params;

    return propertyOrder.map((key, index) => {
      /** 1. 获取当前元素的路径值 */
      const currentIndexRoute = parentIndexRoute
        ? parentIndexRoute + '-' + index
        : index + '';
      /** 2. 获取当前元素的key值 */
      const currentJsonKey = key;
      /** 3. 获取当前元素的json数据对象 */
      const currentSchemaData = properties[currentJsonKey];
      /** 4. 判断是否是容器类型元素，如果是则禁止选中 */
      const currentFormat = getCurrentFormat(currentSchemaData);
      const isFirstSchema = isFirstSchemaData(currentFormat); // 一级固定类型元素不允许拖拽
      /** 5. 获取当前元素的id，用于做唯一标识 */
      const nodeKey = `${
        parentNodeKey ? parentNodeKey + '-' : ''
      }${currentFormat}-${currentJsonKey}`;

      return (
        <TreeNode
          className={`${currentFormat}-schema schema-item-form`}
          id={nodeKey}
          key={nodeKey}
          indexRoute={currentIndexRoute}
          jsonKey={currentJsonKey}
          disabled={isFirstSchema}
          title={this.getTreeNodeTitleCont({
            indexRoute: currentIndexRoute,
            jsonKey: currentJsonKey,
            targetJsonData: currentSchemaData,
            parentType,
            nodeKey,
          })}
        >
          {isBoxSchemaData(currentSchemaData.format) &&
            this.propertiesRender({
              propertyOrder: currentSchemaData.propertyOrder,
              properties: currentSchemaData.properties,
              parentIndexRoute: currentIndexRoute,
              parentNodeKey: nodeKey,
              parentType: currentSchemaData.format || currentSchemaData.type,
            })}
        </TreeNode>
      );
    });
  };

  render() {
    const { jsonSchema } = this.props;

    return (
      <div className="json-schema-container">
        {jsonSchema &&
          jsonSchema.propertyOrder &&
          jsonSchema.propertyOrder.length > 0 && (
            <Tree
              draggable={true}
              selectable={false}
              onDragStart={this.onDragStart}
              onDrop={this.onDrop}
              defaultExpandAll={false}
            >
              {this.propertiesRender({
                propertyOrder: jsonSchema.propertyOrder,
                properties: jsonSchema.properties,
                parentIndexRoute: '',
                parentNodeKey: '',
                parentType: jsonSchema.format || jsonSchema.type,
              })}
            </Tree>
          )}
        {(!jsonSchema ||
          !jsonSchema.propertyOrder ||
          jsonSchema.propertyOrder.length === 0) && (
          <p className="json-schema-empty">当前jsonSchema没有数据内容</p>
        )}
      </div>
    );
  }
}

export default inject((stores) => ({
  jsonSchema: stores.jsonSchemaStore.jsonSchema,
  initJSONSchemaData: stores.jsonSchemaStore.initJSONSchemaData,
  getJSONDataByIndex: stores.jsonSchemaStore.getJSONDataByIndex,
  insertJsonData: stores.jsonSchemaStore.insertJsonData,
  deleteJsonByIndex: stores.jsonSchemaStore.deleteJsonByIndex,
  isExitJsonKey: stores.jsonSchemaStore.isExitJsonKey,
  isSupportCurType: stores.jsonSchemaStore.isSupportCurType,
}))(observer(JSONSchema));
