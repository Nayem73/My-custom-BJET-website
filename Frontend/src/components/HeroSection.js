import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Carousel from 'react-material-ui-carousel';
import { Paper } from '@mui/material';
import { Button } from './Button';
import './HeroSection.css';

function HeroSection() {
  const [carouselItems, setCarouselItems] = useState([]);

  useEffect(() => {
    axios.get('/api/carousel')
      .then(response => {
        setCarouselItems(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching carousel items', error);
      });
  }, []);

  return (
    <div className='hero-container'>
      <div className='hero-content'>
        <h1>ADVENTURE AWAITS</h1>
        <p>What are you waiting for?</p>
        <div className='hero-btns'>
          <Button
            className='btns'
            buttonStyle='btn--outline'
            buttonSize='btn--large'
          >
            GET STARTED
          </Button>
          <Button
            className='btns'
            buttonStyle='btn--primary'
            buttonSize='btn--large'
            onClick={() => console.log('hey')}
          >
            WATCH TRAILER <i className='far fa-play-circle' />
          </Button>
        </div>
      </div>
      <Carousel>
        {carouselItems.map((curItem, index) => (
          <Paper key={index}>
            <div className='carousel-img-container'>
              <img src={curItem.img} alt="" />
            </div>
          </Paper>
        ))}
      </Carousel>
    </div>
  );
}

export default HeroSection;
