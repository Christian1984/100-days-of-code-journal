import {Meteor} from 'meteor/meteor';
import {Tracker} from 'meteor/tracker';

import React from 'react';
import PropTypes from 'prop-types';

import { getJournalEntries } from './../api/journal-entries';

import TitleBar from './components/TitleBar';
import ControlBar from './components/ControlBar';
import StatsBar from './components/StatsBar';
import JournalList from './components/JournalList';
import JournalForm from './components/JournalForm';

export default class Journal extends React.Component {
  constructor() {
    super();
    this.state = {
      journalEntries: [],
      currentSeconds: 0
    };
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

  onFinishedHandler() {
    this.refs.form.setDurationFieldFromTimer(this.state.currentSeconds);
  }

  onEditClickedHandler(entry) {
    this.refs.form.populateFields(entry, true);
    window.scrollTo(0, 0);
  }

  onTickHandler(seconds) {
    console.log('tick!');
    this.setState({currentSeconds: seconds});
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
    return (
      <div>
        <TitleBar 
          title='#100DaysOfCode Journal' 
          subtitle='made by chris' 
        />
        <ControlBar
          onFinishedHandler={this.onFinishedHandler.bind(this)}
          externalOnTickHandler={this.onTickHandler.bind(this)}
        />
        <StatsBar
          journalEntries={this.state.journalEntries}
          currentSeconds={this.state.currentSeconds}
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