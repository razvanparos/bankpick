import { useEffect, useRef, useState, useContext } from "react";
import UsersActions from "../context/actions/userActions.ts";
import { getCurrentUserData } from "../services/usersService.ts";
import { AppContext } from "../context/AppContext.tsx";

const useLoadUserData = () => {
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
    if (!userData) {
      setIsUserDataLoaded(true);
      clearTimeout(timeoutRef.current);
    } else {
      timeoutRef.current = setTimeout(() => {
        setIsUserDataLoaded(true);
      }, 1000);
    }
  }, [userData]);

  return isUserDataLoaded
};

export default useLoadUserData;
