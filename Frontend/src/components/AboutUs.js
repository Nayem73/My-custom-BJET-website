import React from 'react';
import './AboutUs.css';
import Image1 from '../images/1.jpg';
import Image2 from '../images/2.jpg';

const AboutUs = () => {
  return (
    <div className='aboutUsCards'>
      <h1>Background & Achievements</h1>
      <div className='aboutUsCards__container'>
        <div className='aboutUsCards__wrapper'>
          <ul className='aboutUsCards__items'>
            <li className='aboutUsCards__item'>
              <div className='aboutUsCards__item__link'>
                <figure className='aboutUsCards__item__pic-wrap' data-category='Our History'>
                  {/* Insert picture here */}
                  <img src={Image1} alt='Image Description' className='aboutUsCards__item__img' />
                </figure>
                <div className='aboutUsCards__item__info'>
                  <h5 className='aboutUsCards__item__text'><b>About B-JET and the University's efforts to date</b></h5>
                  <p>Our university has been participating in JICA projects since 2017 and has accumulated know-how. In the future, we will implement it as a certificate program of our university.</p>
                  <h5 className='aboutUsCards__item__text'><b>Our University's Achievements</b></h5>
                  <p>Waseda University has been participating in the "Miyazaki-Bangladesh Model," an industry-government-academia collaborative project to introduce advanced ICT human resources since 2017, from the planning stage of the JICA technical cooperation project Japan"Bangladesh-Japan ICT Engineers' Training Program (B-JET)," which has been implemented since 2017. We dispatched Japanese teachers from November 2017 to October 2020. In addition, the Japanese × IT Internship Program (JIP), which was supported Japanese×by Miyazaki City, accepted B-JET graduates for short-term study abroad programs and provided internships and Japanese education at companies to support their employment and retention in the community.</p>
                  <p>In the first phase of the B-JET Programme, 265 students completed the program in eight periods from November 2017 to October 2020, of which 57 participated in the JIP at the university. Of these, 50 are employed in Miyazaki Prefecture, and a total of 24 companies have accepted them. Of the 186 B-JET graduates who have found employment in Japan, this is the second largest number of employees in Japan after Tokyo, and is attracting attention as an initiative to support the introduction of unique regional human resources.</p>
                </div>
              </div>
            </li>
            <li className='aboutUsCards__item'>
              <div className='aboutUsCards__item__link'>
                <figure className='aboutUsCards__item__pic-wrap' data-category='Project Succession'>
                  {/* Insert picture here */}
                  <img src={Image2} alt='Image Description' className='aboutUsCards__item__img' />
                </figure>
                <div className='aboutUsCards__item__info'>
                  <h5 className='aboutUsCards__item__text'><b>Business Succession</b></h5>
                  <p>After the completion of B-JET in 2020, the University of Miyazaki, B&M Co., Ltd., BJIT Group, and emerging publisher Keirinkan Co., Ltd. were selected to take over the business of B-JET in March 2021. The University of Miyazaki has signed an MOU for the business succession of B-JET. In addition, TUFS and NSU have concluded an agreement for a Cooperative Career Development and Training Program on the implementation of B-JET based on the Memorandum of Understanding of Educational Cooperation.</p>
                  <p>The Miyazaki-Bangladesh model will be used as the first phase, and the "Human Resource Development Program for Foreign ICT Engineers," which succeeded B-JET and integrated with JIP, will be implemented as the second phase. Of this program, the local education will be operated by the endowed course of Keirinkan Co., Ltd. as a B-JET Basic course, and the Center for International Cooperation will offer an advanced course for graduates of the Basic course to study abroad in Miyazaki as a certificate of completion.</p>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
export default AboutUs;
