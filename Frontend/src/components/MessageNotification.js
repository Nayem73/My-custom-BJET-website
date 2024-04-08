// MessageNotification.js

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { listNotifications } from '../actions/messageActions';
import { Chat } from 'react-bootstrap-icons'; // Import Chat icon from react-bootstrap-icons

export default function MessageNotification({ userInfo }) {
  if (!userInfo) {
    return null; // Return null or a fallback UI if userInfo is null
  }
  const dispatch = useDispatch();
  const [showNotifications, setShowNotifications] = useState(false); // State to control the display of notifications
  const [notificationCount, setNotificationCount] = useState(0); // State to store notification count

  const notificationList = useSelector(state => state.notificationList);
  const { notifications } = notificationList;

  useEffect(() => {
    dispatch(listNotifications(userInfo.username));
  }, [dispatch, userInfo.username]);

  useEffect(() => {
    // Count the number of unread notifications
    const count = notifications.filter(notification => !notification.read).length;
    setNotificationCount(count);
  }, [notifications]);

  const toggleNotifications = () => {
    if (notificationCount > 0) {
      // If there are unread notifications, set the count to 0 when the icon is clicked
      setNotificationCount(0);
    }
    setShowNotifications(!showNotifications); // Toggle the display of notifications
  };

  return (
    <div>
      <h2>
        <Chat onClick={toggleNotifications} style={{ cursor: 'pointer' }} /> {/* Chat icon to toggle notifications */}
        {notificationCount > 0 && <span className="notification-count">{notificationCount}</span>} {/* Display notification count */}
      </h2>
      {showNotifications && notifications && (
        <div>
          {notifications.map((notification) => (
            <p key={notification.id}>{notification.message}</p> // Display each notification message
          ))}
        </div>
      )}
    </div>
  );
}
