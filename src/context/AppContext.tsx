import React, { createContext, useReducer } from "react";
import combineReducers from "./reducers/combineReducers.ts";
import {initialState} from './initialState.ts'
import NotificationActions from "./actions/notificationActions.ts";
import UsersActions from "./actions/userActions.ts";
export const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(combineReducers, initialState);
  NotificationActions.registerActions(dispatch)
  UsersActions.registerActions(dispatch)
  
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
