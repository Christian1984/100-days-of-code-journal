import React from 'react';
import PropTypes from 'prop-types';

import { JournalEntries } from './../api/journal-entries';

export default class JournalItem extends React.Component {
  deleteEntry() {
    JournalEntries.remove({_id: this.props.entry._id});
  }

  editEntry() {
    console.log(`edit button for entry with _id ${this.props.entry._id} clicked!`);
  }

  renderLogs(logs) {
    if (typeof logs === 'string') {
      return <div className='label-data-pair__data'>{logs}</div>
    }

    return logs.map((log, i) => <div key={i} className='label-data-pair__data'>{log}</div>);
  }

  render() {
    let entry = this.props.entry;

    return (
      <div className='wrapper'>
        <div className='journal-item'>
          <div className='journal-item__date-time journal-item__row'>
            <div className='label-data-pair'>
              <div className='label-data-pair__label'>Date:</div> 
              <div className='label-data-pair__data'>{entry.date}</div>
            </div>

            <div className='label-data-pair'>
              <div className='label-data-pair__label'>Duration:</div> 
              <div className='label-data-pair__data'>{`${entry.duration.h}:${entry.duration.m}`}</div>
            </div>
          </div>

          <div className='label-data-pair journal-item__row'>
            <div className='label-data-pair__label'>Log:</div> 
            {this.renderLogs(entry.log)}
          </div>

          <div className='label-data-pair journal-item__row'>
            <div className='label-data-pair__label'>Link:</div> 
            <div className='label-data-pair__data'>{entry.link}</div>
          </div>

          <button className='button button--dark' onClick={this.editEntry.bind(this)}>Edit</button>
          <button className='button button--dark' onClick={this.deleteEntry.bind(this)}>Delete</button>
          <button className='button button--dark' disabled>Share</button>
        </div>
      </div>
    );
  }
}

JournalItem.propTypes = {
  entry: PropTypes.object.isRequired
}