import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import React from 'react';
import ReactDOM from 'react-dom';
import Moment from 'moment';
import * as locales from 'moment/min/locales';

import { JournalEntries } from './../imports/api/journal-entries';

import App from './../imports/ui/app';

function getJournalEntries() {
  return JournalEntries.find({}, {sort:{date: 1}}).fetch(); //for search use .find({}, {sort: {score: -1, name: 1}}).fetch();
}

Meteor.startup(() => {
  var locale = window.navigator.userLanguage || window.navigator.language;
  
  if (!locale) { 
    locale = 'en' 
  }

  Moment.locale(locale);
  console.log('locale:', Moment.locale());

  Tracker.autorun(() => {
    console.log('client started!');

    let journalEntries = getJournalEntries();
    console.log(journalEntries);

    ReactDOM.render(<App journalEntries={journalEntries} />, document.getElementById('app'));
  });
});
