import { combineReducers } from "redux";

const postactivities = (state = [], action) => {
  switch (action.type) {
    case "SETPOST_ACTIVITIES":
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({
  postactivities,
});
