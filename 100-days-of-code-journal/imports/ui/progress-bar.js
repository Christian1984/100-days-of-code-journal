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
        <div className='progress-bar__name label-data-pair__label'>{this.props.name}</div>
          <div className='progress-bar__flex-wrapper'>
          <div className='progress-bar__meter__background'>
            <div className='progress-bar__meter__meter' style={{width: `${this.props.currPercentage}%`}}></div>
          </div>
          {this.renderOverflow()}
        </div>
      </div>
    );
  }
}

ProgressBar.propTypes = {
  name: PropTypes.string.isRequired,
  currPercentage: PropTypes.number.isRequired
}