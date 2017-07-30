import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';

import ReactDOM from 'react-dom';

import './../imports/initialize/initMoments';

import { router, onAuthChange } from './../imports/router/router';

Meteor.startup(() => {
  ReactDOM.render(router, document.getElementById('app'));

  Tracker.autorun(() => {
    let isAuthenticated = !!Meteor.userId();
    onAuthChange(isAuthenticated);
  });
});
