import React from 'react';

export default class Signup extends React.Component {
  render() {
    return (
      <div>
        <h1>Signup</h1>
        <p>Signup Form Goes Here!</p>
        <a href='/journal'>TEMP: Goto to Journal...</a>
        <p>Have an account already? <a href='/'>Login here!</a></p>
      </div>
    );
  }
}