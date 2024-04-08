import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../actions/userActions';
import { listCrops } from '../actions/cropActions';
import MessageNotification from '../components/MessageNotification';
import './Header.css';

function Header() {
    const history = useNavigate();
    const dispatch = useDispatch();

    // User Information
    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    // Log out handler
    const logOutHandler = () => {
        dispatch(logout());
        history('/');
    }

    // Dropdown state
    const [dropdownOpen, setDropdownOpen] = useState(false);

    return (
        <header className='header-container'>
            <nav className='header-nav'>
                <Link to={'/'} className='header-logo'>
                    <img src="/logo.png" alt="logo" />
                </Link>
                <Link to={'/'} className='header-link'>Home</Link>
                <Link to={'/resources'} className='header-link'>Resources</Link>
                <Link to={'/break-the-barrier'} className='header-link'>Break the Barrier</Link>
                <Link to={'/alumni'} className='header-link'>B-JET Alumni</Link>
                <Link to={'/review'} className='header-link'>Community</Link>
                {userInfo ? (
                    <>
                        <MessageNotification userInfo={userInfo} />
                        <div className='header-dropdown'>
                            <button onClick={() => setDropdownOpen(!dropdownOpen)} className='header-button'>Menu</button>
                            {dropdownOpen && (
                                <div className='header-dropdown-content'>
                                    <Link to={'/profile'} className='header-dropdown-link'>Profile</Link>
                                    <Link to={'/review'} className='header-dropdown-link'>Review</Link>
                                    {userInfo.isAdmin && (
                                        <>
                                            <Link to={'/admin/userlist'} className='header-dropdown-link'>Users</Link>
                                            <Link to={'/admin/disease/'} className='header-dropdown-link'>Diseases</Link>
                                            <Link to={'/admin/crop/'} className='header-dropdown-link'>Crops</Link>
                                            <Link to={'/admin/subscriptions'} className='header-dropdown-link'>Subscriptions</Link>
                                        </>
                                    )}
                                    <button onClick={logOutHandler} className='header-dropdown-link'>Logout</button>
                                </div>
                            )}
                        </div>
                    </>
                ) : (
                    <Link to={'/login'} className='header-link'>Log in</Link>
                )}
            </nav>
        </header>
    )
}
export default Header;
