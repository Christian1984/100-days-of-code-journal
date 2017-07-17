import React from 'react';
import { Meteor } from 'meteor/meteor';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      err: undefined
    };
  }

  onSubmitLogin(e) {
    e.preventDefault();

    let email = this.refs.email.value;
    let password = this.refs.password.value;

    Meteor.loginWithPassword({ 
      email 
    }, password, (err) =>{
      if (err) {
        this.setState({ err });
        return;
      }

      console.log('SUCCESS: Logged in!');
    });
  }

  renderError() {
    if (!this.state.err) return;
    return <div>Ups, something went wrong: {this.state.err.message}</div>
  }

  render() {
    return (
      <div>
        <h1>Login</h1>
        {this.renderError()}        
        <form onSubmit={this.onSubmitLogin.bind(this)}>
          <input type='email' ref='email' placeholder='Email' />
          <input type='password' ref='password' placeholder='Password' />
          <button>Login now!</button>
        </form>
        
        <a href='/journal'>TEMP: Goto to Journal...</a>
        <p>Don't have an account yet? <a href='/signup'>Signup here!</a></p>
      </div>
    );
  }
}