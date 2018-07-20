import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise';
import logger from 'redux-logger';
import reducer from '../reducers';

const initialState = {};
const enhancers = [];
const middleware = [thunk, logger, promiseMiddleware];

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers
);

const store = createStore(reducer, initialState, composedEnhancers);
export default store;
