import React from 'react';
import PropTypes from 'prop-types';

import { JournalEntries } from './../api/journal-entries';

export default class JournalForm extends React.Component {
  createOrUpdateEntry(date, duration, logData, link) {
    let durationComponents = duration.split(':');

    let journalEntry = {
      date: date,
      duration: {
        h: durationComponents[0],
        m: durationComponents[1]
      },
      log: logData,
      link: link
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
    let link = e.target.link.value;

    if (!date || !duration || !logData || !link) {
      console.log('Journal Entry not complete!');
      //todo: handle
      return;
    }

    this.createOrUpdateEntry(date, duration, logData, link);
  }

  renderDeleteButton() {
    return (
      <button onClick={this.deleteEntry.bind(this)}>Delete</button>
    );
  }
  
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <div>
            <div>
              <label htmlFor='date'>Date</label>
              <input type='date' id='date' name='date' />
            </div>
            
            <div>
              <label htmlFor='duration'>Duration (Today)</label>
              <input type='time' id='duration' name='duration' />
            </div>
          </div>
          <div>            
            <label htmlFor='log'>Log</label>
            <textarea type='text' id='log' name='log' placeholder='Log' />
          </div>
          <div>
            <label htmlFor='link'>Link</label>
            <input type='text' id='link' name='link' placeholder='Link' />
          </div>
          <button action='submit'>Submit</button>
          {/*this.renderDeleteButton()*/}
        </form>
      </div>
    );
  }
};

JournalForm.propTypes = {
  journalEntry: PropTypes.object
};