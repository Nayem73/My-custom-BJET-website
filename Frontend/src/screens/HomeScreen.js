import React from 'react';
import Slider from '../components/Slider';

function HomeScreen() {
    // Mock data representing carousel image URLs
    const carouselImages = [
        "/api/carousel?link=images/1712052749120_1.jpg",
        "/api/carousel?link=images/1712053034890_2.jpg",
        "/api/carousel?link=images/1712053045356_3.jpg",
        "/api/carousel?link=images/1712053053983_4.jpg",
        "/api/carousel?link=images/1712053062832_5.jpg",
        "/api/carousel?link=images/1712053069905_6.jpg",
        "/api/carousel?link=images/1712053076240_7.jpg"
    ];

    return (
        <>  
            <div className='mt-5'></div>
            <Slider items={carouselImages} />
        </>
    );
}

export default HomeScreen;
