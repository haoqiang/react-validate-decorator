'use strict';

import React from 'react';

class InputComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  //
  // used by create form
  //    valid
  //
  getValue() {
    console.log(this._getValue());
    return this._getValue();
  }

  getSpecifiedValue() {
    if (!this.state.isEmpty) {
      return this._getValue();
    }
  }

  //
  // used by edit form
  //    valid && changed
  //
  getChangedValue() {
    if (this.state.isChanged) {
      return this._getValue();
    }
  }

  //
  // use for receiving value updates from parent
  //
  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setState({
        value: nextProps.value || ''
      });
    }
  }
}

export default InputComponent;
