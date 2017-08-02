import React from 'react';
import PropTypes from 'prop-types';

import Moment from 'moment';

import ProgressBar from './ProgressBar';

import { getTimerStringFromSeconds, getSeconds } from './../../utils/time';
import { setTimeToMidnight, extractDate, addDays } from './../../utils/date';
import { findEntry } from './../../api/journal-entries';

export default class StatsBar extends React.Component {
  totalTargetDays = 100;

  getTotalSeconds() {
    let durationList = this.props.journalEntries.map((entry) => {
      return 60 * entry.duration.h + 1 * entry.duration.m;
    });

    var totalSeconds = this.props.currentSeconds;
    for(var i in durationList) { totalSeconds+=durationList[i] * 60; }

    return totalSeconds;
  }

  getLongestStreak() {
    if (this.props.journalEntries.length == 0) return 0;

    var streak = 1;
    var longestStreak = streak;
    var prevDate = extractDate(this.props.journalEntries[0].date);

    for (var i = 1; i < this.props.journalEntries.length; i++) {
      let date = extractDate(this.props.journalEntries[i].date);

      console.log(prevDate, date, extractDate(addDays(prevDate, 1)), extractDate(addDays(prevDate, 1)) == date, streak, longestStreak);
      if (extractDate(addDays(prevDate, 1)) == date) {
        streak++;
        if (streak > longestStreak) {
          longestStreak = streak;
        }
      }
      else {
        streak = 1;
      }

      prevDate = date;
    }

    return longestStreak;
  }

  render() {
    let daysCoded = this.props.journalEntries.length;
    let progressTotal = daysCoded / this.totalTargetDays * 100;
    let totalSeconds = this.getTotalSeconds();
    let averageSeconds = daysCoded ? Math.floor(totalSeconds/daysCoded) : 0;

    return (
        <div className='control-bar'>
          <div className='wrapper'>
            <ProgressBar name="Total Progress" currPercentage={progressTotal} />
            <div className='control-bar__flex-wrapper'>
              <div className='control-bar__timer label-data-pair'>
                <div className='label-data-pair__label'>Total Time: </div>
                <div className='label-data-pair__data'>{getTimerStringFromSeconds(totalSeconds)}</div>
              </div>
              <div className='control-bar__timer label-data-pair'>
                <div className='label-data-pair__label'>Average Time per Day:</div>
                <div className='label-data-pair__data'>{getTimerStringFromSeconds(averageSeconds)}</div>
              </div>
              <div className='label-data-pair'>
                <div className='label-data-pair__label'>Days Coded:</div>
                <div className='label-data-pair__data'>{`${daysCoded}/${this.totalTargetDays} Days`}</div>
              </div>
              <div className='label-data-pair'>
                <div className='label-data-pair__label'>Longest Streak:</div>
                <div className='label-data-pair__data'>{`${this.getLongestStreak()} Days`}</div>
              </div>
            </div>
          </div>
        </div>
    );
  }
};

StatsBar.propTypes = {
  journalEntries: PropTypes.array.isRequired,
  currentSeconds: PropTypes.number.isRequired
};    