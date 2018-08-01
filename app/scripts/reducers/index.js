import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import json from './json';
import animate from './animate';
import button from './button';
import section from './section';

export default combineReducers({
  router: routerReducer,
  animate,
  button,
  json,
  section
});
