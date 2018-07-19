import React, { Component } from 'react';

class Errors extends Component {
  render() {
    const msg = this.props.errormsg;
    const errClass = this.props.className;
    return (
      <div className={errClass}>
        <p className="md-text err-msg">
          <i class="fas fa-exclamation-triangle"></i>
          <span className="err-msg-text">{msg}</span>
        </p>
      </div>
    );
  }
}

export default Errors;
