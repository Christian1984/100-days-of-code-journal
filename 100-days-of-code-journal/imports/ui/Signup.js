import React from 'react';
import { Accounts } from 'meteor/accounts-base';

import TitleBar from './components/TitleBar';
import LoginSignupForm from './components/LoginSignupForm';

export default class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      err: undefined
    };
  }

  onSubmitSignup(e) {
    e.preventDefault();

    let email = e.target.email.value;
    let password = e.target.password.value;

    Accounts.createUser({
      email,
      password
    }, (err) => {
      if (err) {
        this.setState({ err });
        return;
      }

      this.setState({err: undefined});
      console.log('SUCCESS: Account created!');
    });
  }

  renderError() {
    if (!this.state.err) return;
    return <div className='error'>Ups, something went wrong: {this.state.err.message}</div>
  }

  render() {
    return (
      <div>
        <TitleBar 
          title='#100DaysOfCode Journal' 
          subtitle='made by chris' 
        />
        <div className='wrapper'>
          <h1>Signup</h1>
          {this.renderError()}
          <LoginSignupForm isLogin={false} onSubmit={this.onSubmitSignup.bind(this)} />
          <p>Have an account already? <a href='/'>Login here!</a></p>
        </div>
      </div>
    );
  }
}