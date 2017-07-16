import React from 'react';
import { Router, Route } from 'react-router';
import { createBrowserHistory } from 'history';

import Journal from './../ui/Journal';

export let router = (
    <Router history={createBrowserHistory()}>
      <Route path='/' component={Journal} />
    </Router> 
  );