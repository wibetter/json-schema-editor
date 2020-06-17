import * as React from 'react';
import ReactDOM from 'react-dom';
import JSONSchemaEditor from './main';
import './index.scss';

/**
 * JSONSchema的测试Demo
 */
class IndexDemo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      jsonSchema: {},
    };
  }

  render() {
    const { jsonSchema } = this.state;
    return (
      <JSONSchemaEditor
        data={jsonSchema}
        onChange={(e) => {
          console.log('changeValue', e);
        }}
      />
    );
  }
}

ReactDOM.render(
  <div>
    <h1>JSON-Schema-Editor</h1>

    <br />
    <h2>Example:</h2>
    <hr />

    <IndexDemo />
  </div>,
  document.getElementById('root'),
);
