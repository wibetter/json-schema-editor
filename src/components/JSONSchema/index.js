import * as React from 'react';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import { Tree, message } from 'antd';
import ObjectSchema from '$components/ObjectSchema/index';
import {
  isEqual,
  isFirstSchemaElem,
  saveWebCacheData,
  getWebCacheData,
} from '$utils/index';
import {
  getCurrentFormat,
  getNextIndexRoute,
  isEmptySchema,
  isSameParent,
  getCurPosition,
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
    // 记录onChange事件
    if (props.onChange) {
      this.props.initOnChange(props.onChange);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(nextProps.data, this.props.data)) {
      this.props.initJSONSchemaData(nextProps.data);
    }
    // 记录onChange事件
    if (!isEqual(nextProps.onChange, this.props.onChange)) {
      this.props.initOnChange(nextProps.onChange);
    }
  }

  /**
   * 拖拽相关方法：开始拖动时触发的事件
   */
  onDragStart = (eventData) => {
    const { node } = eventData;
    // 设置只有指定类型的元素可以拖拽
    if (node.className && isFirstSchemaElem(node.className)) {
      message.warning('一级固定类型元素不支持拖拽哦');
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
      indexRoute2keyRoute,
      insertJsonData,
      deleteJsonByIndex,
      isExitJsonKey,
      isSupportCurType,
    } = this.props;

    if (dragNode.className && isFirstSchemaElem(dragNode.className)) return; // 一级固定类型元素不允许拖拽
    // 拖动的元素key
    const curIndexRoute = dragNode.indexRoute;
    const curJsonKey = dragNode.jsonKey;
    // 获取当前拖动的元素
    const curJsonObj = getJSONDataByIndex(curIndexRoute);
    console.log(curIndexRoute);

    // 放置的目标元素key
    let targetIndexRoute = node.indexRoute;
    console.log(targetIndexRoute);

    const currentFormat = getCurrentFormat(curJsonObj);
    const curKeyRoute = indexRoute2keyRoute(curIndexRoute);
    // 先获取拖拽元素的原始路径
    const cacheTargetKeyRoute = getWebCacheData(
      `${curKeyRoute}-${currentFormat}`,
    );

    // 判断是否是同一个父级容器
    const isSameParentElem = isSameParent(curIndexRoute, targetIndexRoute);
    // 判断先后位置
    const curPosition = getCurPosition(curIndexRoute, targetIndexRoute);

    if (isSameParentElem) {
      /** 同级元素的拖拽交互
       * 备注：1、同级元素之间的拖拽不用考虑是否有重名key；
       * 2、先删除再进行插入，避免插入时报同名错误；
       * */
      // 先删除当前拖动的元素
      deleteJsonByIndex(curIndexRoute, true); // 设置为true表示跳过onChange
      // 如果curPosition === 'before'，删除后需要进行移位操作
      if (curPosition === 'before') {
        /**
         * 当拖动的元素在前面，目标元素在后面，
         * 先删除拖动元素时会导致targetIndexRoute发生偏移，需要向前移动一位进行矫正（以便继续访问到此前的目标元素）
         */
        targetIndexRoute = moveForward(targetIndexRoute);
      }
      if (node.dragOverGapTop) {
        /** 拖拽到目标元素前面 */
        insertJsonData(targetIndexRoute, curJsonKey, curJsonObj, 'before');
      } else if (node.dragOver || node.dragOverGapBottom) {
        /** 拖拽到目标元素当前位置，不进行位置置换，也认为是拖拽到目标元素后面 */
        insertJsonData(targetIndexRoute, curJsonKey, curJsonObj);
      }
    } else {
      /** 非同级元素的拖拽交互 */
      // 判断是否有重名的jsonKey（非同级元素拖拽中可能出现重名）
      const isExitJsonKey_ = isExitJsonKey(targetIndexRoute, curJsonKey);
      if (isExitJsonKey_) {
        message.warning('目标位置中有重名的元素');
        return;
      }
      const curType = getCurrentFormat(curJsonObj);
      const isSupportCurType_ = isSupportCurType(targetIndexRoute, curType);
      if (!isSupportCurType_) {
        message.warning(`目标位置不支持${curType}类型元素`);
        return;
      }

      let cacheTardetIndex = targetIndexRoute;
      // 非同级元素拖拽后删除
      if (node.dragOverGapTop) {
        /** 拖拽到目标元素前面 */
        if (curPosition === 'after') {
          deleteJsonByIndex(curIndexRoute, true); // 设置为true表示跳过onChange
          insertJsonData(targetIndexRoute, curJsonKey, curJsonObj, 'before');
        } else {
          // curPosition === 'before'
          insertJsonData(
            targetIndexRoute,
            curJsonKey,
            curJsonObj,
            'before',
            true,
          ); // 设置为true表示跳过onChange
          deleteJsonByIndex(curIndexRoute);
        }
      } else if (node.dragOver || node.dragOverGapBottom) {
        cacheTardetIndex = getNextIndexRoute(targetIndexRoute);
        /** 拖拽到目标元素当前位置，不进行位置置换，也认为是拖拽到目标元素后面 */
        if (curPosition === 'after') {
          deleteJsonByIndex(curIndexRoute, true); // 设置为true表示跳过onChange
          insertJsonData(targetIndexRoute, curJsonKey, curJsonObj);
        } else {
          // curPosition === 'before'
          insertJsonData(targetIndexRoute, curJsonKey, curJsonObj, '', true); // 设置为true表示跳过onChange
          deleteJsonByIndex(curIndexRoute);
        }
      }

      // 延迟300毫秒执行，以便获取到最新的key值路径
      setTimeout(() => {
        // 跨级拖拽排序的时候，记录原始位置元素所在的位置，以便保留其数值
        if (!cacheTargetKeyRoute) {
          saveWebCacheData(
            `${indexRoute2keyRoute(cacheTardetIndex)}-${currentFormat}`,
            curKeyRoute,
          );
        } else {
          // 只保留第一次跨级拖拽时的数值
          saveWebCacheData(
            `${indexRoute2keyRoute(cacheTardetIndex)}-${currentFormat}`,
            cacheTargetKeyRoute,
          );
        }
      }, 300);
    }
  };

  render() {
    const { jsonSchema } = this.props;
    const isEmpty = isEmptySchema(jsonSchema);
    /**
     * 备注：此处单独将object进行渲染，主要是为了将Tree根组件抽离出来（以便在此处进行拖拽事件的处理），
     * JSONSchema的一级字段必须为object类型（规避非法的jsonSchema数据，以及结构单一的jsonSchema数据，后续再单独考虑如何兼容单一结构的jsonSchema数据）。
     * */
    return (
      <div className="json-schema-container">
        {!isEmpty && (
          <Tree
            draggable={true}
            selectable={false}
            onDragStart={this.onDragStart}
            onDrop={this.onDrop}
            defaultExpandedKeys={['func-func', 'style-style', 'data-data']}
          >
            {ObjectSchema({
              parentType: '',
              jsonKey: '',
              indexRoute: '',
              nodeKey: '',
              targetJsonData: jsonSchema,
              isOnlyShowChild: true,
            })}
          </Tree>
        )}
        {isEmpty && (
          <p className="json-schema-empty">当前jsonSchema没有数据内容</p>
        )}
      </div>
    );
  }
}

export default inject((stores) => ({
  jsonSchema: stores.jsonSchemaStore.jsonSchema,
  initJSONSchemaData: stores.jsonSchemaStore.initJSONSchemaData,
  initOnChange: stores.jsonSchemaStore.initOnChange,
  setPageScreen: stores.jsonSchemaStore.setPageScreen,
  getJSONDataByIndex: stores.jsonSchemaStore.getJSONDataByIndex,
  indexRoute2keyRoute: stores.jsonSchemaStore.indexRoute2keyRoute,
  insertJsonData: stores.jsonSchemaStore.insertJsonData,
  deleteJsonByIndex: stores.jsonSchemaStore.deleteJsonByIndex,
  isExitJsonKey: stores.jsonSchemaStore.isExitJsonKey,
  isSupportCurType: stores.jsonSchemaStore.isSupportCurType,
}))(observer(JSONSchema));
