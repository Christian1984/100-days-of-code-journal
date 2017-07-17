import React from 'react';
import { Meteor } from 'meteor/meteor';

import TitleBar from './components/TitleBar';
import LoginSignupForm from './components/LoginSignupForm';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      err: undefined
    };
  }

  onSubmitLogin(e) {
    e.preventDefault();

    let email = e.target.email.value;
    let password = e.target.password.value;

    Meteor.loginWithPassword({ 
      email 
    }, password, (err) =>{
      if (err) {
        this.setState({ err });
        return;
      }

      this.setState({err: undefined});
      console.log('SUCCESS: Logged in!');
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
          <h1>Login</h1>
          {this.renderError()}
          <LoginSignupForm isLogin={true} onSubmit={this.onSubmitLogin.bind(this)} />
          <p>Don't have an account yet? <a href='/signup'>Signup here!</a></p>
        </div>
      </div>
    );
  }
}