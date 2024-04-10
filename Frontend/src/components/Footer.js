import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';
import Footer1 from '../images/Footer1.webp';
import Footer2 from '../images/Footer2.webp';
import Footer3 from '../images/Footer3.webp';
import Footer4 from '../images/Footer4.webp';
import Footer5 from '../images/Footer5.webp';
import BjetLogo from '../images/logo.png';

function Footer() {
  return (
    <div className='footer-container'>
      <section className='footer-subscription'>
        <p className='footer-subscription-heading'>
          Join B-JET to work as an ICT Engineer in Japan!
        </p>
        <p className='footer-subscription-text'>
          Subscribe for our newsletters now!
        </p>
        <div className='input-areas'>
          <form>
            <input
              className='footer-input'
              name='email'
              type='email'
              placeholder='Your Email'
            />
            <button type="submit" className="subscribe-btn">Subscribe</button>
          </form>
        </div>
      </section>

      
      <div class='footer-logo'>
        <Link to='/' className='social-logo'>
          {/* TRVL */}
          {/* <i class='fab fa-typo3' /> */}
        </Link>
        <div className='logo-container'>
  <img src={Footer1} alt='Logo 1' className='logo'/>
  <p className='logo-title'>University of Miyazaki</p>
</div>
<div className='logo-container'>
  <img src={Footer2} alt='Logo 2' className='logo'/>
  <p className='logo-title'>Emerging Publisher Keirinkan Co., Ltd.</p>
</div>
<div className='logo-container'>
  <img src={Footer3} alt='Logo 3' className='logo logo-extra-large'/>
  <p className='logo-title'>North South University</p>
</div>
<div className='logo-container'>
  <img src={Footer4} alt='Logo 4' className='logo logo-large'/>
  <p className='logo-title'>BJIT Group</p>
</div>
<div className='logo-container'>
  <img src={Footer5} alt='Logo 5' className='logo logo-large'/>
  <p className='logo-title'>B&M Inc.</p>
</div>
      </div>


      <section class='social-media'>
        <div class='social-media-wrap'>
          <div class='footer-logo'>
            <Link to='/' className='social-logo'>
              <img src={BjetLogo} alt="B-JET Logo" className='logo' /> 
            </Link>
          </div>
          <small class='website-rights'>Copyright © 2021 University of Miyazaki. All Rights Reserved.</small>
          <div class='social-icons'>
            <Link
              class='social-icon-link facebook'
              to='/'
              target='_blank'
              aria-label='Facebook'
            >
              <i class='fab fa-facebook-f' />
            </Link>
            <Link
              class='social-icon-link instagram'
              to='/'
              target='_blank'
              aria-label='Instagram'
            >
              <i class='fab fa-instagram' />
            </Link>
            <Link
              class='social-icon-link youtube'
              to='/'
              target='_blank'
              aria-label='Youtube'
            >
              <i class='fab fa-youtube' />
            </Link>
            <Link
              class='social-icon-link twitter'
              to='/'
              target='_blank'
              aria-label='Twitter'
            >
              <i class='fab fa-twitter' />
            </Link>
            <Link
              class='social-icon-link twitter'
              to='/'
              target='_blank'
              aria-label='LinkedIn'
            >
              <i class='fab fa-linkedin' />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Footer;
