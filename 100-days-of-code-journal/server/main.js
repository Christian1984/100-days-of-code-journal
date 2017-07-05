import { Meteor } from 'meteor/meteor';
import { JournalEntries } from './../imports/api/journal-entries';
import Moment from 'moment';

Meteor.startup(() => {
  // code to run on server at startup
  console.log('server started');
  console.log('Documents in MongoDB:', JournalEntries.find().fetch().length);
  console.log(Moment().startOf('day'))
});
