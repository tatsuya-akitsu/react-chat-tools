import React, { Component } from 'react';

class NewMessage extends Component {
  constructor(props){
    super(props);
    this.state = {
      message: ''
    };
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
  }

  handleOnChange(e){
    this.setState({message:e.target.value});
  }

  handleOnSubmit(e){
    const { onMessagePost } = this.props;
    if (!onMessagePost || !this.state.message.length) {
      return;
    }
    onMessagePost(this.state.message);
    this.state({ message: ""});
    e.preventDefault();
  }

  render(){
    return(
      <form className="app-msg-form app-form--fixed" onSubmit={this.handleOnSubmit}>
        <textarea
          name="message"
          placeholder="Hello, world"
          className="app-form-control add-new-msg"
          onChange={this.handleOnChange}
          value={this.state.message}
        />
        <button className="md-btn btn-msg-submit">
          <i className="material-icons">add</i>
          投稿
        </button>
      </form>
    );
  }
}

export default NewMessage;
