import * as React from 'react';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import { Input } from 'antd';

class InputSchema extends React.PureComponent {
  static propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
    };
  }

  handleChange = (e) => {
    const { value } = e.target;
    this.setState({
      value,
    });
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setState({
        value: nextProps.value,
      });
    }
  }

  onKeyup = (e) => {
    if (e.keyCode === 13) {
      if (e.target.value !== this.props.value) {
      }
    }
  };

  handleBlur = (e) => {
    if (e.target.value !== this.props.value) {
    }
  };

  render() {
    const { value } = this.state;
    const { onChange, disabled } = this.props;

    return (
      <Input
        value={value}
        onKeyUp={this.onKeyup}
        onBlur={this.handleBlur}
        onChange={this.handleChange}
      />
    );
  }
}

export default inject((stores) => ({
  jsonSchema: stores.jsonSchema,
}))(observer(InputSchema));
