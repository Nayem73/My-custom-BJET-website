// UserProfile.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserProfile.css';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import NotificationMenu from './NotificationMenu';

function UserProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditMode, setIsEditMode] = useState(false);
  const [updatedProfile, setUpdatedProfile] = useState({
    bjetBatch: '',
    about: '',
    address: '',
    company: '',
    position: '',
    technologyStack: '',
    social: ''
  });

  const { id } = useParams();
  const navigate = useNavigate();

  // User Information
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;
  console.log('User Info:', userInfo);
  console.log('User:', user);

  useEffect(() => {
    axios.get(`/api/users/${id}`)
      .then(response => {
        setUser(response.data);
        setLoading(false);
        console.log('User fetched:', response.data);
      })
      .catch(error => {
        console.error('Error fetching user:', error);
        setLoading(false);
      });
  }, [id]);

  const isCurrentUserProfile = userInfo && user && userInfo.username === user.userName;

  const handleInputChange = (e) => {
  const { name, value } = e.target;
    setUpdatedProfile(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
  e.preventDefault();
  
  // Create a new FormData instance
  const formData = new FormData();
  
  // Append each property of updatedProfile to formData
  for (const key in updatedProfile) {
    formData.append(key, updatedProfile[key]);
  }
  
  // Send a PUT request to update the user's profile
  axios.post(`/api/username/${user.userName}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  .then(response => {
    // Handle successful update
    console.log('Profile updated successfully:', response.data);
    // Optionally, you can navigate the user back to their profile page
    navigate(`/users/${id}`);
    // Exit edit mode after updating profile
    setIsEditMode(false);
  })
  .catch(error => {
    // Handle error
    console.error('Error updating profile:', error);
  });
};


  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='user-profile'>
      <img src={user.profilePicture} alt={user.userName} className='user-profile-picture' />
      <div className='user-profile-info'>
        <h1>{user.userName}</h1>
        <p>{user.email}</p>
        {isEditMode ? (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>B-JET Batch:</label>
              <input
                type="text"
                name="bjetBatch"
                value={updatedProfile.bjetBatch}
                onChange={handleInputChange}
              />
              <label>About:</label>
              <input
                type="text"
                name="about"
                value={updatedProfile.about}
                onChange={handleInputChange}
              />
              <label>Address:</label>
              <input
                type="text"
                name="address"
                value={updatedProfile.address}
                onChange={handleInputChange}
              />
              <label>Company:</label>
              <input
                type="text"
                name="company"
                value={updatedProfile.company}
                onChange={handleInputChange}
              />
              <label>Position:</label>
              <input
                type="text"
                name="position"
                value={updatedProfile.position}
                onChange={handleInputChange}
              />
              <label>Technology Stack:</label>
              <input
                type="text"
                name="technologyStack"
                value={updatedProfile.technologyStack}
                onChange={handleInputChange}
              />
              <label>Social:</label>
              <input
                type="text"
                name="social"
                value={updatedProfile.social}
                onChange={handleInputChange}
              />
              {/* Optionally, add file input for image */}
              <label>Profile Picture:</label>
              <div className="file-input">
                <input
                  type="file"
                  name="img"
                  onChange={(e) => setUpdatedProfile({ ...updatedProfile, img: e.target.files[0] })}
                />
              </div>

              <div className="button-group">
                <button type="submit" className="styled-btn green">Save</button>
                <button onClick={() => setIsEditMode(false)} className="styled-btn red">Cancel</button>
              </div>
            </div>
          </form>
        ) : (
          <>
            <p>{user.about}</p>
            <p>{user.address}</p>
            <p>{user.company}</p>
            <p>{user.position}</p>
            <p>{user.technologyStack}</p>
            <p>{user.social}</p>
            {isCurrentUserProfile && (
              <button className="styled-btn" onClick={() => setIsEditMode(true)}>Update Profile</button>
            )}
          </>
        )}
      </div>
      {!isCurrentUserProfile && <NotificationMenu userInfo={userInfo} user={user} />}
    </div>
  );
}

export default UserProfile;