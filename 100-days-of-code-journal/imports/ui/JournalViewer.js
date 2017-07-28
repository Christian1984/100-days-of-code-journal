import React from 'react';
import { parse } from 'query-string';

import { getJournalEntries } from './../api/journal-entries';

import TitleBar from './components/TitleBar';
import JournalList from './components/JournalList';

export default class JournalViewer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {journalEntries: []};
  }

  componentDidMount() {
    console.log('JournalViewer did mount!');

    this.journalTracker = Tracker.autorun(() => {
      console.log('Tracker here!')
      let userId = parse(this.props.location.search).user;
      let journalEntries = getJournalEntries(userId);
      this.setState({journalEntries});
    })
  }

  componentWillUnmount() {
    this.journalTracker.stop();
  }

  render() {
    return (
      <div>
        <TitleBar 
          title='#100DaysOfCode Journal' 
          subtitle='made by chris' 
        />
        <JournalList
          journalEntries={this.state.journalEntries}
        />
      </div>        
    );
  };
}