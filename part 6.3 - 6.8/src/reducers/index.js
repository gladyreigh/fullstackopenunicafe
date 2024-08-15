import { combineReducers } from 'redux';
import anecdoteReducer from './anecdoteReducer';
import notificationReducer from './notificationReducer';

const rootReducer = combineReducers({
  anecdotes: anecdoteReducer,
  notification: notificationReducer,
});

export default rootReducer;
