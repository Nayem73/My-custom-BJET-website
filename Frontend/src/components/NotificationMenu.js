// NotificationMenu.js

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { listNotifications, sendNotification, replyToNotification } from '../actions/notificationActions'; // Import listNotifications action

export default function NotificationMenu({ userInfo }) {
  const dispatch = useDispatch();
  const [recipientId, setRecipientId] = useState('');
  const [message, setMessage] = useState('');
  const [replyMessage, setReplyMessage] = useState('');

  const notificationList = useSelector(state => state.notificationList);
  const { notifications } = notificationList;

  useEffect(() => {
    dispatch(listNotifications()); // Use listNotifications action to fetch notifications
  }, [dispatch]);

  const sendHandler = () => {
    dispatch(sendNotification(userInfo.id, recipientId, message));
    setRecipientId('');
    setMessage('');
  };

  const replyHandler = (notificationId, senderId) => {
    dispatch(replyToNotification(notificationId, userInfo.id, replyMessage));
    setReplyMessage('');
  };

  return (
    <div>
      <h2>Notifications</h2>
      <div>
        <input type="text" placeholder="Recipient ID" value={recipientId} onChange={(e) => setRecipientId(e.target.value)} />
        <input type="text" placeholder="Message" value={message} onChange={(e) => setMessage(e.target.value)} />
        <button onClick={sendHandler}>Send</button>
      </div>
      <div>
        {notifications && notifications.map(notification => (
          <div key={notification.id}>
            <p>{notification.message}</p>
            <input type="text" placeholder="Reply message" value={replyMessage} onChange={(e) => setReplyMessage(e.target.value)} />
            <button onClick={() => replyHandler(notification.id, notification.senderId)}>Reply</button>
          </div>
        ))}
      </div>
    </div>
  );
}
