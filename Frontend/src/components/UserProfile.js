// UserProfile.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserProfile.css';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import NotificationMenu from './NotificationMenu';

function UserProfile() {
  const [user, setUser] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  // User Information
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

  const updateUser = (updatedUser) => {
  const formData = new FormData();
  for (const key in updatedUser) {
    formData.append(key, updatedUser[key]);
  }

  axios.post(`/api/username/${userInfo.username}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  .then(response => {
    console.log('User updated:', response.data);
    setUser(response.data);
  })
  .catch(error => {
    console.error('Error updating user:', error);
  });
};


  const handleSubmit = (event) => {
    event.preventDefault();
    const updatedUser = {
      bjetBatch: event.target.bjetBatch.value,
      about: event.target.about.value,
      address: event.target.address.value,
      company: event.target.company.value,
      position: event.target.position.value,
      technologyStack: event.target.technologyStack.value,
      social: event.target.social.value,
      img: event.target.img.files[0]
    };
    updateUser(updatedUser);
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className='user-profile'>
      <img src={user.profilePicture} alt={user.userName} className='user-profile-picture' />
      <div className='user-profile-info'>
        <h1>{user.userName}</h1>
        <p>{user.email}</p>
        {user.about && <p>{user.about}</p>}
        {user['B-JET Batch'] && <p>B-JET Batch: {user['B-JET Batch']}</p>}
        {user.address && <p>Address: {user.address}</p>}
        {user.company && <p>Company: {user.company}</p>}
        {user.position && <p>Position: {user.position}</p>}
      </div>
      <form onSubmit={handleSubmit}>
        <input name="bjetBatch" placeholder="B-JET Batch" />
        <input name="about" placeholder="About" />
        <input name="address" placeholder="Address" />
        <input name="company" placeholder="Company" />
        <input name="position" placeholder="Position" />
        <input name="technologyStack" placeholder="Technology Stack" />
        <input name="social" placeholder="Social" />
        <input type="file" name="img" />
        <button type="submit">Update</button>
      </form>
      <NotificationMenu userInfo={userInfo} user={user} updateUser={updateUser}/>
    </div>
  );
}

export default UserProfile;
