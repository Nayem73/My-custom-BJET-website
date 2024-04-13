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
import Alumni from './components/Alumni';
import UserProfile from './components/UserProfile';
import AboutUs from './components/AboutUs';
import UserListScreen from './screens/AdminUserListScreen';
import BjetResourceScreen from './screens/BjetResourceScreen';

function App() {
  return (
    <>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<LoginScreen />} />
          <Route path='/register' element={<RegisterScreen />} />
          <Route path='/review' element={<ReviewScreen />} />
          <Route path='/alumni' element={<Alumni />} />
          <Route path='/users/:id' element={<UserProfile />} />
          <Route path='/aboutus' element={<AboutUs />} />
          <Route path='/admin/userlist/' element={<UserListScreen />} />
          <Route path='/resources' element={<BjetResourceScreen />} />
        </Routes>
    </>
  );  
}

export default App;
