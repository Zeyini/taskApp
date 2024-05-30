import { combineReducers } from 'redux';

// the recieved all data from the db is saved in this reducer
const activities = (state = [], action) => {
  switch (action.type) {
    case 'SET_ACTIVITIES':
        console.log('reducer returning USERS ACTIVITIES: ', action.payload);
      return action.payload;
    default:
      return state;
  }
};


export default combineReducers({
    activities
});