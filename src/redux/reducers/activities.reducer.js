import { combineReducers } from "redux";

const activities = (state = [], action) => {
  switch (action.type) {
    case "SET_ACTIVITIES":
      console.log("reducer returning USERS ACTIVITIES: ", action.payload);
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({
  activities,
});
