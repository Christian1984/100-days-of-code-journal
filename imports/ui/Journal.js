import {Meteor} from 'meteor/meteor';
import {Tracker} from 'meteor/tracker';

import React from 'react';
import PropTypes from 'prop-types';

import { getJournalEntries } from './../api/journal-entries';

import TitleBar from './components/TitleBar';
import ControlBar from './components/ControlBar';
import JournalList from './components/JournalList';
import JournalForm from './components/JournalForm';

export default class Journal extends React.Component {
  constructor() {
    super();
    this.state = {journalEntries: []};
  }

  componentDidMount() {
    this.journalTracker = Tracker.autorun(() => {
      let journalEntries = getJournalEntries();
      this.setState({journalEntries});
    })
  }

  componentWillUnmount() {
    this.journalTracker.stop();
  }

  onFinishedHandler(durationSeconds) {
    this.refs.form.setDurationFieldFromTimer(durationSeconds);
  }

  onEditClickedHandler(entry) {
    this.refs.form.populateFields(entry, true);
    window.scrollTo(0, 0);
  }

  renderShareCallToAction() {
    if (Meteor.user()) {
      return (
        <div className='cto-background'>
          <div className='wrapper'>
            <div className='cto'>
              Want to Share Your Journal? <a href={`/${Meteor.user().username}`}>Share This Link!</a>
            </div>
          </div>
        </div>
      );
    }
  }

  render() {
    console.log(Meteor.user());
    return (
      <div>
        <TitleBar 
          title='#100DaysOfCode Journal' 
          subtitle='made by chris' 
        />
        <ControlBar 
          journalEntries={this.state.journalEntries} 
          onFinishedHandler={this.onFinishedHandler.bind(this)} 
        />
        <JournalForm 
          journalEntries={this.state.journalEntries} 
          ref='form' 
        />
        {this.renderShareCallToAction()}
        <JournalList
          journalEntries={this.state.journalEntries} 
          onEditClicked={this.onEditClickedHandler.bind(this)}
          showButtons={true}
        />
      </div>        
    );
  }
};

Journal.propTypes = {
  //journalEntries: PropTypes.array.isRequired
};    