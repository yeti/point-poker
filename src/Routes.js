import React from 'react';
import { Router, Route, browserHistory } from 'react-router';

// Import the components.
import Layout from './components/layout';
import Home from './components/home';
import Auth from './components/auth';
import About from './components/about';
import Contact from './components/contact';
import Room from './components/room';
import Join from './components/join';

const Routes = () => (
  <Router history={browserHistory}>
    <Route component={Layout}>
      <Route path="/" component={Home}/>
      <Route path="/about" component={About}/>
      <Route path="/contact" component={Contact}/>
      <Route path="/join" component={Join}/>
      <Route path="/join/:room" component={Auth}/>
      <Route path="/join/:room/:user" component={Room}/>
      <Route path="/*" component={Home}/>
    </Route>
  </Router>
);

export default Routes;
