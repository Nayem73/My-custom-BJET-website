// Alumni.js
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

  // Helper function to chunk the array into smaller arrays
  const chunkArray = (arr, size) => {
    return arr.reduce((chunks, el, i) => {
      if (i % size === 0) {
        chunks.push([el]);
      } else {
        chunks[chunks.length - 1].push(el);
      }
      return chunks;
    }, []);
  };

  const userChunks = chunkArray(users, 4);

  return (
    <div className='cards'>
      <h1>B-JET Alumni</h1>
      <p style={{ textAlign: 'center', fontSize: '1.2rem', fontWeight: 'bold' }}>
        Our alumni have gone on to work in various IT industries in Japan. They are making a positive impact in their communities and contributing to the growth of the Japanese technology and economy.
      </p>
      <div className='cards__container'>
        {userChunks.map((chunk, index) => (
          <div key={index} className='cards__wrapper'>
            <ul className='cards__items'>
              {chunk.map(user => (
                <CardItem
                  key={user.id}
                  src={user.profilePicture}
                  text={user.position || 'Software Engineer'}
                  name={user.userName || 'BJET Graduate'}
                  company={user.company || 'BJET'}
                  label={`Batch ${user.bjetBatch}`}
                  path={`/users/${user.id}`}
                />
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Alumni;
