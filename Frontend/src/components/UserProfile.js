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

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    axios.get(`/api/users/${id}`)
      .then(response => {
        setUser(response.data);
        setLoading(false);
        console.log('User fetched:', response.data);

        // Populate the form with existing user information
        setUpdatedProfile({
          bjetBatch: response.data.bjetBatch || '',
          about: response.data.about || '',
          address: response.data.address || '',
          company: response.data.company || '',
          position: response.data.position || '',
          technologyStack: response.data.technologyStack || '',
          social: response.data.social || ''
        });
      })
      .catch(error => {
        console.error('Error fetching user:', error);
        setLoading(false);
        navigate('/login');
      });
  }, [id, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProfile(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const formData = new FormData();
  
    for (const key in updatedProfile) {
      formData.append(key, updatedProfile[key]);
    }
  
    axios.post(`/api/username/${user.userName}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(response => {
      console.log('Profile updated successfully:', response.data);
      navigate(`/users/${id}`);
      setIsEditMode(false);
      window.location.reload();
    })
    .catch(error => {
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
        <p><b>Email:</b> {user.email}</p>
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
            {user.profile && <p><b>{user.profile}</b></p>}
            {user['B-JET Batch'] && <p><b>B-JET Batch:</b> {user['B-JET Batch']}</p>}
            {user.about && <p><b>About:</b> {user.about}</p>}
            {user.address && <p><b>Current Address:</b> {user.address}</p>}
            {user.company && <p><b>Current Company:</b> {user.company}</p>}
            {user.position && <p><b>Current Position:</b> {user.position}</p>}
            {user.technologyStack && <p><b>Technology Stack:</b> {user.technologyStack}</p>}
            {user.social && <p><b>Social:</b> {user.social}</p>}

            {userInfo && userInfo.username === user.userName && (
              <button className="styled-btn" onClick={() => setIsEditMode(true)}>Update Profile</button>
            )}
          </>
        )}
      </div>
      {userInfo && userInfo.username !== user.userName && <NotificationMenu userInfo={userInfo} user={user} />}
    </div>
  );
}

export default UserProfile;
