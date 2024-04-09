import React from 'react';
import './Cards.css';
import CardItem from './CardItem';
import NewImage from '../images/220804v6.jpg';

function Cards() {
  const linkToPDF = 'https://www.miyazaki-u.ac.jp/kokusai/news-events/mediafile/220804v6.pdf';

  return (
    <div className='cards'>
      <h1>At B-JET</h1>
      <p style={{ textAlign: 'center', fontSize: '1.2rem', fontWeight: 'bold' }}>
        Under the mission of "creating people and organizations that challenge the social issues and possibilities of Bangladesh and Miyazaki," we aim to acquire the minimum Japanese language skills necessary for ICT human resources in Bangladesh to work in the ICT market in Japan, as well as the knowledge necessary for living and working in Japan in 20 weeks (400 credit hours).
      </p>
       <div className='cards__buttons'>
        <button>Background & Achievements</button>
        <button>Program Contents</button>
      </div>
      <div className='cards__image-link'>
        <a href={linkToPDF} target="_blank" rel="noopener noreferrer">
          <img src={NewImage} alt="220804v6" />
        </a>
      </div>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
              src='images/img-9.jpg'
              text='Explore the hidden waterfall deep inside the Amazon Jungle'
              label='Adventure'
              path='/services'
            />
            <CardItem
              src='images/img-2.jpg'
              text='Travel through the Islands of Bali in a Private Cruise'
              label='Luxury'
              path='/services'
            />
          </ul>
          <ul className='cards__items'>
            <CardItem
              src='images/img-3.jpg'
              text='Set Sail in the Atlantic Ocean visiting Uncharted Waters'
              label='Mystery'
              path='/services'
            />
            <CardItem
              src='images/img-4.jpg'
              text='Experience Football on Top of the Himilayan Mountains'
              label='Adventure'
              path='/products'
            />
            <CardItem
              src='images/img-8.jpg'
              text='Ride through the Sahara Desert on a guided camel tour'
              label='Adrenaline'
              path='/sign-up'
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;
