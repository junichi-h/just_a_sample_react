import { combineReducers } from 'redux';
import json from './json';
import animate from './animate';
import button from './button';
import section from './section';

export default combineReducers({
  animate,
  button,
  json,
  section
});
