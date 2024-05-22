import { combineReducers } from 'redux';

// loginMessage holds the string that will display
// on the login screen if there's an error
const activities = (state = [], action) => {
  switch (action.type) {
    case 'SET_ACTIVITIES':
        console.log('reducer returning USERS ACTIVITIES: ', action.payload);
      return action.payload;
    default:
      return state;
  }
};


// make one object that has keys loginMessage, registrationMessage
// these will be on the redux state at:
// state.errors.loginMessage and state.errors.registrationMessage
export default combineReducers({
    activities
});