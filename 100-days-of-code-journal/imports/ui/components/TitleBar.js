import React from 'react';
import PropTypes from 'prop-types';

export default class TitleBar extends React.Component {
  renderSubtitle() {
    if (this.props.subtitle) {
      return <h2 className='title-bar__subtitle'>{this.props.subtitle}</h2>;
    }
  }
  
  render() {
    return (
        <div className='title-bar'>
          <div className='wrapper'>
            <div className='title-bar__flex-wrapper'>
              <h1 className='title-bar__title'>{this.props.title}</h1>
              {this.renderSubtitle()}
            </div>
          </div>
        </div>
    );
  }
};

TitleBar.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string
};