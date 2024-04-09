// NotificationMenu.js
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { listNotifications, sendNotification } from '../actions/notificationActions';
import { Chat } from 'react-bootstrap-icons';

export default function NotificationMenu({ userInfo }) {
  if (!userInfo) {
    return null; // Return null or a fallback UI if userInfo is null
  }
  const dispatch = useDispatch();
  const [recipientUsername, setRecipientUsername] = useState(userInfo.userName || '');
  const [message, setMessage] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);

  const notificationList = useSelector(state => state.notificationList);
  const { notifications } = notificationList;

  useEffect(() => {
    dispatch(listNotifications(userInfo.username));
  }, [dispatch, userInfo.username]);

  const sendHandler = () => {
    dispatch(sendNotification(userInfo.username, recipientUsername, message));
    setRecipientUsername('');
    setMessage('');
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  return (
    <div className='notification-menu'>
      <h3 className='notification-header'>
        <Chat className='chat-icon' /> Send a Message
      </h3>

      {showNotifications && notifications && (
        <div className='notification-list'>
          {notifications.map((notification) => (
            <p key={notification.id} className='notification-message'>
              {notification.message}
            </p>
          ))}
        </div>
      )}

      <div className='notification-inputs'>
        <input
          type='text'
          placeholder='Recipient Username'
          value={recipientUsername}
          onChange={(e) => setRecipientUsername(e.target.value)}
          style={{
            width: '100%', // Set the input width to 100% of its container
            padding: '8px', // Decrease padding for a smaller input
            fontSize: '14px', // Adjust font size
            border: '1px solid #ccc', // Add a border for visual clarity
            borderRadius: '4px', // Rounded corners
            // Add any other custom styles you'd like
          }}
        />

        <textarea
          placeholder='Message'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{
            width: '100%', // Set the input width to 100% of its container
            padding: '12px', // Increase padding for a more comfortable input
            fontSize: '16px', // Adjust font size
            border: '1px solid #ccc', // Add a border for visual clarity
            borderRadius: '4px', // Rounded corners
            resize: 'both', // Allow resizing both vertically and horizontally
            overflow: 'auto', // Show scrollbars if the content overflows
            // Add any other custom styles you'd like
          }}
        />


        <button
          className='send-button'
          onClick={sendHandler}
          style={{
            backgroundColor: '#333', // Set the button background color
            color: '#fff', // Set the text color
            border: 'none', // Remove the default border
            padding: '8px 14px', // Adjust padding for the button
            borderRadius: '4px', // Rounded corners
            cursor: 'pointer', // Show pointer cursor on hover
            transition: 'background-color 0.3s ease', // Add smooth transition
          }}
        >
          Send
        </button>

      </div>
    </div>
  );
}
