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
          <button>Play/Pause</button>
          <div>TIME TODAY</div>
          <div>
            <div>Total Time: </div>
            <div>{`${totalTime.h}:${totalTime.m}`}</div>
          </div>
          <button>Finish</button>
        </div>
    );
  }
};

ControlBar.propTypes = {
  journalEntries: PropTypes.array.isRequired
};    