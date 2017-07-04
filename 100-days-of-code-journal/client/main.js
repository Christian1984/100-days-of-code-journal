import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import React from 'react';
import ReactDOM from 'react-dom';

import { JournalEntries } from './../imports/api/journal-entries';

import App from './../imports/ui/app';

Meteor.startup(() => {
  Tracker.autorun(() => {
    console.log('client started!');

    let journalEntries = [
      {
        _id: 1,
        date: '07.01.1984',
        duration: '1:00:07',
        log: 'Lorem ipsum',
        link: 'http://example.com'
      },
      {
        _id: 2,
        date: '08.01.1984',
        duration: '2:07:15',
        log: 'Lorem ipsum 2',
        link: 'http://example2.com'
      }
    ];

    /*JournalEntries.insert({
      date: '07.01.1984',
      duration: '1:00:07',
      log: 'Lorem ipsum',
      link: 'http://example.com'
    });*/

    /*JournalEntries.insert({
      date: '08.01.1984',
      duration: '2:07:15',
      log: 'Lorem ipsum 2',
      link: 'http://example2.com'
    });*/

    let journalEntries2 = JournalEntries.find().fetch(); //for search use .find({}, {sort: {score: -1, name: 1}}).fetch();
    ReactDOM.render(<App journalEntries={journalEntries2} />, document.getElementById('app'));
  });
});
