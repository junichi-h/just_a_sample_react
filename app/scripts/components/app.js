import React from 'react';
import { Route, Router } from 'react-router-dom';

import { history } from '../store';
import Routes from './routes';
// import AppContainer from '../containers/app-container';

/* const App = () => (
  <main>
    <AppContainer />
  </main>
); */

const App = () => (
  <Router history={history}>
    <Route render={({ location }) => <Routes location={location} />} />
  </Router>
);

export default App;
