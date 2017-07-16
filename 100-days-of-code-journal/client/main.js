import { Meteor } from 'meteor/meteor';

//import React from 'react';
import ReactDOM from 'react-dom';

import './../imports/initialize/initMoments';

import { router } from './../imports/router/router';

Meteor.startup(() => {
  ReactDOM.render(router, document.getElementById('app'));
});
