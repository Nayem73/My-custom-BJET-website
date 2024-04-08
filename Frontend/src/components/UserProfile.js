import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserProfile.css';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import NotificationMenu from './NotificationMenu'; // Import NotificationMenu component

function UserProfile() {
  const [user, setUser] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
    // __________________User INformations_____________________//
    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

  useEffect(() => {
    axios.get(`/api/users/${id}`)
      .then(response => {
        setUser(response.data);
        console.log('User fetched:', response.data);
      })
      .catch(error => {
        console.error('Error fetching user:', error);
      });
  }, [id]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className='user-profile'>
      <img src={user.profilePicture} alt={user.userName} className='user-profile-picture' />
      <div className='user-profile-info'>
        <h1>{user.userName}</h1>
        <p>{user.email}</p>
        <p>{user.about}</p>
        <p>B-JET Batch: {user['B-JET Batch']}</p>
        <p>Address: {user.address}</p>
        <p>Company: {user.company}</p>
        <p>Position: {user.position}</p>
      </div>
        <NotificationMenu userInfo={userInfo} /> {/* Pass userInfo prop to NotificationMenu */}
    </div>
  );
}

export default UserProfile;
