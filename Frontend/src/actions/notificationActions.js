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

export const sendNotification = (senderUsername, recipientUsername, message) => async (dispatch) => {
  try {
    await axios.post(`/api/notification/send?senderUsername=${senderUsername}&recipientUsername=${recipientUsername}&message=${message}`);
    dispatch(listNotifications());
  } catch (error) {
    dispatch({
      type: 'NOTIFICATION_SEND_FAILED',
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};