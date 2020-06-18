import * as React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import PropTypes from 'prop-types';

import JSONStore from '$store/index';
import JSONSchema from '$components/JSONSchema/index';

/**
 * JSONSchema功能组件
 * @param props
 * @constructor
 */
export default class JSONSchemaEditor extends React.PureComponent {
  static propTypes = {
    onChange: PropTypes.func,
    data: PropTypes.any,
    element: PropTypes.any,
  };

  render() {
    const { data, onChange, element } = this.props;

    const renderContent = (
      <Provider jsonSchemaStore={JSONStore.jsonSchemaStore}>
        <JSONSchema data={data} onChange={onChange} />
      </Provider>
    );

    if (element) {
      ReactDOM.render(renderContent, element); // 挂载到指定位置
      return '';
    } else {
      return renderContent; // 直接输出dom元素
    }
  }
}
