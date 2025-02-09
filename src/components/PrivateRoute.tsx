import React, { useContext, useEffect, useState, useRef } from "react";
import { Navigate } from "react-router-dom";
import { AppContext } from "../context/AppContext.tsx";
import { getCurrentUserData } from "../services/usersService.ts";
import UsersActions from "../context/actions/userActions.ts";
import FallbackComponent from "./FallbackComponent.tsx";

export default function PrivateRoute({ children }) {
  const [isUserDataLoaded, setIsUserDataLoaded] = useState(false);
  const { state } = useContext(AppContext);
  const { userData } = state;
  const timeoutRef = useRef(null);

  const initApp = async () => {
    let userData = (await getCurrentUserData()) as any;
    UsersActions.setUserData(userData);
  };

  useEffect(() => {
    initApp();
  }, []);

  useEffect(() => {
    if (userData?.[0]) {
      setIsUserDataLoaded(true);
      clearTimeout(timeoutRef.current);
    } else {
      timeoutRef.current = setTimeout(() => {
        setIsUserDataLoaded(true);
      }, 1000);
    }
  }, [userData]);

  const isLogged = localStorage.getItem("currentUser");

  return !isUserDataLoaded ? (
    <div className="flex justify-center items-center h-screen">
      <FallbackComponent />
    </div>
  ) : isLogged ? (
    children
  ) : (
    <Navigate to="/login" />
  );
}
