import React from 'react';
import PropTypes from 'prop-types';

import JournalItem from './JournalItem';

import { addDays, setTimeToMidnight } from './../../utils/date';

export default class JournalList extends React.Component {
  renderDay(entry, dayCount) {
    return <JournalItem key={entry.date} entry={entry} onEditClicked={this.props.onEditClicked} showButtons={this.props.showButtons} dayCount={dayCount} />;
  }

  renderTimeline() {
    let entries = this.props.journalEntries;

    if (entries.length === 0) {
      //TODO
      return <div className='journal-item'>Please submit your first log entry above!</div>;
    }

    var entriesJsx = [];

    let start = setTimeToMidnight(entries[0].date);
    let end = setTimeToMidnight(new Date());

    var currDate = start;
    var currIdx = 0;

    while (currDate <= end) {
      if (currIdx < entries.length && currDate.getTime() == setTimeToMidnight(entries[currIdx].date).getTime()) {
        entriesJsx.push(this.renderDay(entries[currIdx], currIdx + 1));
        currIdx++;
      }
      else {
        entriesJsx.push(this.renderDay({date: currDate.toString(), isSkippedDay: true}, currIdx + 1));
      }

      currDate = addDays(currDate, 1);
    }

    return entriesJsx;
    
    //return this.props.journalEntries.map((entry) => this.renderDay(entry));
  }

  render() {
    return (
        <div className='journal-list'>
          <div className='wrapper'>
            {this.renderTimeline()}
          </div>
        </div>
    );
  }
};

JournalList.propTypes = {
  journalEntries: PropTypes.array.isRequired,
  onEditClicked: PropTypes.func,
  showButtons: PropTypes.bool
};   

JournalList.defaultProps = {
  showButtons: false
}; 