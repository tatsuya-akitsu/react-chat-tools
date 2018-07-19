import React, { Component } from 'react';
import { Link } from 'react-router';
import firebase from 'firebase';
import Message from './message';
import NewMessage from './newmessage';

import logo from '../../../public/images/logo.svg';

class Room extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      messages: []
    }

    this.db = firebase.database()
    this.handleOnPostMsg = this.handleOnPostMsg.bind(this);
  }

  componentDidMount() {
    const { roomId } = this.props.params;
    this.fetchRoom(roomId);
  }

  componentWillReceiveProps(nextProps) {
    const { roomId } = nextProps.params;
    if (roomId === this.props.params.roomId) {
      return;
    }

    if (this.stream) {
      this.stream.off();
    }

    this.setState({ messages: [] })
  }

  componentDidUpdate() {
    setTimeout(() => {
      this.room.parentNode.scrollTop = this.room.parentNode.scrollHeight;
    }, 0);
  }

  componentWillUnmount() {
    if (this.stream) {
      this.stream.off();
    }
  }

  handleOnPostMsg(message) {
    const newMsgRef = this.fbChatRoomRef.child('messages').push();
    this.user = this.user || firebase.auth().currentUser;
    return newMsgRef.update({
      writtenBy: {
        uid: this.user.uid,
        displayName: this.user.displayName,
        photoURL: this.user.photoURL
      },
      time: Date.now(),
      text: message,
    });
  }

  fetchRoom(roomId) {
    this.fbChatRoomRef = this.db.ref('/chatrooms/' + roomId);
    this.fbChatRoomRef.once("value").then(snapshot => {
      const { name, description } = snapshot.val();
      this.setState({ name, description });
      window.document.title = name;
    });

    this.stream = this.fbChatRoomRef.child("messages").limitToLast(10);
    this.stream.on("child_added",item => {
      const { messages } = this.state || [];
      messages.push(Object.assign({key:item.key},item.val()));
      this.setState({ messages });
    });
  }

  render() {
    const { messages } = this.state;
    return (
      <div className="l-main main-container page-container posR">
        <header className="l-header md-header md-header--style01 md-header--fixed">
          <div className="md-header-wrap">
            <div className="md-header-inner">
              <img src={logo} alt="Gray Line" className="md-icon_main" />
              <h1 className="md-headline md-headline_h1">Gray Line</h1>
            </div>
            <Link to="/rooms" className="md-btn btn-back">
              <i className="material-icons">keyboard_arrow_left</i>
              <span>戻る</span>
            </Link>
          </div>
        </header>
        <div className="app-room-wrap" ref={room => this.room = room}>
          <div className="msg-list-group">
            {messages.map(m => <Message key={m.key} message={m} />)}
          </div>
        </div>
        <NewMessage onMessagePost={this.handleOnPostMsg} />
      </div>
    );
  }
}

export default Room;
