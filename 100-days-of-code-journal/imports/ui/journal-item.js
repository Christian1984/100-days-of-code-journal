import React from 'react';
import PropTypes from 'prop-types';

export default class JournalItem extends React.Component {
  editEntry() {
    console.log(`edit button for entry with _id ${this.props.entry._id} clicked!`);
  }

  render() {
    let entry = this.props.entry;

    return (
      <div className='journal-item'>
        <p>Date: {entry.date}</p>
        <p>Duration: {entry.duration}</p>
        <p>Log: {entry.log}</p>
        <p>Link: {entry.link}</p>
        <button onClick={this.editEntry.bind(this)}>Edit</button>
      </div>
    );
  }
}

JournalItem.propTypes = {
  entry: PropTypes.object.isRequired
}