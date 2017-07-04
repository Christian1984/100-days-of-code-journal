import React from 'react';
import PropTypes from 'prop-types';

import JournalItem from './journal-item';

export default class Journal extends React.Component {
  renderEntries() {
    return this.props.journalEntries.map((entry) => {
      return (
        <JournalItem key={entry._id} entry={entry} />
      );
    });
  }

  render() {
    return (
        <div className='journal-list'>
          {this.renderEntries()}
        </div>
    );
  }
};

Journal.propTypes = {
  journalEntries: PropTypes.array.isRequired
};    