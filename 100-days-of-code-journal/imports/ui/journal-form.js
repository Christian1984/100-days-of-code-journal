import React from 'react';
import PropTypes from 'prop-types';

import { JournalEntries } from './../api/journal-entries';

export default class JournalForm extends React.Component {
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

    //TODO: check if there is already an entry for today, if so, update

    if (this.props.journalEntry) {    
      console.log('Updating journal entry:');
      console.log(journalEntry);
      JournalEntries.update({_id: this.props.journalEntry._id}, journalEntry);

      return;
    }

    console.log('Adding new journal entry:');
    console.log(journalEntry);
    JournalEntries.insert(journalEntry);
  }

  deleteEntry() {
    if (this.props.journalEntry) {
      JournalEntries.remove({_id: this.props.journalEntry._id});
    }
  }
  
  handleSubmit(e) {
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

  renderDeleteButton() {
    return (
      <button onClick={this.deleteEntry.bind(this)}>Delete</button>
    );
  }
  
  render() {
    return (
      <div className='wrapper'>
        <div className='form'>
          <form onSubmit={this.handleSubmit.bind(this)}>
            <div className='form__date-time form__row'>
              <div className='label-data-pair label-data-pair--flex-grow'>
                <div className='label-data-pair__label'>Date</div>
                <div className='label-data-pair__data form__child--flex'>
                  <input className='form__input form__input--flex-grow' type='date' id='date' name='date' />
                </div>
              </div>

              <div className='label-data-pair'>
                <div className='label-data-pair__label'>Duration (Today)</div>
                <div className='label-data-pair__data'>
                  <input className='form__input' type='time' id='duration' name='duration' />
                </div>
              </div>
            </div>

            <div className='label-data-pair form__row'>
              <div className='label-data-pair__label'>Log</div>
              <div className='label-data-pair__data form__child--flex'>
                <textarea className='form__input form__input--flex-grow' type='text' id='log' name='log' placeholder='Log' />
              </div>
            </div>

            <div className='label-data-pair form__row'>
              <div className='label-data-pair__label'>Link</div>
              <div className='label-data-pair__data form__child--flex'>
                <input className='form__input form__input--flex-grow' type='text' id='linkProject' name='linkProject' placeholder='Project Name' />
              </div>
              <div className='label-data-pair__data form__child--flex'>
                <input className='form__input form__input--flex-grow' type='text' id='linkUrl' name='linkUrl' placeholder='URL' />
              </div>
            </div>

            <button className='button button--dark' action='submit'>Submit</button>
            {/*this.renderDeleteButton()*/}
          </form>
        </div>
      </div>
    );
  }
};

JournalForm.propTypes = {
  journalEntry: PropTypes.object
};