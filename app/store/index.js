import { createStore, compose, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import reducer from './reducer';

// export const store = createStore(reducer,
//   composeWithDevTools(applyMiddleware(thunk))
// );

let store

const userInitialState = {
  user: {}
}

export function initializeStore(initialState = userInitialState) {
  store = createStore(
    reducer,
    Object.assign({}, initialState),
    composeWithDevTools(applyMiddleware(thunk))
  );
  return store
}

export function getStore() {
  return store
}
