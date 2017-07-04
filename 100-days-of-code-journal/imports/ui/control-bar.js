import React from 'react';
import PropTypes from 'prop-types';

export default class ControlBar extends React.Component {  
  render() {
    return (
        <div className='control-bar'>
          <button>Play/Pause</button>
          <div>TIME</div>
          <button>Finish</button>
        </div>
    );
  }
};

ControlBar.propTypes = {
  
};    