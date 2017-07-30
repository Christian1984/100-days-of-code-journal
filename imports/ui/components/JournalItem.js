import { Meteor } from 'meteor/meteor';
import React from 'react';
import PropTypes from 'prop-types';

import Moment from 'moment';

import { addLeadingZero } from './../../utils/time';
import { setTimeToMidnight } from './../../utils/date';

import { JournalEntries } from './../../api/journal-entries';

export default class JournalItem extends React.Component {
  deleteEntry() {
    Meteor.call('journalEntries.remove', this.props.entry._id, (err, res) => {
      if (err) {
        console.log(err.reason);
      }
    });
  }

  editEntry() {
    console.log(`edit button for entry with _id ${this.props.entry._id} clicked!`);

    if (this.props.onEditClicked) {
      this.props.onEditClicked(this.props.entry);
    }
  }

  renderLogs(logs) {
    if (typeof logs === 'string') {
      return <div className='label-data-pair__data'>{logs}</div>
    }

    return logs.map((log, i) => <div key={i} className='label-data-pair__data'>{log}</div>);
  }

  renderLink(link) {
    if (typeof link === 'string') {
      return <div className='label-data-pair__data'><a href={link} className='journal-item__link'>{link}</a></div>
    }

    return <div className='label-data-pair__data'><a href={link.url} className='journal-item__link'>{link.project}</a></div>
  }

  renderCheckmark() {
    return (
        <svg version="1.1" className='journal-item__icon journal-item__icon--check'
          id="Layer_1"
          xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 90 84.1"
          xmlSpace="preserve">
        <g transform="translate(0,-952.36218)">
          <path d="M86.9,952.4c-0.8,0-1.5,0.4-2.1,1c-10.7,11.2-35.2,37.5-47,49.9L23,990.1c-1.2-1.1-3.1-1-4.2,0.2s-1,3.1,0.2,4.2c0,0,0,0,0.1,0.1l17,15c1.2,1.1,3,1,4.2-0.2c11.2-11.7,37.9-40.4,49-52c1.2-1.2,1.2-3.1,0-4.2C88.6,952.6,87.7,952.3,86.9,952.4L86.9,952.4z M39.6,954.5c-4.4,0.2-8.8,1-13.1,2.6c-21.1,8-31.8,31.7-23.8,52.8c8,21.1,31.7,31.8,52.8,23.8c21.1-8,31.8-31.7,23.8-52.8c-0.7-1.5-2.4-2.2-4-1.6c-1.4,0.6-2.1,2.2-1.7,3.7c6.8,18.1-2.2,38.2-20.3,45.1c-18.1,6.8-38.2-2.2-45.1-20.3c-6.8-18.1,2.2-38.2,20.3-45.1c11.1-4.2,23.4-2.5,33,4.4c1.3,1,3.2,0.8,4.2-0.5c1-1.3,0.8-3.2-0.5-4.2c-0.1-0.1-0.1-0.1-0.2-0.2c-7-5.1-15.3-7.7-23.7-7.8C40.8,954.5,40.2,954.4,39.6,954.5z"/>
        </g>
        </svg>
    );
  }

