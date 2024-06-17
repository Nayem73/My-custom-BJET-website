// notificationReducers.js

export const notificationListReducer = (state = { notifications: [] }, action) => {
  switch (action.type) {
    case 'NOTIFICATION_LIST_SUCCESS':
      return { loading: false, notifications: action.payload };
    case 'NOTIFICATION_LIST_FAILED':
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const notificationDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case 'NOTIFICATION_DELETE_SUCCESS':
      return { loading: false, success: true };
    case 'NOTIFICATION_DELETE_FAILED':
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const notificationStatusReducer = (state = {}, action) => {
  switch (action.type) {
    // Define cases for notification status actions
    default:
      return state;
  }
};
