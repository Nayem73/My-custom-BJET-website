import Hero from "../hero/Hero";
import { useEffect, useState } from 'react';
import axios from 'axios';

const Home = ({carouselItems, aboutUs}) => {
  // instead of directly passing carouselItems and aboutUs to the Home component from the App component, we can directly fetch the data from the Home component itself. This way, we can avoid passing props from the App component to the Home component.
  // like how we will fetch testimonial directly from here now:
  const [testimonial, setTestimonial] = useState({});
  useEffect(() => {
    axios.get('/api/testimonial')
      .then(response => {
        setTestimonial(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching testimonials', error);
      });
  }, []);

  return (
    <Hero carouselItems={carouselItems} aboutUs={aboutUs} testimonial={testimonial}/>
  )
}

export default Home