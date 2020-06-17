import React from 'react';
import PropTypes from 'prop-types';
import mockEditor from './mockEditor';

const ModeMap = {
  javascript: 'ace/mode/javascript',
  json: 'ace/mode/json',
  text: 'ace/mode/text',
  xml: 'ace/mode/xml',
  html: 'ace/mode/html',
};

function isNotMatch(a, b) {
  try {
    return JSON.stringify(a) !== JSON.stringify(b);
  } catch (e) {
    return true;
  }
}

function getMode(mode) {
  return ModeMap[mode] || ModeMap.text;
}

class AceEditor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mock: '',
    };
  }

  componentDidMount() {
    this.editor = mockEditor({
      container: this.editorElement,
      data: this.props.data,
      onChange: this.props.onChange,
      readOnly: this.props.readOnly,
      fullScreen: this.props.fullScreen,
    });

    const mode = this.props.mode || 'javascript';
    this.editor.editor.getSession().setMode(getMode(mode));
    if (typeof this.props.callback === 'function') {
      this.props.callback(this.editor.editor);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.editor) return;

    if (
      isNotMatch(nextProps.data, this.props.data) &&
      isNotMatch(this.editor.getValue(), nextProps.data)
    ) {
      this.editor.setValue(nextProps.data);

      const mode = nextProps.mode || 'javascript';
      this.editor.editor.getSession().setMode(getMode(mode));
      this.editor.editor.clearSelection();
    }
  }

  render() {
    return (
      <div
        className={this.props.className}
        style={
          this.props.className
            ? undefined
            : this.props.style || { width: '100%', height: '200px' }
        }
        ref={(editor) => {
          this.editorElement = editor;
        }}
      />
    );
  }
}

AceEditor.propTypes = {
  data: PropTypes.string,
  onChange: PropTypes.func,
  className: PropTypes.string,
  mode: PropTypes.string, // enum[json, text, javascript], default is javascript
  readOnly: PropTypes.bool,
  callback: PropTypes.func,
  style: PropTypes.object,
  fullScreen: PropTypes.bool,
  insertCode: PropTypes.func,
};

export default AceEditor;
