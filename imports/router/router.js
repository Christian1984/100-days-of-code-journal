import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Redirect, Router, Route, Switch } from 'react-router';
import { createBrowserHistory } from 'history';

import Journal from './../ui/Journal';
import JournalViewer from './../ui/JournalViewer';
import Login from './../ui/Login';
import NotFound from './../ui/NotFound';
import Signup from './../ui/Signup';

let browserHistory = createBrowserHistory();

function onEnterPublicRoute(targetComponent) {
  console.log('INFO: entered public page:');

  if (Meteor.userId()) 
    return <Redirect to='/journal' />;
  return targetComponent;
}

function onEnterPrivateRoute(targetComponent) {
  console.log('INFO: entered private page:');

  if (!Meteor.userId()) 
    return <Redirect to='/' />;
  return targetComponent;
}

export let router = (
  <Router history={browserHistory}>
    <Switch>
      <Route exact path='/' render={() => onEnterPublicRoute(<Login />)} />
      <Route path='/journal' render={() => onEnterPrivateRoute(<Journal />)}/>
      <Route path='/signup' render={() => onEnterPublicRoute(<Signup />)} />
      <Route path='/viewJournal' component={JournalViewer} />
      <Route path='*' component={NotFound} />
    </Switch>
  </Router> 
);

let publicRoutes = [ '/', '/signup' ];
let privateRoutes = [ '/journal' ];

export function onAuthChange(isAuthenticated) {
  let pathName = browserHistory.location.pathname;

  console.log(isAuthenticated);
  console.log(pathName);

  if (isAuthenticated && publicRoutes.includes(pathName)) {
    browserHistory.push('/journal');
  }
  else if (!isAuthenticated && privateRoutes.includes(pathName)) {
    browserHistory.push('/');    
  }
}