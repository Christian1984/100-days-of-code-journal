import React from 'react';
import PropTypes from 'prop-types';

import TitleBar from './title-bar';
import ControlBar from './control-bar';
import Journal from './journal';
import JournalForm from './journal-form';

export default class App extends React.Component {
  /*constructor() {
    super();
    this.state = {duration: undefined};
  }*/

  onFinishedHandler(durationSeconds) {
    this.refs.form.setDurationFieldFromTimer(durationSeconds);
  }

  render() {
    return (
      <div>
        <TitleBar title='#100DaysOfCode Journal' subtitle='made by chris' />
        <ControlBar journalEntries={this.props.journalEntries} onFinishedHandler={this.onFinishedHandler.bind(this)} />
        <JournalForm journalEntries={this.props.journalEntries} ref='form' />
        <Journal journalEntries={this.props.journalEntries} />
      </div>        
    );
  }
};

App.propTypes = {
  journalEntries: PropTypes.array.isRequired
};    