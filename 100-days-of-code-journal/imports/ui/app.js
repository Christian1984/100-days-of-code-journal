import React from 'react';
import PropTypes from 'prop-types';

import TitleBar from './title-bar';
import ControlBar from './control-bar';
import Journal from './journal';
import JournalForm from './journal-form';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <TitleBar title='100 Days of Code Journal' />
        <ControlBar journalEntries={this.props.journalEntries} />
        <JournalForm />
        {/*<div className='progress-gauge'></div>*/}
        <Journal journalEntries={this.props.journalEntries} />
      </div>        
    );
  }
};

App.propTypes = {
  journalEntries: PropTypes.array.isRequired
};    