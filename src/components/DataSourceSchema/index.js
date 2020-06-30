import React from 'react';
import { Tree } from 'antd';
const { TreeNode } = Tree;
import BaseFormSchema from '$components/BaseFormSchema/index';
import TypeSelectFormSchema from '$components/TypeSelectFormSchema/index';
import { getCurrentFormat } from '$utils/jsonSchema';

/** 渲染当前字段的表单项（Tree的单项内容） */
const getTreeNodeTitleCont = (params) => {
  return <BaseFormSchema {...params} />;
};

/** 渲染dataSelect在的内容 */
const getTypeSelectCont = (params) => {
  return <TypeSelectFormSchema {...params} />;
};

/** DataSource类型渲染组件 */
const DataSourceSchema = (props) => {
  const { parentType, jsonKey, indexRoute, nodeKey, targetJsonData } = props;
  const currentFormat = getCurrentFormat(targetJsonData);
  const dataJsonObj = targetJsonData.properties.data;

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
    >
      <TreeNode
        className={'dataSource-type-item-schema schema-item-form'}
        id={`${nodeKey}-type`}
        key={`${nodeKey}-type`}
        indexRoute={`${indexRoute}-0`}
        jsonKey={'type'}
        disabled={true}
        title={getTypeSelectCont({
          indexRoute: `${indexRoute}-0`,
          jsonKey: 'type',
          targetJsonData: targetJsonData.properties.type,
          parentType: currentFormat,
          nodeKey: `${nodeKey}-type`,
        })}
      ></TreeNode>
      <TreeNode
        className={'dataSource-data-item-schema schema-item-form'}
        id={`${nodeKey}-data-${dataJsonObj.format}`}
        key={`${nodeKey}-data-${dataJsonObj.format}`}
        indexRoute={`${indexRoute}-1`}
        jsonKey={'data'}
        disabled={true}
        title={getTreeNodeTitleCont({
          indexRoute: `${indexRoute}-1`,
          jsonKey: 'data',
          targetJsonData: dataJsonObj,
          parentType: currentFormat,
          nodeKey: `${nodeKey}-data-${dataJsonObj.format}`,
          isFixed: false,
        })}
      ></TreeNode>
      <TreeNode
        className={'dataSource-filter-item-schema schema-item-form'}
        id={`${nodeKey}-filter`}
        key={`${nodeKey}-filter`}
        indexRoute={`${indexRoute}-2`}
        jsonKey={'filter'}
        disabled={true}
        title={getTreeNodeTitleCont({
          indexRoute: `${indexRoute}-2`,
          jsonKey: 'filter',
          targetJsonData: targetJsonData.properties.filter,
          parentType: currentFormat,
          nodeKey: `${nodeKey}-filter`,
          isFixed: false,
        })}
      ></TreeNode>
    </TreeNode>
  );
};

export default DataSourceSchema;
