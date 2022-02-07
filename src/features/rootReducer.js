import { combineReducers } from '@reduxjs/toolkit';
import globalReducer from './global';
import userReducer from './user';
import transactionsReducer from './transactions';
import categoriesReducer from './trans-categories';
import sessionReducer from './session';

const appReducer = combineReducers({
  global: globalReducer,
  user: userReducer,
  transactions: transactionsReducer,
  categories: categoriesReducer,
  session: sessionReducer,
});

const rootReducer = (state, action) => {
  if (action.type === 'USER_LOGOUT') {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;