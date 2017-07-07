import React from 'react';
import PropTypes from 'prop-types';

import Moment from 'moment';

export default class ControlBar extends React.Component {
  constructor() {
    super();

    this.state = {
      currentSeconds: 0 ,
      isRunning: false
    }
  }

  stopWatchTick() {
    console.log('tick');

    if (this.state.isRunning) {
      this.setState({currentSeconds: this.state.currentSeconds + 1});
      setTimeout(this.stopWatchTick.bind(this), 1000);
    }
  }

  startStopwatch() {
    this.setState({isRunning: true}, () => {setTimeout(this.stopWatchTick.bind(this), 1000);});
  }

  stopStopwatch() {
    this.setState({isRunning: false});
  }

  toggleStopwatch() {
    if (this.state.isRunning) {
      this.stopStopwatch();
    }
    else {
      this.startStopwatch();
    }
  }

  addLeadingZero(val) {
    return val < 10 ? `0${val}` : val;
  }

  getTimerStringFromSeconds(s) {
    let hh = this.addLeadingZero(~~(s / 3600));
    let mm = this.addLeadingZero(~~((s % 3600) / 60));
    let ss = this.addLeadingZero(s % 60);
    return `${hh}:${mm}:${ss}`;
  }

  getTotalTime() {
    let durationList = this.props.journalEntries.map((entry) => {
      return 60 * entry.duration.h + 1 * entry.duration.m;
    });

    var totalSeconds = this.state.currentSeconds;
    for(var i in durationList) { totalSeconds+=durationList[i] * 60; }

    return this.getTimerStringFromSeconds(totalSeconds);
  }

  render() {
    let totalTime = this.getTotalTime();
    return (
        <div className='control-bar'>
          <div className='wrapper'>
            <div className='control-bar__flex-wrapper'>
              <button className='button' onClick={this.toggleStopwatch.bind(this)}>{this.state.isRunning ? 'Stop' : 'Start'}</button>
              <div className='control-bar__timer label-data-pair'>
                <div className='label-data-pair__label'>Time (Today):</div>
                <div className='label-data-pair__data'>{this.getTimerStringFromSeconds(this.state.currentSeconds)}</div>
              </div>
              <div className='control-bar__timer label-data-pair'>
                <div className='label-data-pair__label'>Time (Total): </div>
                <div className='label-data-pair__data'>{this.getTotalTime()}</div>
              </div>
              <button className='button' onClick={this.stopStopwatch.bind(this)}>Finish</button>
            </div>
          </div>
        </div>
    );
  }
};

ControlBar.propTypes = {
  journalEntries: PropTypes.array.isRequired
};    