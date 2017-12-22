import React from 'react';
import { Router, Route, browserHistory } from 'react-router';

// Import the components.
import Layout from './components/Layout';
import Home from './components/Home';
import GetStarted from './components/GetStarted';
import Auth from './components/Auth';
import Room from './components/Room';
import Join from './components/Join';

const Routes = () => (
  <Router history={browserHistory}>
    <Route component={Layout}>
      <Route path="/" component={Home} />
      <Route path="/start" component={GetStarted}/>
      <Route path="/join" component={Join}/>
      <Route path="/join/:room" component={Auth}/>
      <Route path="/join/:room/:user" component={Room}/>
      <Route path="/*" component={Home}/>
    </Route>
  </Router>
);

export default Routes;
