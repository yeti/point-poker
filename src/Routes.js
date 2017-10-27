import React from 'react';
import { Router, Route, browserHistory } from 'react-router';

// Import the components.
import Layout from './components/Layout';
import Home from './components/Home';
import Auth from './components/Auth';
import About from './components/about';
import Contact from './components/contact';
import Room from './components/Room';
import Join from './components/Join';

const Routes = () => (
  <Router history={browserHistory}>
    <Route component={Layout}>
      <Route path="/" component={Home} />
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
