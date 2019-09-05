import React from 'react';

import AceEditor from 'react-ace';
import 'brace/mode/markdown';
import 'brace/theme/kuroir';

export default class Editor extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.onChange = this.onChange.bind(this);
  }

  onChange(newValue) {
    this.props.onChange(newValue)
  }

  render() {
    return (
      <AceEditor
        mode="markdown"
        theme="kuroir"
        width="100%"
        height="100%"
        onChange={this.onChange}
        name={this.props.name}
        value={this.props.value}
        editorProps={{
          $blockScrolling: true
        }}
      />
    );
  }
}
