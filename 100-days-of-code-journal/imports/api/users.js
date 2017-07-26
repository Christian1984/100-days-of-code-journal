import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import SimpleSchema from 'simpl-schema';

let accountSchema = new SimpleSchema({
  email: SimpleSchema.RegEx.Email
});

Accounts.validateNewUser((user) => {
  let email = user.emails[0].address;
  accountSchema.validate({ email });

  return true;
});