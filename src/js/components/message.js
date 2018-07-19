import React, { Component } from 'react';
import Avator from './avator';

class Message extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { writtenBy, time, text } = this.props.message;
    const localString = new Date(time).toLocaleString();
    return (
      <div className="msg-item">
        <div className="msg-object">
          <Avator user={writtenBy} />
        </div>
        <div className="msg-body">
          <p className="md-text usr-name">{writtenBy.displayName}</p>
          <p className="md-text msg-time">{localString}</p>
          <p className="md-text msg-text">{text}</p>
        </div>
      </div>
    );
  }
}

export default Message;
