import React, { Component } from 'react';
import { Router, Route, hashHistory } from 'react-router';

import UsrLogin from './components/login';
import Signup from './components/signup';
import Rooms from './components/rooms';
import Room from './components/room';
class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router history={hashHistory}>
        <Route exact path="/" component={UsrLogin} />
        <Route path="/signup" component={Signup} />
        <Route path="/rooms" component={Rooms} />
        <Route path="/room/:roomId" component={Room} />
      </Router>
    );
  }
}

export default App;
