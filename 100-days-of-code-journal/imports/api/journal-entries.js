import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const JournalEntries = new Mongo.Collection('JournalEntries');

export function findEntry(date) {
  Meteor.subscribe('journal');

  let userId = Meteor.userId();
  let res = JournalEntries.find({userId, date: date}).fetch();
  if (res == 0) {
    return undefined;
  }

  return res[0];
}

export function getJournalEntries() {
  Meteor.subscribe('journal');

  let userId = Meteor.userId();
  console.log('getJournalEntries() called, userId:', userId);
  return JournalEntries.find({userId}, {sort:{date: 1}}).fetch();
}

//publish
if (Meteor.isServer) {
  console.log('publish!');

  Meteor.publish('journal', () => {
    console.log('publish-callback');
    return JournalEntries.find({});
  });
}