import './App.css';

// Nayem
import api from './api/axiosConfig';
import {useState, useEffect} from 'react';
import Layout from './components/Layout';
import { Routes, Route } from 'react-router-dom';
import Home from './components/home/Home';

function App() {
  const [carouselItems, setCarouselItems] = useState([]);
  const [aboutUs, setAboutUs] = useState({});

  const getCarouselItems = async () => {
    try {
      const response = await api.get('/api/carousel');
      setCarouselItems(response.data);
    } catch (error) {
      console.error('Error fetching carousel items: ', error);
    }
  }
    const getAboutUs = async () => {
    try {
      const response = await api.get('/api/aboutus');
      setAboutUs(response.data);
    } catch (error) {
      console.error('Error fetching aboutUs: ', error);
    }
  }

  useEffect(() => {
    getCarouselItems();
    getAboutUs();
  }, [])

  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route path='/' element={<Home carouselItems={carouselItems} aboutUs={aboutUs}/>}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
