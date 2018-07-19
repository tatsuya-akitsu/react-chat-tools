import React, { Component } from 'react';

class Avator extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { photoURL } = this.props.user;
    if(photoURL){
      return <img className="app-usr-img" src={photoURL} />;
    } else {
      return (
        <div className="app-usr-non">
          <span className="icon icon-user" />
        </div>
      );
    }
  }
}

export default Avator;
