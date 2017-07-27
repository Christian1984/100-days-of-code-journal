import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

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

let entrySchema = new SimpleSchema({
  userId: {
    type: String,
    optional: true
  },
  date: {
    type: String //this should be a date at some point
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
    type: String //this validation does not work!
  },
  'link.url': {
    type: SimpleSchema.RegEx.Url //this validation does not work!
  }
});

//TODO: add customized error messages

//meteor methods
Meteor.methods({
  'journalEntries.insert'(entry) {
    if (!this.userId) {
      throw new Meteor.Error(403, 'User not authenticated. Will not write to database!');
    }

    entrySchema.validate(entry);
    JournalEntries.insert(entry);

    return 'Entry successfully added to database!';
  },
  'journalEntries.update'(entryObj) {
    if (!this.userId) {
      throw new Error('User not authenticated. Will not write to database!');
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