import { Meteor } from 'meteor/meteor';
import { JournalEntries } from './../imports/api/journal-entries';
import Moment from 'moment';
import { addDays, setTimeToMidnight } from './../imports/utils/date.js';

Meteor.startup(() => {
  // code to run on server at startup
  console.log('server started');
  console.log('Documents in MongoDB:', JournalEntries.find().fetch().length);
  //console.log(Moment().startOf('day'))

  /*let now = new Date();
  console.log(now);
  console.log(now.getDate() + 1);

  let tomorrow = addDays(now, 1);
  console.log(tomorrow);

  console.log(setTimeToMidnight(now));*/
});
