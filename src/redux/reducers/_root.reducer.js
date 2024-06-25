import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import activities from './activities.reducer'
import postactivities from './postactivities.reducer'

const rootReducer = combineReducers({
  errors, 
  user,
  activities, 
  postactivities, 
});

export default rootReducer;
