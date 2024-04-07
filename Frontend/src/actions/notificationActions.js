import axios from 'axios';

export const listNotifications = () => async (dispatch) => {
  try {
    const { data } = await axios.get('/api/notification/');
    dispatch({ type: 'NOTIFICATION_LIST_SUCCESS', payload: data });
  } catch (error) {
    dispatch({
      type: 'NOTIFICATION_LIST_FAILED',
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const sendNotification = (senderId, recipientId, message) => async (dispatch) => {
  try {
    // Convert senderId to a number
    // senderId = parseInt(senderId, 10);
    // recipientId = parseInt(recipientId, 10);
    
    await axios.post(`/api/notification/send?senderId=${senderId}&recipientId=${recipientId}&message=${message}`);
    dispatch(listNotifications());
  } catch (error) {
    dispatch({
      type: 'NOTIFICATION_SEND_FAILED',
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};


export const replyToNotification = (notificationId, senderId, replyMessage) => async (dispatch) => {
  try {
    await axios.post(`/api/notification/${notificationId}/reply`, { senderId, replyMessage });
    dispatch(listNotifications());
  } catch (error) {
    dispatch({
      type: 'NOTIFICATION_REPLY_FAILED',
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};