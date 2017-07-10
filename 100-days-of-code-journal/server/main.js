import { Meteor } from 'meteor/meteor';
import { JournalEntries } from './../imports/api/journal-entries';

Meteor.startup(() => {
  // code to run on server at startup
  console.log('server started');
  console.log('Documents in MongoDB:', JournalEntries.find().fetch().length);
});
