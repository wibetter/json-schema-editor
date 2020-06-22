import * as React from 'react';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import { Tree } from 'antd';
import BaseFormSchema from '$components/BaseFormSchema/index';
const { TreeNode } = Tree;
import { isEqual, isBoxSchemaElem, isSameParentElem } from '$utils/index';
import { isBoxSchemaData, getCurrentFormat } from '$utils/jsonSchema';
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
  onDragStart = (info) => {
    // 设置只有指定类型的元素可以拖拽
    if (
      info.node.props.className &&
      isBoxSchemaElem(info.node.props.className)
    ) {
      message.warning('该类型元素不支持拖拽哦');
      /** 【待开发】 */
      info.event.preventDefault();
      info.event.stopPropagation();
    }
  };

  /**
   * 拖拽相关方法：拖动完成时触发的事件
   */
  onDrop = (info) => {
    // 拖动的元素key
    const curEventKey = info.dragNode.props.eventKey;
    console.log(curEventKey);

    // 放置的目标元素key
    const targetEventKey = info.node.props.eventKey;
    console.log(targetEventKey);

    console.log(info);

    const _props = this.props;

    // 判断是否是同一个父级容器
    const isSameParentElem = isSameParentElem(curEventKey, targetEventKey);
    // 如果是同级父级容器，则判断先后顺序
    let elemOrder = true; // 默认为true：表示拖动元素在前目标元素在后，
    if (isSameParentElem) {
      const curKeyLastChar = curEventKey.substr(curEventKey.length - 1, 1);
      const targetKeyLastChar = targetEventKey.substr(
        curEventKey.length - 1,
        1,
      );
      if (curKeyLastChar > targetKeyLastChar) {
        elemOrder = false;
      }
    }
    /** 【待开发】 */
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
      parentJsonKey,
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
      /** 4. 获取当前元素的id，用于做唯一标识 */
      const nodeKey = `${parentJsonKey || parentType}-${currentJsonKey}`;

      return (
        <TreeNode
          className={`${getCurrentFormat(
            currentSchemaData,
          )}-schema schema-item-form`}
          id={nodeKey}
          key={nodeKey}
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
              parentJsonKey: currentJsonKey,
              parentType: currentSchemaData.format,
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
              onDragStart={this.onDragStart}
              onDrop={this.onDrop}
              defaultExpandAll={false}
            >
              {this.propertiesRender({
                propertyOrder: jsonSchema.propertyOrder,
                properties: jsonSchema.properties,
                parentIndexRoute: '',
                parentJsonKey: '',
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
}))(observer(JSONSchema));
