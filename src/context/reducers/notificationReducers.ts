import { NOTIFICATION_SHOW } from "../actions/notificationActions.ts";
import { NOTIFICATION_HIDE } from "../actions/notificationActions.ts";

const notificationReducer = (state, action) => {
    const  notificationMessage  = action.payload.msg;
    const  notificationType  = action.payload.type;
    switch (action.type) {
      case NOTIFICATION_SHOW:
        return { ...state, showNotification:true, notificationMessage, notificationType };
      case NOTIFICATION_HIDE:
        return { ...state, showNotification:false, notificationType, notificationMessage };
      default:
        return false;
    }
  };
  
  export default notificationReducer;