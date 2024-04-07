// NotificationMenu.js

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { listNotifications, sendNotification, replyToNotification } from '../actions/notificationActions'; // Import listNotifications action

export default function NotificationMenu({ userInfo }) {
  const dispatch = useDispatch();
  const [recipientUsername, setRecipientUsername] = useState('');
  const [message, setMessage] = useState('');
  const [replyMessage, setReplyMessage] = useState('');

  const notificationList = useSelector(state => state.notificationList);
  const { notifications } = notificationList;

  useEffect(() => {
    dispatch(listNotifications()); // Use listNotifications action to fetch notifications
  }, [dispatch]);

  const sendHandler = () => {
    dispatch(sendNotification(userInfo.username, recipientUsername, message));
    setRecipientUsername(''); // Clear recipient username after sending
    setMessage(''); // Clear message after sending
  };


  return (
    <div>
      <h2>Notifications</h2>
      <div>
        <input type="text" placeholder="Recipient Username" value={recipientUsername} onChange={(e) => setRecipientUsername(e.target.value)} />
        <input type="text" placeholder="Message" value={message} onChange={(e) => setMessage(e.target.value)} />
        <button onClick={sendHandler}>Send</button>
      </div>
    </div>
  );
}