import React from 'react';
import { Router, Route, Switch } from 'react-router';
import { createBrowserHistory } from 'history';

import Journal from './../ui/Journal';
import Login from './../ui/Login';
import NotFound from './../ui/NotFound';
import Signup from './../ui/Signup';

let browserHistory = createBrowserHistory();

export let router = (
    <Router history={browserHistory}>
      <Switch>
        <Route exact path='/' component={Login} />
        <Route path='/journal' component={Journal} />
        <Route path='/signup' component={Signup} />
        <Route path='*' component={NotFound} />
      </Switch>
    </Router> 
  );