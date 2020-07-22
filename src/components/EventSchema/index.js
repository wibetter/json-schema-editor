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

/** Event类型渲染组件 */
const EventSchema = (props) => {
  const { parentType, jsonKey, indexRoute, nodeKey, targetJsonData } = props;
  const currentFormat = getCurrentFormat(targetJsonData);
  const typeJsonObj = targetJsonData.properties.type || {};
  // 注册类型事件的数据对象
  const registerJsonObj = targetJsonData.properties.register || {};
  const actionFuncJsonObj = targetJsonData.properties.actionFunc || {};
  // 触发事件类型的数据对象
  const triggerJsonObj = targetJsonData.properties.trigger || {};
  const eventDataJsonObj = targetJsonData.properties.eventData || {};

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
        className={'event-type-item-schema schema-item-form'}
        id={`${nodeKey}-type`}
        key={`${nodeKey}-type`}
        indexRoute={`${indexRoute}-0`}
        jsonKey={'type'}
        disabled={true}
        title={getTypeSelectCont({
          indexRoute: `${indexRoute}-0`,
          jsonKey: 'type',
          targetJsonData: typeJsonObj,
          parentType: currentFormat,
          nodeKey: `${nodeKey}-type`,
        })}
      ></TreeNode>
      {typeJsonObj.default === 'on' && registerJsonObj && (
        <TreeNode
          className={'event-register-item-schema schema-item-form'}
          id={`${nodeKey}-register-${typeJsonObj.default}`}
          key={`${nodeKey}-register-${typeJsonObj.default}`}
          indexRoute={`${indexRoute}-1`}
          jsonKey={'register'}
          disabled={true}
          title={getTreeNodeTitleCont({
            indexRoute: `${indexRoute}-1`,
            jsonKey: 'register',
            targetJsonData: registerJsonObj,
            parentType: currentFormat,
            nodeKey: `${nodeKey}-register-${typeJsonObj.default}`,
            hideOperaBtn: true,
            keyIsFixed: true,
            typeIsFixed: true,
          })}
        ></TreeNode>
      )}
      {typeJsonObj.default === 'on' && actionFuncJsonObj && (
        <TreeNode
          className={'event-actionFunc-item-schema schema-item-form'}
          id={`${nodeKey}-actionFunc-${typeJsonObj.default}`}
          key={`${nodeKey}-actionFunc-${typeJsonObj.default}`}
          indexRoute={`${indexRoute}-2`}
          jsonKey={'actionFunc'}
          disabled={true}
          title={getTreeNodeTitleCont({
            indexRoute: `${indexRoute}-2`,
            jsonKey: 'actionFunc',
            targetJsonData: actionFuncJsonObj,
            parentType: currentFormat,
            nodeKey: `${nodeKey}-actionFunc-${typeJsonObj.default}`,
            hideOperaBtn: true,
            keyIsFixed: true,
            typeIsFixed: true,
          })}
        ></TreeNode>
      )}
      {typeJsonObj.default === 'emit' && triggerJsonObj && (
        <TreeNode
          className={'event-trigger-item-schema schema-item-form'}
          id={`${nodeKey}-trigger-${typeJsonObj.default}`}
          key={`${nodeKey}-trigger-${typeJsonObj.default}`}
          indexRoute={`${indexRoute}-1`}
          jsonKey={'trigger'}
          disabled={true}
          title={getTreeNodeTitleCont({
            indexRoute: `${indexRoute}-1`,
            jsonKey: 'trigger',
            targetJsonData: triggerJsonObj,
            parentType: currentFormat,
            nodeKey: `${nodeKey}-trigger-${typeJsonObj.default}`,
            hideOperaBtn: true,
            keyIsFixed: true,
            typeIsFixed: true,
          })}
        ></TreeNode>
      )}
      {typeJsonObj.default === 'emit' && eventDataJsonObj && (
        <TreeNode
          className={'event-eventData-item-schema schema-item-form'}
          id={`${nodeKey}-eventData-${typeJsonObj.default}`}
          key={`${nodeKey}-eventData-${typeJsonObj.default}`}
          indexRoute={`${indexRoute}-2`}
          jsonKey={'eventData'}
          disabled={true}
          title={getTreeNodeTitleCont({
            indexRoute: `${indexRoute}-2`,
            jsonKey: 'eventData',
            targetJsonData: eventDataJsonObj,
            parentType: currentFormat,
            nodeKey: `${nodeKey}-eventData-${typeJsonObj.default}`,
            hideOperaBtn: true,
            keyIsFixed: true,
            typeIsFixed: true,
          })}
        ></TreeNode>
      )}
    </TreeNode>
  );
};

export default EventSchema;
