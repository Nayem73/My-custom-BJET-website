import './App.css';

// Nayem
import api from './api/axiosConfig';
import {useState, useEffect} from 'react';
import Layout from './components/Layout';
import { Routes, Route } from 'react-router-dom';
import Home from './components/home/Home';

function App() {
  const [carouselItems, setCarouselItems] = useState([]);
  const getCarouselItems = async () => {
    try {
      const response = await api.get('/api/carousel');
      setCarouselItems(response.data);
    } catch (error) {
      console.error('Error fetching carousel items: ', error);
    }
  }

  useEffect(() => {
    getCarouselItems();
  }, [])

  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route path='/' element={<Home carouselItems={carouselItems}/>}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
