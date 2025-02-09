import React, { createContext, useReducer } from "react";
import combineReducers from "./reducers/combineReducers.ts";
import {initialState} from './initialState.ts'
import NotificationActions from "./actions/notificationActions.ts";
export const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(combineReducers, initialState);
  NotificationActions.registerActions(dispatch)
  
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
