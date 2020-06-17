import * as React from 'react';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import InputSchema from '$components/InputSchema/index';
import { isEqual } from '$utils/index';

class JSONSchema extends React.PureComponent {
  static propTypes = {
    onChange: PropTypes.func,
    data: PropTypes.object,
  };

  constructor(props) {
    super(props);
    // 根据props.data对jsonSchema进行初始化
    this.props.initJSONSchemaData(props.data);
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(nextProps.data, this.props.data)) {
      this.props.initJSONSchemaData(nextProps.data);
    }
  }

  mapping = (jsonKey, indexRoute, targetJsonObj) => {
    let { type } = data;

    switch (type) {
      case 'array':
        return (
          <InputSchema
            jsonKey={jsonKey}
            indexRoute={indexRoute}
            targetJsonObj={targetJsonObj}
          />
        );
        break;
      case 'object':
        return (
          <InputSchema
            jsonKey={jsonKey}
            indexRoute={indexRoute}
            targetJsonObj={targetJsonObj}
          />
        );
        break;
      default:
        return null;
    }
  };

  render() {
    const { jsonSchema, JSONSchemaObj } = this.props;

    console.log(jsonSchema);
    console.log(JSONSchemaObj);

    return <InputSchema />;
  }
}

export default inject((stores) => ({
  jsonSchema: stores.jsonSchemaStore.jsonSchema,
  initJSONSchemaData: stores.jsonSchemaStore.initJSONSchemaData,
  JSONSchemaObj: stores.jsonSchemaStore.JSONSchemaObj,
  getJSONDataByIndex: stores.jsonSchemaStore.getJSONDataByIndex,
}))(observer(JSONSchema));
