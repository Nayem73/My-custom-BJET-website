// MessageNotification.js

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { listNotifications } from '../actions/messageActions';
import { Chat } from 'react-bootstrap-icons'; // Import Chat icon from react-bootstrap-icons
import './MessageNotification.css'; // Import the CSS file
import { useNavigate } from 'react-router-dom';

export default function MessageNotification({ userInfo }) {
  if (!userInfo) {
    return null; // Return null or a fallback UI if userInfo is null
  }
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false); // State to control the display of notifications

  const notificationList = useSelector(state => state.notificationList);
  const { notifications } = notificationList;

  useEffect(() => {
    dispatch(listNotifications(userInfo.username));
  }, [dispatch, userInfo.username]);

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications); // Toggle the display of notifications
  };

  return (
    <div className="message-notification-container" onMouseEnter={() => setShowNotifications(true)} onMouseLeave={() => setShowNotifications(false)}>
      <h2>
        <Chat style={{ cursor: 'pointer', fontSize: '1.5rem', color: 'white' }} />
        {userInfo.notificationCount > 0 && <span className="notification-count">{userInfo.notificationCount}</span>}
      </h2>
      {showNotifications && notifications && (
        <div className="notification-dropdown">
          {notifications.map((notification) => (
            <p key={notification.id} onClick={() => {navigate(`/users/${notification.senderId}`); toggleNotifications();}}>
              <strong>{notification.senderUsername}:</strong> {notification.message}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
