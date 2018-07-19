import React, { Component } from 'react';
import { Link } from 'react-router';

class RoomItem extends Component {
  render() {
    const { selected } = this.props;
    const { name, description, key } = this.props.room;
    return (
      <li className={selected ? "app-room-item is-selected" : "app-room-item"}>
        <Link to={`/room/${key}`}>
          <div className="app-media">
            <p className="md-text room-name">{name}</p>
            <p className="md-text room-desc">{description}</p>
          </div>
        </Link>
      </li>
    );
  }
}

export default RoomItem;
