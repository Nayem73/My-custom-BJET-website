// NotificationMenu.js

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { listNotifications, sendNotification } from '../actions/notificationActions';
import { Bell } from 'react-bootstrap-icons'; // Import Bell icon from react-bootstrap-icons

export default function NotificationMenu({ userInfo }) {
  if (!userInfo) {
    return null; // Return null or a fallback UI if userInfo is null
  }
  const dispatch = useDispatch();
  const [recipientUsername, setRecipientUsername] = useState('');
  const [message, setMessage] = useState('');
  const [showNotifications, setShowNotifications] = useState(false); // State to control the display of notifications

  const notificationList = useSelector(state => state.notificationList);
  const { notifications } = notificationList;

  useEffect(() => {
    dispatch(listNotifications());
  }, [dispatch]);
  // NotificationMenu.js

useEffect(() => {
  dispatch(listNotifications(userInfo.username));
}, [dispatch, userInfo.username]);


  const sendHandler = () => {
    dispatch(sendNotification(userInfo.username, recipientUsername, message));
    console.log(userInfo);
    setRecipientUsername('');
    setMessage('');
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications); // Toggle the display of notifications
  };

  return (
    <div>
      <h2>
        Notifications
        <Bell onClick={toggleNotifications} style={{ cursor: 'pointer' }} /> {/* Bell icon to toggle notifications */}
      </h2>
      {showNotifications && notifications && (
        <div>
          {notifications.map((notification) => (
            <p key={notification.id}>{notification.message}</p> // Display each notification message
          ))}
        </div>
      )}
      <div>
        <input type="text" placeholder="Recipient Username" value={recipientUsername} onChange={(e) => setRecipientUsername(e.target.value)} />
        <input type="text" placeholder="Message" value={message} onChange={(e) => setMessage(e.target.value)} />
        <button onClick={sendHandler}>Send</button>
      </div>
    </div>
  );
}
