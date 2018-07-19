import React, { Component } from 'react';
import { Link, hashHistory } from 'react-router';
import firebase from 'firebase';
import Errors from './errors';

import logo from '../../../public/images/logo.svg';
import vector from '../../../public/images/top_vector.png';


class UsrLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: localStorage.email || '',
      password: localStorage.password || '',
      errors: [],
      errClass: false
    }

    this.handleOnChangeEmail = this.handleOnChangeEmail.bind(this);
    this.handleOnChangePassword = this.handleOnChangePassword.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.handleLoginGoogle = this.handleLoginGoogle.bind(this);
    this.handleLoginTwitter = this.handleLoginTwitter.bind(this);
  }

  handleOnChangeEmail(e) {
    e.preventDefault();
    this.setState({ email: e.target.value })
  }

  handleOnChangePassword(e) {
    e.preventDefault();
    this.setState({ password: e.target.value })
  }

  handleOnSubmit(e) {
    e.preventDefault();
    const { email, password } = this.state;
    const errors = [];
    let isValid = true;

    if (!email.length) {
      isValid = false;
      errors.push('メールアドレスが未入力です')
      this.setState({ errClass: true })
    }

    if (!password.length) {
      isValid = false;
      errors.push('パスワードが未入力です')
      this.setState({ errClass: true })
    }

    if (!isValid) {
      this.setState({ errors });
      return;
    }

    firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
      localStorage.email = email;
      localStorage.password = password;
      hashHistory.push('/rooms');
    }).catch(() => {
      this.setState({
        errors: 'ログインに失敗しました',
        errClass: true
      })
    })
  }

  handleLoginGoogle(e) {
    e.preventDefault();
    let provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(() => {
      hashHistory.push('/rooms')
    }).catch(() => {
      this.setState({
        errors: 'ログインに失敗しました',
        errClass: true
      })
    })
  }

  handleLoginTwitter(e) {
    e.preventDefault();
    let provider = new firebase.auth.TwitterAuthProvider();
    firebase.auth().signInWithPopup(provider).then(() => {
      hashHistory.push('/rooms')
    }).catch(() => {
      this.setState({
        errors: 'ログインに失敗しました',
        errClass: true
      })
    })
  }

  render() {
    const errClass = this.state.errClass === true ? 'app-err-msg is-block' : 'app-err-msg';

    return (
      <div className="l-main main-container top-container posR">
        <img src={vector} alt="" className="top-thumb posA" />
        <div className="top-wrap">
        <header className="l-header md-header">
          <img src={logo} alt="Gray Line" className="md-icon_main" />
          <h1 className="md-headline md-headline_h1">Gray Line</h1>
          <p className="md-text md-text_small">
            It is a service that you can feel free to communicate with anyone anytime<br />
            Please create a new account or cooperate with SNS account and enjoy
          </p>
        </header>
        <div className="app-login">
          <form onSubmit={this.handleOnSubmit} className="app-signin-form">
            <Errors className={errClass} errormsg={this.state.errors} />
            <div className="app-form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="example@example.com"
                className="app-form-control"
                onChange={this.handleOnChangeEmail}
                onBlur={this.handleOnChangeEmail}
                value={this.state.email}
              />
            </div>
            <div className="app-form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="●●●●●●●●"
                className="app-form-control"
                onChange={this.handleOnChangePassword}
                onBlur={this.handleOnChangePassword}
                value={this.state.password}
              />
            </div>
            <div className="app-form-group">
              <button className="md-btn btn-signin">Login</button>
              <p className="md-text signup-text">新規アカウント作成は<Link to="/signup">こちら</Link></p>
            </div>
          </form>
          <div className="app-login-social">
            <button className="md-btn btn-twitter" onClick={this.handleLoginTwitter}><i className="fab fa-twitter"></i>twitter</button>
            <button className="md-btn btn-google" onClick={this.handleLoginGoogle}><i className="fab fa-google"></i>Google</button>
          </div>
        </div>
        </div>
        <footer className="l-footer md-footer top-footer">
          <p className="md-text copyright"><small>&copy;gray line</small></p>
        </footer>
      </div>
    );
  }
}

export default UsrLogin;
