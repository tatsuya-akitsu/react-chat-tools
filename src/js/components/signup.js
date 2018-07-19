import React, { Component } from 'react';
import { Link, hashHistory } from 'react-router';
import firebase from 'firebase';
import Errors from './errors';

import logo from '../../../public/images/logo.svg';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      photoURL: '',
      errors: [],
      errClass: false
    }

    this.handleOnEmail = this.handleOnEmail.bind(this);
    this.handleOnPassword = this.handleOnPassword.bind(this);
    this.handleOnName = this.handleOnName.bind(this);
    this.handleOnImg = this.handleOnImg.bind(this);
    this.handleOnAddSubmit = this.handleOnAddSubmit.bind(this);
  }

  handleOnEmail(e) {
    e.preventDefault();
    this.setState({ email: e.target.value })
  }

  handleOnPassword(e) {
    e.preventDefault();
    this.setState({ password: e.target.value })
  }

  handleOnName(e) {
    e.preventDefault();
    this.setState({ name: e.target.value })
  }

  handleOnImg(e) {
    const storageRef = firebase.storage().ref();
    var uploadRef = storageRef.child(e.target.files[0].name);
    const f = e.target.files[0];
    uploadRef.put(f).then((snapshot) => {
      uploadRef.getDownloadURL().then((url) => {
        const thumbnail = window.document.querySelector('.app-usr-upload');
        thumbnail.style.backgroundImage = "url("+url+")";
        this.setState({ photoURL: url })
      }).catch((err) => {
        console.log(err)
      });
    });
  }

  handleOnAddSubmit(e) {
    e.preventDefault();
    const { name, email, password, photoURL } = this.state;
    const errors = [];
    let isValid = true;

    if (!name.length) {
      isValid = false;
      errors.push('アカウント名が未入力です')
      this.setState({ errClass: true })
    }

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

    firebase.auth().createUserWithEmailAndPassword(email, password).then(newUser => {
      return newUser.user.updateProfile({
        displayName: name,
        photoURL: photoURL
      });
    }).then(() => {
      hashHistory.push('/rooms');
    }).catch(err => {
      this.setState({
        errors: [err.message],
        errClass: true
      })
    })
  }

  render() {
    const errClass = this.state.errClass === true ? 'app-err-msg is-block' : 'app-err-msg';

    return (
      <div className="l-main main-container signup-container posR">
        <div className="signin-wrap posR">
          <header className="l-header md-header">
            <img src={logo} alt="Gray Line" className="md-icon_main" />
            <h1 className="md-headline md-headline_h1">Gray Line</h1>
            <p className="md-text md-text_small">
              It is a service that you can feel free to communicate with anyone anytime<br />
              Please create a new account or cooperate with SNS account and enjoy
            </p>
          </header>
          <form onSubmit={this.handleOnAddSubmit} className="app-signup-form">
            <Errors className={errClass} errormsg={this.state.errors} />
            <div className="app-form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="example@example.com"
                className="app-form-control"
                onChange={this.handleOnEmail}
                onBlur={this.handleOnEmail}
                value={this.state.email}
                required
              />
            </div>
            <div className="app-form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="●●●●●●●●"
                className="app-form-control"
                onChange={this.handleOnPassword}
                onBlur={this.handleOnPassword}
                value={this.state.password}
                required
              />
            </div>
            <div className="app-form-group">
              <label>User Name</label>
              <input
                type="text"
                name="name"
                placeholder="山田 太郎"
                className="app-form-control"
                onChange={this.handleOnName}
                onBlur={this.handleOnName}
                value={this.state.name}
                required
              />
            </div>
            <div className="app-form-group">
              <label>Thumbnail</label>
              <div className="app-dropzone posR">
                <p className="md-text dropzone-desc posA">クリックしてファイルをアップロード</p>
                <input
                  type="file"
                  name="file"
                  className="posA"
                  onChange={this.handleOnImg}
                />
              </div>
              <div className="app-usr-upload-wrap">
                <div className="app-usr-upload" />
              </div>
            </div>
            <div className="app-form-group">
              <button className="md-btn btn-signup">Create new Account</button>
              <p className="md-text signup-text">アカウントをお持ちの方はこちらから<Link to="/">ログイン</Link>してください</p>
            </div>
          </form>
        </div>
        <footer className="l-footer md-footer posR">
          <p className="md-text copyright"><small>&copy;gray line</small></p>
        </footer>
      </div>
    )
  }
}

export default Signup;
