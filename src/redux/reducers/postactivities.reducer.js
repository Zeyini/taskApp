import { combineReducers } from 'redux';

// the recieved data from the db is saved in this reducer
const postactivities = (state = [], action) => {
  switch (action.type) {
    // the stuff being sent to db captured here
    case 'SETPOST_ACTIVITIES':
        console.log('reducer holds activity/note from USERS ACTIVITIES: ', action.payload);
      return action.payload;
    default:
      return state;
  }
};


export default combineReducers({
    postactivities
});