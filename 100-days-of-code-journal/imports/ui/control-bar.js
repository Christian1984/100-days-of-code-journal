import React from 'react';
import PropTypes from 'prop-types';

import Moment from 'moment';

export default class ControlBar extends React.Component {
  getTotalTime() {
    let durationList = this.props.journalEntries.map((entry) => {
      return 60 * entry.duration.h + 1 * entry.duration.m;
    });

    var totalMinutes=0;
    for(var i in durationList) { totalMinutes+=durationList[i]; }

    return {
      h: ~~(totalMinutes / 60),
      m: totalMinutes % 60
    };
  }

  render() {
    let totalTime = this.getTotalTime();
    return (
        <div className='control-bar'>
          <div className='wrapper'>
            <div className='control-bar__flex-wrapper'>
              <button className='button'>Play/Pause</button>
              <div className='control-bar__timer label-data-pair'>
                <div className='label-data-pair__label'>Time (Today):</div>
                <div className='label-data-pair__data'>00:00:00</div>
              </div>
              <div className='control-bar__timer label-data-pair'>
                <div className='label-data-pair__label'>Time (Total): </div>
                <div className='label-data-pair__data'>{`${totalTime.h}:${totalTime.m}:00`}</div>
              </div>
              <button className='button'>Finish</button>
            </div>
          </div>
        </div>
    );
  }
};

ControlBar.propTypes = {
  journalEntries: PropTypes.array.isRequired
};    