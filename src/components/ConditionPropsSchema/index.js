import React from 'react';
import { inject, observer } from 'mobx-react';
import { toJS } from 'mobx';
import { Tag } from 'antd';
import './index.scss';

/** 条件字段渲染组件 */
const ConditionPropsSchema = (props) => {
  const { jsonSchema, removeConditionProp } = props;
  let conditionProps = {};
  if (jsonSchema.conditionProps) {
    // 首次添加条件字段时
    conditionProps = toJS(jsonSchema.conditionProps);
  }
  const conditionPropKeys = Object.keys(conditionProps);

  // 当没有条件字段时，则不渲染任何内容
  if (conditionPropKeys.length === 0) {
    return '';
  } else {
    return (
      <div className="condition-props-box">
        <div className="title">条件字段:</div>
        <div className="tags-box">
          {conditionPropKeys.map((conditionKey) => {
            const conditionProp = conditionProps[conditionKey];
            return (
              <Tag
                key={conditionProp.indexRoute}
                color="geekblue"
                closable
                onClose={() => {
                  removeConditionProp(conditionProp.indexRoute);
                }}
              >
                {conditionProp.key}({conditionProp.title})
              </Tag>
            );
          })}
        </div>
      </div>
    );
  }
};

export default inject((stores) => ({
  jsonSchema: stores.jsonSchemaStore.jsonSchema,
  removeConditionProp: stores.jsonSchemaStore.removeConditionProp,
}))(observer(ConditionPropsSchema));
