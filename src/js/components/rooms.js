import React, { Component } from 'react';
import { Link, hashHistory } from 'react-router';
import firebase from 'firebase';
import RoomItem from './roomitem';

import logo from '../../../public/images/logo.svg';

class Rooms extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roomName: '',
      roomDesc: '',
      rooms: []
    }

    this.db = firebase.database();
    this.handleOnAddRoomName = this.handleOnAddRoomName.bind(this);
    this.handleOnAddRoomDesc = this.handleOnAddRoomDesc.bind(this);
    this.handleOnAddRoomSubmit = this.handleOnAddRoomSubmit.bind(this);
  }

  componentDidMount() {
    this.fetchRooms();
  }

  handleOnAddRoomName(e) {
    e.preventDefault();
    this.setState({ roomName: e.target.value });
  }

  handleOnAddRoomDesc(e) {
    e.preventDefault();
    this.setState({ roomDesc: e.target.value });
  }

  handleOnAddRoomSubmit(e) {
    e.preventDefault();
    const { roomName, roomDesc } = this.state;

    if (!roomName.length) { 
      return
    }

    const newRoomRef = this.db.ref('/chatrooms').push();
    const newRoom = {
      name: roomName,
      description: roomDesc
    };

    newRoomRef.update(newRoom).then(() => {
      this.setState({ roomName: '', roomDesc: '' });
      return this.fetchRooms().then(() => {
        hashHistory.push(`/rooms/${newRoomRef.key}`)
      });
    });
  }

  fetchRooms() {
    return this.db.ref('/chatrooms').limitToLast(20).once('value').then(snapshot => {
      const rooms = [];
      snapshot.forEach(item => {
        rooms.push(Object.assign({key: item.key}, item.val()));
      });
      this.setState({ rooms })
    });
  }

  renderRoomList() {
    const { roomId } = this.props.params;
    const { rooms, roomName, roomDesc } = this.state;
    return (
      <section className="room-list-wrap">
        <div className="add-room-wrap">
          <h3 className="md-headline md-headline_h3">チャンネルを作成する</h3>
          <form className="app-newRoom-form" onSubmit={this.handleOnAddRoomSubmit}>
            <div className="app-add-item">
              <label>チャンネル名</label>
              <input
                type="text"
                name="name"
                placeholder="general"
                className="app-form-control add-room-name"
                onChange={this.handleOnAddRoomName}
                onBlur={this.handleOnAddRoomName}
                value={roomName}
              />
            </div>
            <div className="app-add-item">
              <label>チャンネル概要</label>
              <textarea
                name="description"
                placeholder="全体共有チャンネルです"
                className="app-form-control add-room-desc"
                onChange={this.handleOnAddRoomDesc}
                onBlur={this.handleOnAddRoomDesc}
                value={roomDesc}
              />
            </div>
            <button className="md-btn btn-addRoom">
              <i className="material-icons">add</i>
              <span>追加</span>
            </button>
          </form>
        </div>
        <div className="app-roomList-wrap">
          <h3 className="md-headline md-headline_h3">チャンネル一覧</h3>
          <ul className="app-room-list">
            { rooms.map(r => <RoomItem room={r} key={r.key} selected={r.key === roomId} />) }
          </ul>
        </div>
      </section>
    );
  }

  renderRoom() {
    if (this.props.children) {
      return this.props.children;
    } else {
      return (
        <div className="app-init-screen">
          <p className="md-text">Join a chat room from the sidebar or create your chat room.</p>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="l-main main-container page-container posR">
        <header className="l-header md-header md-header--style01">
          <div className="md-header-wrap">
            <div className="md-header-inner">
              <img src={logo} alt="Gray Line" className="md-icon_main" />
              <h1 className="md-headline md-headline_h1">Gray Line</h1>
            </div>
            <Link to="/" className="md-btn btn-back" onClick={() => firebase.auth().signOut()}>
              <i className="material-icons">keyboard_arrow_left</i>
              <span>Logout</span>
            </Link>
          </div>
        </header>
        <section className="app-panel-group">
          <div className="app-panel side-panel">{this.renderRoomList()}</div>
        </section>
      </div>
    );
  }
}

export default Rooms;
