import './Hero.css';
import Carousel from 'react-material-ui-carousel';
import { Paper } from '@mui/material';

const Hero = ({carouselItems, aboutUs, testimonial}) => {
  return (
    <div className='carousel-container'>
        <Carousel>
            {
                carouselItems.map((curItem, index) => (
                    <Paper key={index}>
                        <div className='carousel-card-container'>
                            <div className='carousel-card'>
                                <div className='carousel-detail'>
                                    <div className='carousel-img'>
                                        <img src={curItem.img} alt=""/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Paper>
                ))
            }
        </Carousel>
        <div>
            <div className='about-us-container'>
                <p>{aboutUs.aboutUs}</p>
            </div>
            <div className='testimonial-container'>
                <h2>{testimonial.name}</h2>
                <h3>{testimonial.role}</h3>
                <p>{testimonial.testimonial}</p>
            </div>
        </div>
    </div>
  )
}

export default Hero;