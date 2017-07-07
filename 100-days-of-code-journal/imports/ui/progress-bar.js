import React from 'react';
import PropTypes from 'prop-types';

export default class ProgressBar extends React.Component {
  renderOverflow() {
    var className = `progress-bar__overflow ${this.props.currPercentage > 100 ? ' progress-bar__overflow--active' : ''}`;
    return <div className={className}></div>
  }

  render() {
    return (
      <div className='progress-bar'>
        <div className='progress-bar__name'>{this.props.name}</div>
        <div className='progress-bar__meter__background'>
          <div className='progress-bar__meter__meter' style={{width: `${this.props.currPercentage}%`}}></div>
        </div>
        {this.renderOverflow()}
      </div>
    );
  }
}

ProgressBar.propTypes = {
  name: PropTypes.string.isRequired,
  currPercentage: PropTypes.number.isRequired
}