import React from 'react';
import './Cards.css';
import CardItem from './CardItem';
import NewImage from '../images/220804v6.jpg';
import bjet14thBatch from '../images/bjet14thBatch.webp';
import { Link } from 'react-router-dom';

function Cards() {
  const linkToPDF = 'https://www.miyazaki-u.ac.jp/kokusai/news-events/mediafile/220804v6.pdf';

  return (
    <div className='cards'>
      <h1>At B-JET</h1>
      <p style={{ textAlign: 'center', fontSize: '1.2rem', fontWeight: 'bold' }}>
        Under the mission of "creating people and organizations that challenge the social issues and possibilities of Bangladesh and Miyazaki," we aim to acquire the minimum Japanese language skills necessary for ICT human resources in Bangladesh to work in the ICT market in Japan, as well as the knowledge necessary for living and working in Japan in 20 weeks (400 credit hours).
      </p>
        <div className='cards__buttons'>
        <Link to="/aboutus">
          <button>Background & Achievements</button>
        </Link>
        <Link to="/program-contents">
          <button>Program Contents</button>
        </Link>
        </div>
      <div className='cards__image-link'>
        <a href={linkToPDF} target="_blank" rel="noopener noreferrer">
          <img src={NewImage} alt="220804v6" />
        </a>
      </div>
      <div>
        <h1>B-JET Training Program for it's 14th Batch</h1>
        <img src={bjet14thBatch} alt="bjet14thBatch" />
      </div>
    </div>
  );
}

export default Cards;
