// Import React and React-dom.
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';

// Import the components.
import Layout from './components/layout';
import Home from './components/home';
import Auth from './components/auth';
import About from './components/about';
import Contact from './components/contact';
import Room from './components/room';
import Join from './components/join';

// Import service worker
import Worker from './serviceWorker';

// Define the root element.
const root = document.querySelector('main');

// Append the DummyComponent to the root element.
ReactDOM.render(
  (
    <Router history={browserHistory}>
      <Route component={Layout}>
        <Route path="/" component={Home}/>
        <Route path="/about" component={About}/>
        <Route path="/contact" component={Contact}/>
        <Route path="/join" component={Join}/>
        <Route path="/join/:room" component={Auth}/>
        <Route path="/join/:room/:user" component={Room}/>
      </Route>
    </Router>
  ), root);

// Init the service worker
const serviceWorker = new Worker();
serviceWorker.register();
