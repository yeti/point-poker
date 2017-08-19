// Import React and React-dom.
import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader'
import Routes from './Routes'

// Import service worker
import Worker from './serviceWorker';

// Define the root element.
const root = document.querySelector('main');

// Append the DummyComponent to the root element.
const render = Component => ReactDOM.render(
  <AppContainer>
    <Component />
  </AppContainer>,
  root
);

// Init the service worker
const serviceWorker = new Worker();
serviceWorker.register();

render(Routes);

if (module.hot) {
  module.hot.accept('./Routes', () => {
    const NextRoot = require('./Routes').default;
    render(NextRoot);
  });
}
