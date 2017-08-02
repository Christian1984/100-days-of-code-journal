import { Meteor } from 'meteor/meteor';
import React from 'react';
import { parse } from 'query-string';

import { getJournalEntries } from './../api/journal-entries';

import TitleBar from './components/TitleBar';
import StatsBar from './components/StatsBar';
import JournalList from './components/JournalList';

export default class JournalViewer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {journalEntries: []};
  }

  componentDidMount() {
    this.journalTracker = Tracker.autorun(() => {
      let userId = parse(this.props.location.search).user;
      let journalEntries = getJournalEntries(userId);
      this.setState({journalEntries});
    })
  }

  componentWillUnmount() {
    this.journalTracker.stop();
  }

  renderSignupCallToAction() {
    if (!Meteor.userId()) {
      return (
        <div className='cto-background'>
          <div className='wrapper'>
            <div className='cto'>
              Want to create your own #100DaysOfCode-Journal? <a href='/signup'>Signup here!</a>
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
        <StatsBar
          journalEntries={this.state.journalEntries}
          currentSeconds={0}
        />
        {this.renderSignupCallToAction()}
        <JournalList
          journalEntries={this.state.journalEntries}
        />
      </div>        
    );
  };
}