import React from 'react';
import { Accounts } from 'meteor/accounts-base';

export default class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      err: undefined
    };
  }

  onSubmitSignup(e) {
    e.preventDefault();

    let email = this.refs.email.value;
    let password = this.refs.password.value;

    Accounts.createUser({
      email,
      password
    }, (err) => {
      if (err) {
        this.setState({ err });
        return;
      }

      console.log('SUCCESS: Account created!');
    });
  }

  renderError() {
    if (!this.state.err) return;
    return <div>Ups, something went wrong: {this.state.err.message}</div>
  }

  render() {
    return (
      <div>
        <h1>Signup</h1>
        {this.renderError()}
        <form onSubmit={this.onSubmitSignup.bind(this)}>
          <input type='email' ref='email' placeholder='Email' />
          <input type='password' ref='password' placeholder='Password' />
          <button>Signup now!</button>
        </form>

        <a href='/journal'>TEMP: Goto to Journal...</a>
        <p>Have an account already? <a href='/'>Login here!</a></p>
      </div>
    );
  }
}