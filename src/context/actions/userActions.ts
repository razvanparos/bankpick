export const SET_USER_DATA = "SET_USER_DATA";

class UsersActions {
    static #dispatch;
  
    static registerActions(dispatch) {
      this.#dispatch = dispatch;
    }
  
    static setUserData(userData) {
      this.#dispatch({
        type: SET_USER_DATA,
        payload: {
          userData,
        },
      });
    }

  }
  
  export default UsersActions;
  