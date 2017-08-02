import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

import { isDayInFuture } from './../utils/date';

export const JournalEntries = new Mongo.Collection('JournalEntries');

export function findEntry(date) {
  Meteor.subscribe('journal');

  let userId = Meteor.userId();
  let res = JournalEntries.findOne({userId, date: date});
  if (res != undefined) {
    return res;
  }
}

export function getJournalEntries(userId = undefined) {
  Meteor.subscribe('journal');

  if (!userId){
    userId = Meteor.userId();
  }
  
  let journalEntries = JournalEntries.find({userId}, {sort:{date: 1}}).fetch();
  return journalEntries;
}

//publish
if (Meteor.isServer) {
  Meteor.publish('journal', () => {
    return JournalEntries.find({});
  });
}

let entrySchema = new SimpleSchema({
  userId: {
    type: String,
    optional: true
  },
  date: {
    type: String,
    regEx: /^(19|20)\d\d-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/
  },
  duration: {
    type: Object
  },
  'duration.h': {
    type: Number,
    min: 0,
    max: 59
  },
  'duration.m': {
    type: Number,
    min: 0,
    max: 59
  },
  log: {
    type: Array
  },
  'log.$': {
    type: String
  },
  link: {
    type: Object
  },
  'link.project': {
    type: String,
    min: 1
  },
  'link.url': {
    type: String,
    regEx: SimpleSchema.RegEx.Url
  }
});

//TODO: add customized error messages

//meteor methods
Meteor.methods({
  'journalEntries.insert'(entry) {
    if (!this.userId) {
      throw new Meteor.Error(403, 'User not authenticated. Will not write to database!');
    }

    if (isDayInFuture(entry.date)) {
      throw new Meteor.Error(403, 'Please do not submit logs for the future!');
    }

    entrySchema.validate(entry);
    JournalEntries.insert(entry);

    return 'Entry successfully added to database!';
  },
  'journalEntries.update'(entryObj) {
    if (!this.userId) {
      throw new Error('User not authenticated. Will not write to database!');
    }

    if (isDayInFuture(entryObj.entry.date)) {
      throw new Meteor.Error(403, 'Please do not submit logs for the future!');
    }

    entrySchema.validate(entryObj.entry);
    JournalEntries.update({ _id: entryObj._id, userId: this.userId }, entryObj.entry);

    return 'Entry successfully updated in database!';
  },
  'journalEntries.remove'(_id) {
    if (!this.userId) {
      throw new Error('User not authenticated. Will not write to database!');
    }

    JournalEntries.remove({ _id, userId: this.userId });

    return 'Entry successfully removed!';
  }
});