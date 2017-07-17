import React from 'react';
import PropTypes from 'prop-types';

export default class LoginSignupForm extends React.Component {
  render() {
    return (
      <div className='wrapper'>
        <div className='form'>
          <form onSubmit={this.props.onSubmit.bind(this)}>

            <div className='label-data-pair form__row'>
              <div className='label-data-pair__label'>Your Best Email</div>
              <div className='label-data-pair__data form__child--flex'>
                <input className='form__input form__input--flex-grow' 
                  type='email' id='email' name='email' ref='email' 
                  placeholder='Email'
                />
              </div>
            </div>
            
            <div className='label-data-pair form__row'>
              <div className='label-data-pair__label'>Your Password</div>
              <div className='label-data-pair__data form__child--flex'>
                <input className='form__input form__input--flex-grow' 
                  type='password' id='password' name='password' ref='password' 
                  placeholder='Password'
                />
              </div>
            </div>

            <button className='button button--dark' >{this.props.isLogin ? 'Login now!' : 'Signup now!'}!</button>
          </form>
        </div>
      </div>
    );
  }
}

LoginSignupForm.propTypes = {
  isLogin: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired
}