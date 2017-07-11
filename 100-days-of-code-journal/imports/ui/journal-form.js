import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'moment';

import { JournalEntries } from './../api/journal-entries';

import { getTimerStringFromSeconds } from './../utils/time';

export default class JournalForm extends React.Component {
  constructor() {
    super();
    this.duration = '';
    this.log = '';
    this.state = {entryId: -1};
  }

  createOrUpdateEntry(date, duration, logData, linkProject, linkUrl) {
    let durationComponents = duration.split(':');

    let journalEntry = {
      date: date,
      duration: {
        h: durationComponents[0],
        m: durationComponents[1]
      },
      log: logData.trim().split('\n'),
      link: {
        project: linkProject.trim(),
        url: linkUrl.trim()
      }
    }

    console.log('Adding new journal entry:');
    console.log(journalEntry);
    JournalEntries.update({_id: this.state.entryId}, journalEntry, {upsert: true});
  }

  findEntry(date) {
    //TODO
  }

  populateFields(entry) {
    var duration = `${entry.duration.h}:${entry.duration.m}`;
    this.refs.duration.value = duration;

    var log = entry.log.join('\n');
    this.refs.log.value = log;

    this.refs.linkProject.value = entry.link.project;
    this.refs.linkUrl.value = entry.link.url;
  }

  clearFields(clearDate = true) {
    if (clearDate) {
      this.refs.date.value = '';
    }
    
    this.refs.log.value = '';
    this.refs.duration.value = '';
    this.refs.linkProject.value = '';
    this.refs.linkUrl.value = '';
  }

  deleteEntry() {
    if (this.props.journalEntry) {
      JournalEntries.remove({_id: this.props.journalEntry._id});
    }
  }
  
  onSubmit(e) {
    e.preventDefault();
    
    let date = e.target.date.value;
    let duration = e.target.duration.value;
    let logData = e.target.log.value;
    let linkProject = e.target.linkProject.value;
    let linkUrl = e.target.linkUrl.value;

    if (!date || !duration || !logData || !linkProject || !linkUrl) {
      console.log('Journal Entry not complete!');
      //todo: handle
      return;
    }

    e.target.date.value = '';
    e.target.duration.value = '';
    e.target.log.value = '';
    e.target.linkProject.value = '';
    e.target.linkUrl.value = '';

    this.createOrUpdateEntry(date, duration, logData, linkProject, linkUrl);
  }

  onDateChanged(e) {
    let date = e.target.value;
    let entries = this.props.journalEntries;

    if(!entries) return;

    for (var i = entries.length - 1; i >= 0; i--) {
      let entry = entries[i]
      if (date == entry.date) {
        console.log('log for given date found!');
        this.populateFields(entry);
        this.setState({entryId: entry._id});

        return;
      }
    }
    
    this.clearFields(false);
    this.setState({entryId: -1});
  }

  onDurationChanged(e) {
    this.duration = e.target.value;
    console.log(this.duration);
  }

  onLogChanged(e) {
    this.log = e.target.value;
  }

  onProjectNameChanged(e) {

  }

  onProjectUrlChanged(e) {

  }

  setDurationField(durationSeconds) {
    this.refs.duration.value = getTimerStringFromSeconds(durationSeconds, true);

    let today = new Moment(new Date()).format('YYYY-MM-DD');
    this.refs.date.value = today;
  }
  
  render() {
    console.log('form here:', this.props.currentDuration);

    return (
      <div className='form-background'>
        <div className='wrapper'>
          <div className='form'>
            <form onSubmit={this.onSubmit.bind(this)}>
              <div className='form__date-time form__row'>
                <div className='label-data-pair label-data-pair--flex-grow'>
                  <div className='label-data-pair__label'>Date</div>
                  <div className='label-data-pair__data form__child--flex'>
                    <input className='form__input form__input--flex-grow' 
                      type='date' id='date' name='date' ref='date' 
                      onChange={this.onDateChanged.bind(this)} 
                    />
                  </div>
                </div>

                <div className='label-data-pair'>
                  <div className='label-data-pair__label'>Duration (Today)</div>
                  <div className='label-data-pair__data'>
                    <input className='form__input'
                      type='time' id='duration' name='duration' ref='duration'
                      onChange={this.onDurationChanged.bind(this)}
                    />
                  </div>
                </div>
              </div>

              <div className='label-data-pair form__row'>
                <div className='label-data-pair__label'>Log</div>
                <div className='label-data-pair__data form__child--flex'>
                  <textarea className='form__input form__input--flex-grow form__input--multiline' 
                    type='text' id='log' name='log' ref='log' 
                    placeholder='Log' onChange={this.onLogChanged.bind(this)}
                  />
                </div>
              </div>

              <div className='label-data-pair form__row'>
                <div className='label-data-pair__label'>Link</div>
                <div className='label-data-pair__data form__child--flex'>
                  <input className='form__input form__input--flex-grow' 
                    type='text' id='linkProject' name='linkProject' ref='linkProject'
                    placeholder='Project Name' 
                  />
                </div>
                <div className='label-data-pair__data form__child--flex'>
                  <input className='form__input form__input--flex-grow' 
                    type='text' id='linkUrl' name='linkUrl' ref='linkUrl' 
                    placeholder='URL' 
                  />
                </div>
              </div>

              <button className='button button--dark' action='submit'>
                {this.state.entryId == -1 ? 'Create Log' : 'Update Log' }
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
};

JournalForm.propTypes = {
  journalEntries: PropTypes.array.isRequired,
  currentDuration: PropTypes.string
};