  renderCrossmark() {
    return (
        <svg version="1.1" className='journal-item__icon journal-item__icon--cross'
          id="Layer_1"
          xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 90 84.1"
          xmlSpace="preserve">
          <path d="M33.4,75.5c-0.9-0.2-1.8-0.4-2.7-0.6c-15.7-3-28-15.8-30.3-31.6C-2.4,23.5,10.2,5.1,29.9,0.9C51.6-3.8,71.8,10.9,75,31.5c3.6,23.5-12.7,40.6-31,43.6c-0.6,0.1-1.3,0.3-1.9,0.4C39.2,75.5,36.3,75.5,33.4,75.5z M70.9,37.8c0-18.3-14.9-33.1-33.2-33c-18.3,0-33,14.9-33,33.2c0,18.3,14.9,33,33.2,32.9C56.1,70.8,70.9,55.9,70.9,37.8z"/>
          <path d="M37.8,34.4c0.5-0.4,0.9-0.8,1.3-1.2c2.7-2.7,5.4-5.4,8.1-8.1c0.4-0.4,0.7-0.7,1.1-1c1-0.7,2.2-0.6,3,0.3c0.8,0.8,1,2,0.2,3c-0.3,0.4-0.7,0.7-1,1.1c-2.7,2.7-5.4,5.4-8.1,8.1c-0.4,0.4-0.8,0.8-1.2,1.3c0.4,0.5,0.8,0.9,1.2,1.3c2.7,2.7,5.3,5.3,8,8c0.4,0.4,0.7,0.7,1,1.1c0.6,0.9,0.5,2.1-0.2,2.9c-0.8,0.9-2,1-3,0.4c-0.4-0.3-0.8-0.6-1.1-1c-2.7-2.7-5.3-5.3-8-8c-0.4-0.4-0.7-0.9-1.1-1.4c-0.6,0.5-0.9,0.8-1.3,1.2c-2.7,2.7-5.5,5.5-8.2,8.2c-0.3,0.3-0.6,0.6-1,0.9c-1,0.8-2.3,0.7-3.2-0.2c-0.8-0.8-0.9-2.2-0.1-3.2c0.3-0.3,0.6-0.6,0.9-1c2.7-2.7,5.3-5.3,8-8c0.4-0.4,0.9-0.7,1.4-1.1c-0.5-0.6-0.8-1-1.2-1.3c-2.7-2.7-5.5-5.5-8.2-8.2c-0.4-0.4-0.7-0.7-1-1.1c-0.6-0.9-0.5-2.1,0.3-2.9c0.8-0.8,1.9-1,2.9-0.4c0.4,0.3,0.8,0.6,1.1,1c2.7,2.7,5.4,5.4,8.1,8.1C36.9,33.6,37.3,34,37.8,34.4z"/>
        </svg>
    );
  }

  renderButtons() {
    if (this.props.showButtons) {
      return (
        <div>
          <button className='button button--dark' onClick={this.editEntry.bind(this)}>Edit</button>
          <button className='button button--dark' onClick={this.deleteEntry.bind(this)}>Delete</button>
          {/*<button className='button button--dark' disabled>Share</button>*/}
        </div>
      );
    }
  }

  render() {
    let entry = this.props.entry;
    let date = new Moment(entry.date).format('L');

    if (entry.isSkippedDay) {
      return (
          <div className='journal-item'>
            <div className='journal-item__date-time journal-item__row'>
              {this.renderCrossmark()}
              <div className='label-data-pair label-data-pair--h-margin'>
                <div className='label-data-pair__label'>Date:</div> 
                <div className='label-data-pair__data'>{date}</div>
              </div>
            </div>

            <div className='label-data-pair journal-item__row'>
              <div className='label-data-pair__label'>Log:</div>
              <div className='label-data-pair__data journal-item--italic'>- I skipped today :-(</div>
            </div>
          </div>
      );
    }

    return (
        <div className='journal-item'>
          <div className='journal-item__date-time journal-item__row'>
            {this.renderCheckmark()}

            <div className='label-data-pair label-data-pair--h-margin'>
              <div className='label-data-pair__label'>Date:</div> 
              <div className='label-data-pair__data'>{date}</div>
            </div>

            <div className='label-data-pair label-data-pair--h-margin'>
              <div className='label-data-pair__label'>Duration:</div> 
              <div className='label-data-pair__data'>{`${addLeadingZero(entry.duration.h)}:${addLeadingZero(entry.duration.m)}`}</div>
            </div>
          </div>

          <div className='label-data-pair journal-item__row'>
            <div className='label-data-pair__label'>Log:</div> 
            {this.renderLogs(entry.log)}
          </div>

          <div className='label-data-pair journal-item__row'>
            <div className='label-data-pair__label'>Link:</div> 
            {this.renderLink(entry.link)}
          </div>

          {this.renderButtons()}
        </div>
    );
  }
}

JournalItem.propTypes = {
  entry: PropTypes.object.isRequired,
  onEditClicked: PropTypes.func,
  showButtons: PropTypes.bool
};

JournalItem.defaultProps = {
  showButtons: false
};