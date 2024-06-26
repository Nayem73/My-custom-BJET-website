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
import BreakTheBarrier from './screens/BreakTheBarrier';
import AdminReviewScreen from './screens/AdminReviewScreen';
import AdminPictureScreen from './screens/AdminPictureScreen';

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
          <Route path='/break-the-barrier' element={<BreakTheBarrier />} />
          <Route path='/admin/review/create/' element={<AdminReviewScreen />} />
          <Route path='/admin/picture/' element={<AdminPictureScreen />} />
        </Routes>
    </>
  );  
}

export default App;
