import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import React from 'react';
import ReactDOM from 'react-dom';

Meteor.startup(() => {
  Tracker.autorun(() => {
    console.log('client started!');

    let jsx=(
      <div>
        <div className='title-bar'>
          <h1>100 Days Of Code Journal</h1>
          <h2>Made by Chris</h2>
        </div>
        <div className='control-bar'>
          <button>Play/Pause</button>
          <div>TIME</div>
          <button>Finish</button>
        </div>
        <div className='progress-gauge'></div>
        <div className='journal-list'>
          <div className='journal-item'>
            <p>Date: 07.01.1984</p>
            <p>Duration: 1:00:07</p>
            <p>Log: Lorem ipsum</p>
            <p>Links: http://example.com</p>
            <button>Edit</button>
          </div>
        </div>
      </div>
    );

    ReactDOM.render(jsx, document.getElementById('app'));
  });
});
