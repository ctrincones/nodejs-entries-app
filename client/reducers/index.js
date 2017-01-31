import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import EntriesReducer from './EntriesReducer';

export default combineReducers({
  auth: AuthReducer,
  entries: EntriesReducer
});
