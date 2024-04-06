import './App.css';

// Nayem
//import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ReviewScreen from './screens/ReviewScreen';
import Header from './components/Header';
import Home from './components/pages/Home';

function App() {
  return (
    <>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<LoginScreen />} />
          <Route path='/register' element={<RegisterScreen />} />
          <Route path='/review' element={<ReviewScreen />} />
        </Routes>
    </>
  );  
}

export default App;
