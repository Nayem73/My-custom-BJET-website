import './Hero.css';
import Carousel from 'react-material-ui-carousel';
import { Paper } from '@mui/material';

const Hero = ({carouselItems}) => {
  return (
    <div className='carousel-container'>
        <Carousel>
            {
                carouselItems.map((curItem) => {
                    return (
                        <Paper>
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
                    )
                })
            }
        </Carousel>
    </div>
  )
}

export default Hero