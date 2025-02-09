import notificationReducer from "./notificationReducers.ts";
import userReducers from "./userReducers.ts";


const allReducers = [notificationReducer, userReducers];

const combineReducers = (state, action) => {
  let result = false;

  for (let reducer of allReducers) {
    result = reducer(state, action);

    if (result) {
      break;
    }
  }

  if (result) {
    return result;
  } else {
    throw new Error(`No action named "${action.type}" was found.`);
  }
};

export default combineReducers;
