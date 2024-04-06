import './App.css';

// Nayem
import {useState, useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import api from './api/axiosConfig';
import Layout from './components/Layout';
// import Home from './components/home/Home';
import Navbar from './components/Navbar';
import Home from './components/pages/Home';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ReviewScreen from './screens/ReviewScreen';
import HomeScreen from './screens/HomeScreen';
import Header from './components/Header';

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
    <>
        <Header />
        <Routes>
          {/* <Route path='/' element={<Home carouselItems={carouselItems} aboutUs={aboutUs}/>} /> */}
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<LoginScreen />} />
          <Route path='/register' element={<RegisterScreen />} />
          <Route path='/review' element={<ReviewScreen />} />
          <Route exact path='/' element={<HomeScreen />} />
        </Routes>
    </>
  );  

  // return (
  //   <div className='App'>
  //     <Routes>
  //       <Route path='/' element={<Layout/>}>
  //         <Route path='/' element={<Home carouselItems={carouselItems} aboutUs={aboutUs}/>}/>
  //       </Route>
  //     </Routes>
  //   </div>
  // );
}

export default App;
