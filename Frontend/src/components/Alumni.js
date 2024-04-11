import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Alumni.css';
import CardItem from './CardItem';

function Alumni() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('/api/alumni/')
      .then(response => {
        setUsers(response.data);
        console.log('Users fetched:', response.data);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }, []);

  return (
    <div className='cards'>
      <h1>B-JET Alumni</h1>
      <p style={{ textAlign: 'center', fontSize: '1.2rem', fontWeight: 'bold' }}>
        Our alumni have gone on to work in various IT industries in Japan. They are making a positive impact in their communities and contributing to the growth of the Japanese technology and economy.
      </p>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            {users.map(user => (
              <CardItem
                key={user.id}
                src={user.profilePicture} // Use the profilePicture provided by your backend
                text={user.about || 'No description available'} // Use the about provided by your backend
                label={`${user.bjetBatch} Batch`}
                path={`/users/${user.id}`} // Replace with the actual path to view user details
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Alumni;
