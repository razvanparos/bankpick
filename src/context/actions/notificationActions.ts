export const NOTIFICATION_SHOW = "NOTIFICATION_SHOW";
export const NOTIFICATION_HIDE = "NOTIFICATION_HIDE";

class NotificationActions {
    static #dispatch;
  
    static registerActions(dispatch) {
      this.#dispatch = dispatch;
    }
  
    static showNotification(msg,type) {
      this.#dispatch({
        type: NOTIFICATION_SHOW,
        payload: {
            msg,
            type
        },
      });
      setTimeout(()=>{this.hideNotification()},3500)
    }
    static hideNotification() {
      this.#dispatch({
        type: NOTIFICATION_HIDE,
        payload: {
          type:'',
          msg:''
        },
      });
    }

  }
  
  export default NotificationActions;
  