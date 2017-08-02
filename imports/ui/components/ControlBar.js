import { Tracker } from 'meteor/tracker';
import React from 'react';
import PropTypes from 'prop-types';

import Moment from 'moment';

import ProgressBar from './ProgressBar';

import { getTimerStringFromSeconds, getSeconds } from './../../utils/time';
import { setTimeToMidnight, extractDate } from './../../utils/date';
import { findEntry } from './../../api/journal-entries';

export default class ControlBar extends React.Component {
  dailyTargetSeconds = 3600;

  constructor() {
    super();

    this.state = {
      currentSeconds: 0 ,
      isRunning: false
    }
  }

  componentDidMount() {
    this.tracker = Tracker.autorun(() => {
      let today = extractDate(setTimeToMidnight(new Date()));
      let todayEntry = findEntry(today);

      if (todayEntry) {
        this.setState({ 
          currentSeconds: getSeconds(
            parseInt(todayEntry.duration.h), 
            parseInt(todayEntry.duration.m)
          )
        });

      
        if (this.props.externalOnTickHandler) {
          this.props.externalOnTickHandler(this.state.currentSeconds);
        }
      }
    });
  }

  componentWillUnmount() {
    this.tracker.stop();
  }

  stopWatchTick() {
    if (this.state.isRunning) {
      this.setState({currentSeconds: this.state.currentSeconds + 1});
      
      if (this.props.externalOnTickHandler) {
        this.props.externalOnTickHandler(this.state.currentSeconds);
      }

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

  onFinishClick() {
    this.stopStopwatch();

    if (this.props.onFinishedHandler) {
      this.props.onFinishedHandler(this.state.currentSeconds);
    }
  }

  render() {
    let progressToday = this.state.currentSeconds / this.dailyTargetSeconds * 100;

    return (
        <div className='control-bar'>
          <div className='wrapper'>
            <div className='control-bar__flex-wrapper'>
              <button className='button' onClick={this.toggleStopwatch.bind(this)}>{this.state.isRunning ? 'Stop' : 'Start'}</button>
              <div className='control-bar__timer label-data-pair label-data-pair--flex-grow'>
                <div className='label-data-pair__label label-data-pair--center label-data-pair__label--size-l'>Time (Today)</div>
                <div className='label-data-pair__data label-data-pair--center label-data-pair__data--size-l'>{getTimerStringFromSeconds(this.state.currentSeconds)}</div>
              </div>
              <button className='button' onClick={this.onFinishClick.bind(this)}>Finish</button>
            </div>
            <ProgressBar name="Today's Progress" currPercentage={progressToday} />
          </div>
        </div>
    );
  }
};

ControlBar.propTypes = {
  onFinishedHandler: PropTypes.func,
  externalOnTickHandler: PropTypes.func
};    