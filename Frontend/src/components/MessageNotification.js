// MessageNotification.js

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { listNotifications, fetchUser} from '../actions/messageActions';
import { deleteNotification } from '../actions/notificationActions';
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

  const userFetch = useSelector(state => state.userFetch);
  const { user } = userFetch;

  useEffect(() => {
    if (userInfo) {
      // Fetch user data immediately
      dispatch(fetchUser(userInfo.username));
      dispatch(listNotifications(userInfo.username));

      // Set up polling: fetch user data and notifications list every 5 seconds
      const intervalId = setInterval(() => {
        dispatch(fetchUser(userInfo.username));
        dispatch(listNotifications(userInfo.username));
      }, 5000);

      // Clean up: clear the interval when the component unmounts
      return () => clearInterval(intervalId);
    }
  }, [dispatch, userInfo.username]);

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications); // Toggle the display of notifications
  };

  const handleDelete = (notificationId) => {
    dispatch(deleteNotification(notificationId, userInfo.username));
  };

  return (
    <div className="message-notification-container" onMouseEnter={() => setShowNotifications(true)} onMouseLeave={() => setShowNotifications(false)}>
      <h2>
        <Chat style={{ cursor: 'pointer', fontSize: '1.5rem', color: 'white' }} />
        {user?.notificationCount > 0 && <span className="notification-count">{user.notificationCount}</span>}
      </h2>
      {showNotifications && notifications && (
        <div className="notification-dropdown">
          {notifications.map((notification) => (
            <div key={notification.id} className="notification-item">
              <p onClick={() => {navigate(`/users/${notification.senderId}`); toggleNotifications();}}>
                <strong>{notification.senderUsername}:</strong> {notification.message}
              </p>
              <button className="delete-button" onClick={() => handleDelete(notification.id)}>X</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
