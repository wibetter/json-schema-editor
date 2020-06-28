import React from 'react';
import { Tree } from 'antd';
const { TreeNode } = Tree;
import BaseFormSchema from '$components/BaseFormSchema/index';
import { getCurrentFormat } from '$utils/jsonSchema';

/** 渲染当前字段的表单项（Tree的单项内容） */
const getTreeNodeTitleCont = (params) => {
  return <BaseFormSchema {...params} />;
};

/** Event类型渲染组件 */
const EventSchema = (props) => {
  const { parentType, jsonKey, indexRoute, nodeKey, targetJsonData } = props;
  const currentFormat = getCurrentFormat(targetJsonData);

  return (
    <TreeNode
      className={`${currentFormat}-schema schema-item-form`}
      id={nodeKey}
      key={nodeKey}
      indexRoute={indexRoute}
      jsonKey={jsonKey}
      title={getTreeNodeTitleCont({
        indexRoute,
        jsonKey,
        targetJsonData,
        parentType,
        nodeKey,
      })}
    ></TreeNode>
  );
};

export default EventSchema;
