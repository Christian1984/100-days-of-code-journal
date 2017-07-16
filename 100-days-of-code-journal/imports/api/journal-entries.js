import {Mongo} from 'meteor/mongo';

export const JournalEntries = new Mongo.Collection('JournalEntries');

export function findEntry(date) {
  let res = JournalEntries.find({date: date}).fetch();
  if (res == 0) {
    return undefined;
  }

  return res[0];
}

export function getJournalEntries() {
  return JournalEntries.find({}, {sort:{date: 1}}).fetch();
}