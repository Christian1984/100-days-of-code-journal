import { Meteor } from 'meteor/meteor';
import { WebApp } from 'meteor/webapp';

import { JournalEntries } from './../imports/api/journal-entries';

import './../imports/api/users';
import './../imports/initialize/initSimpleSchema';

Meteor.startup(() => {
  // code to run on server at startup
  console.log('server started');
  console.log('Documents in MongoDB:', JournalEntries.find().fetch().length);

  WebApp.connectHandlers.use((req, res, next) => {
    let username = req.url.slice(1);
    let user = Meteor.users.findOne({username});

    if (user) {
      res.statusCode = 302;
      res.setHeader('location', `/viewJournal?user=${user._id}`);
      res.end();
    }

    next();
  });
});
