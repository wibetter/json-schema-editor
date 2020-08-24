import React from 'react';
import { Tree } from 'antd';
const { TreeNode } = Tree;
import BaseFormSchema from '$components/BaseFormSchema/index';
import TypeSelectFormSchema from '$components/TypeSelectFormSchema/index';
import { getCurrentFormat } from '@wibetter/json-utils';

/** 渲染当前字段的表单项（Tree的单项内容） */
const getTreeNodeTitleCont = (params) => <BaseFormSchema {...params} />;

/** 渲染dataSelect在的内容 */
const getTypeSelectCont = (params) => <TypeSelectFormSchema {...params} />;

/** DynamicData类型渲染组件 */
const DynamicDataSchema = (props) => {
  const { jsonKey, indexRoute, nodeKey, targetJsonData } = props;
  const currentFormat = getCurrentFormat(targetJsonData);
  const configJsonObj = targetJsonData.properties.config || {};
  const dataJsonObj = targetJsonData.properties.data || {};

  return (
    <TreeNode
      className={`${currentFormat}-schema schema-item-form`}
      id={nodeKey}
      key={nodeKey}
      indexRoute={indexRoute}
      jsonKey={jsonKey}
      title={getTreeNodeTitleCont({
        ...props,
      })}
    >
      <TreeNode
        className={'dataSource-type-item-schema schema-item-form'}
        id={`${nodeKey}-type`}
        key={`${nodeKey}-type`}
        indexRoute={indexRoute ? `${indexRoute}-0` : '0'}
        jsonKey={'type'}
        disabled={true}
        title={getTypeSelectCont({
          indexRoute: indexRoute ? `${indexRoute}-0` : '0',
          jsonKey: 'type',
          targetJsonData: targetJsonData.properties.type,
          parentType: currentFormat,
          nodeKey: `${nodeKey}-type`,
        })}
      ></TreeNode>
      <TreeNode
        className={'dataSource-config-item-schema schema-item-form'}
        id={`${nodeKey}-config-${dataJsonObj.format}`}
        key={`${nodeKey}-config-${dataJsonObj.format}`}
        indexRoute={indexRoute ? `${indexRoute}-1` : '1'}
        jsonKey={'config'}
        disabled={true}
        title={getTreeNodeTitleCont({
          indexRoute: indexRoute ? `${indexRoute}-1` : '1',
          jsonKey: 'config',
          targetJsonData: configJsonObj,
          parentType: currentFormat,
          nodeKey: `${nodeKey}-config-${configJsonObj.format}`,
          hideOperaBtn: true,
          keyIsFixed: true,
          typeIsFixed: true,
        })}
      ></TreeNode>
      <TreeNode
        className={'dataSource-data-item-schema schema-item-form'}
        id={`${nodeKey}-data-${dataJsonObj.format}`}
        key={`${nodeKey}-data-${dataJsonObj.format}`}
        indexRoute={indexRoute ? `${indexRoute}-2` : '2'}
        jsonKey={'data'}
        disabled={true}
        title={getTreeNodeTitleCont({
          indexRoute: indexRoute ? `${indexRoute}-2` : '2',
          jsonKey: 'data',
          targetJsonData: dataJsonObj,
          parentType: currentFormat,
          nodeKey: `${nodeKey}-data-${dataJsonObj.format}`,
          hideOperaBtn: true,
          keyIsFixed: true,
          typeIsFixed: true,
        })}
      ></TreeNode>
    </TreeNode>
  );
};

export default DynamicDataSchema;
