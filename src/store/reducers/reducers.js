import { combineReducers } from 'redux';
import headerNavigation from './HeaderNavigation';
import notifier from "./Notifier";

const rootReducer = combineReducers({
  headerNavigation,
  notifier,
});

export default rootReducer;
