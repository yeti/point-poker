// Import React and React-dom.
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';

// Import the components.
import Home from './components/home';
import Auth from './components/auth';
import Room from './components/room';

// Define the root element.
const root = document.querySelector('main');

// Append the DummyComponent to the root element.
ReactDOM.render(
  (<Router history={browserHistory}>
    <Route path="/" component={Home}/>
    <Route path="/:room" component={Auth}/>
    <Route path="/:room/:user" component={Room}/>
  </Router>), root);
