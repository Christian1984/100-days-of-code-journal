import React from 'react';

export default class Login extends React.Component {
  render() {
    return (
      <div>
        <h1>Login</h1>
        <p>Login Form Goes Here!</p>
        <a href='/journal'>TEMP: Goto to Journal...</a>
        <p>Don't have an account yet? <a href='/signup'>Signup here!</a></p>
      </div>
    );
  }
}