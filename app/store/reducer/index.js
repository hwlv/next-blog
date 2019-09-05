import { combineReducers } from 'redux'

import { reducer as userReducer } from './user';

const reducer = combineReducers({
  user: userReducer
});

export default reducer;
