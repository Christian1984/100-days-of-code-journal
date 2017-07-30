import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import SimpleSchema from 'simpl-schema';

let accountSchema = new SimpleSchema({
  email: SimpleSchema.RegEx.Email,
  username: String
});

let forbiddenNames = ['journal', 'login', 'signup', '/', 'viewJournal'];

Accounts.validateNewUser((user) => {
  let email = user.emails[0].address;
  let username = user.username;
  accountSchema.validate({ email, username });

  if (forbiddenNames.includes(username.toLowerCase())) {
    throw new Meteor.Error(400, 'Please choose a different username!');
  }

  return true;
});