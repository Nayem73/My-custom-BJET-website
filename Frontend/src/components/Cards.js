// Cards.js file
import React from 'react';
import './Cards.css';
import CardItem from './CardItem';
import NewImage from '../images/220804v6.jpg';
import bjet14thBatch from '../images/bjet14thBatch.webp';
import testimonial1 from '../images/testimonial1.webp';
import testimonial2 from '../images/testimonial2.webp';
import { Link } from 'react-router-dom';

function Cards() {
  const linkToPDF = 'https://www.miyazaki-u.ac.jp/kokusai/news-events/mediafile/220804v6.pdf';

  return (
    <div className='cards'>
      <h1 className='cards__header'>At B-JET</h1>
      <p className='cards__description'>
        Under the mission of "creating people and organizations that challenge the social issues and possibilities of Bangladesh and Miyazaki," we aim to acquire the minimum Japanese language skills necessary for ICT human resources in Bangladesh to work in the ICT market in Japan, as well as the knowledge necessary for living and working in Japan in 20 weeks (400 credit hours).
      </p>
      <div className='cards__buttons'>
        <Link to="/aboutus">
          <button className='cards__button'>Background & Achievements</button>
        </Link>
        <Link to="/program-contents">
          <button className='cards__button'>Program Contents</button>
        </Link>
      </div>
      <div className='cards__image-link'>
        <a href={linkToPDF} target="_blank" rel="noopener noreferrer">
          <img src={NewImage} alt="220804v6" className='cards__image-link' />
        </a>
      </div>
      <h2 className='cards__subheader'>B-JET Training Program for its 14th Batch</h2>
      <div className='cards__image-container'>
        <img src={bjet14thBatch} alt="bjet14thBatch" className='cards__image' />
      </div>
      <div className='cards__container'>
        <h3 className='cards__title'>Key Points</h3>
        <ul className='cards__list'>
          <li>This is a certified program conducted by the University of Miyazaki and North South University.</li>
          <li>You will be able to take Japanese language class, IT class, and business manner class in 13 weeks as intensive training program.</li>
          <li>Hybrid class, 3 days a week offline and 2 days a week online.</li>
          <li>The program consists of the B-JET Basic Course and the B-JET Advanced Course. The Basic Course is conducted in Bangladesh and includes Japanese language education and career education. The Advanced Course takes place in Miyazaki, Japan, and provides further education and training for those who got the opportunity in Miyazaki companies.</li>
          <li>Classes are led by highly qualified lecturers with extensive industry experience from Japan.</li>
          <li>Supported by BJIT Group, B&M, GlobalGeeks and Keirinkan.</li>
          <li>Books and other materials will be provided to all the trainees.</li>
        </ul>
      </div>
      <div className='cards__container'>
        <h3 className='cards__title'>Benefits</h3>
        <ul className='cards__list'>
          <li>Trainees in the program could be considered for interviews with Japanese IT companies.</li>
          <li>They will learn the Japanese language, enabling them to effectively communicate with their Japanese counterparts.</li>
          <li>Language proficiency opens doors for better collaboration, networking, and career prospects in Japan.</li>
          <li>This specialized training enhances their abilities and increases their competitiveness in the Japanese job market.</li>
          <li>Trainees will receive a certificate of completion from the University of Miyazaki (UoM).</li>
        </ul>
      </div>
      <div className='cards__container'>
        <h3 className='cards__title'>Overview</h3>
        <p>The B-JET program, short for Bangladesh-Japan ICT Engineers' Training Program, is an initiative implemented within the JICA technical cooperation project by the Japan International Cooperation Agency (JICA) and the Bangladesh Computer Council (BCC). It has successfully run for eight batches from 2017 to 2020, and in March 2021, it was handed over to the North South University (NSU), the University of Miyazaki, and cooperating companies (BJIT Group, B&M, and KEIRINKAN). The current batch, commencing from June 2024 to September 2024, is considered the 14th batch.
        The primary objective of the B-JET program is to support the development of Bangladeshi ICT engineers and aspiring ICT engineers who have the potential to create business networks between Japan and Bangladesh. The program aims to provide comprehensive training and opportunities for employment in Japanese job market.</p>
      </div>
      <div className='cards__container'>
        <h3 className='cards__title'>Mission/Vision/Ideal model</h3>
        <ul className='cards__list'>
          <li>Mission: Our mission is to foster individuals and organizations capable of addressing social issues in both Bangladesh and Japan(Miyazaki).</li>
          <li>Vision: Our vision is to establish sustainable connections between people and organizations, fostering mutual development between Bangladesh and Japan.</li>
          <li>Ideal Model: "Be a Giver": Our ideal model encourages individuals to be proactive and driven by a long-term vision. We aim to cultivate human resources who actively engage in challenges and collaborate effectively with diverse stakeholders.</li>
        </ul>
      </div>
      <div className='cards__container'>
        <h3 className='cards__title'>Requirements</h3>
        <ul className='cards__list'>
          <li>Internet Connection: Must have access to an internet connection and a laptop or desktop PC (mobile phones are not accepted) for online training.</li>
          <li>Schooling Sessions: Mandatory participation in face-to-face class that will be conducted in B-JET centre (at NSU campus) . Students are responsible for their own transportation and accommodation expenses for schooling.</li>
          <li>Degree: Must hold a bachelor’s degree in CSE, IT, or ICT-related subjects.</li>
          <li>ITEE Level 2 (FE): Candidates certified with ITEE Level 2 (FE) can participate directly in the VIVA of the selection process.</li>
          <li>Work Experience: Preferably have one to two years or more of working experience in programming/software development/AI/machine learning. Freshers can also apply.</li>
          <li>Programming Knowledge: Should have considerable knowledge of modern programming languages, good problem-solving abilities, and familiarity with Object-Oriented Programming and design.</li>
          <li>Language Skills: Strong interest in learning the Japanese language, along with a self-learning mindset and good communication skills in English.</li>
          <li>Willingness: Must be willing to work in Japanese job market.</li>
        </ul>
      </div>
      <div className='cards__container'>
        <h3 className='cards__title'>Responsibility</h3>
        <ul className='cards__list'>
          <li>Examinations: Attain scores equal to or above the pass mark set by the examiners for both the term and final exams.</li>
          <li>Attendance Rate: Maintain an attendance rate of 80% or higher.</li>
          <li>Trainees are expected to possess a dedicated and adaptive mindset, demonstrating a strong willingness to learn the Japanese language and corporate manner.</li>
          <li>Trainees are encouraged to adopt a proactive attitude towards learning.</li>
          <li>Trainees are required to strictly adhere to the designated training schedule. It is crucial for trainees to maintain punctuality and participate in all scheduled classes and activities as per the schedule.</li>
        </ul>
      </div>
      <div className='cards__container'>
        <h3 className='cards__title'>Class hours and content</h3>
        <p>The Program provides 260 classes (195 hours) of Japanese language education. This is a compulsory course. In addition to this, there are 130 classes (97.5 hours) of extracurriculars.) consisting of the compulsory course and the extracurricular course. (1class = 45 minutes).</p>
      </div>
      <div className='cards__container'>
        <h3 className='cards__title'>Schedule</h3>
        <ul className='cards__list'>
          <li>Duration: 13 weeks</li>
          <li>Orientation Program: 24th May, 2024</li>
          <li>Start: 3rd June, 2024</li>
          <li>End: 13th September, 2024</li>
          <li>Days: Monday to Friday</li>
          <li>Time: 8:30 a.m. to 4:00 p.m.</li>
        </ul>
      </div>

      <div className='testimonial'>
      <div className='testimonial__item'>
        <img src={testimonial1} alt="Nusrat Tahsin Kamaly" className='testimonial__image' />
        <div className='testimonial__content'>
          <h3 className='testimonial__name'>Nusrat Tahsin Kamaly</h3>
          <p className='testimonial__about'>Software Engineer from Thesaurus Inc.,Japan</p>
          <p className='testimonial__text'>I was a BJET trainee in their 9th Batch. We attended classes 5 days a week, for 5 months. Everyday we learned something new about the Japanese language, Culture and Business Etiquettes. Every week, we were given the opportunity to have direct conversations with Japanese people online. Even after I was done with the training, I got tremendous support during my Visa application. Everything I learned from BJET has made adapting to the Japanese lifestyle a lot easier. I feel confident to approach people in Japan and they also appreciate that I invested my time to learn about their culture.</p>
        </div>
      </div>
      <div className='testimonial__item'>
        <img src={testimonial2} alt="Md. Sazzad Hossain" className='testimonial__image' />
        <div className='testimonial__content'>
          <h3 className='testimonial__name'>Md. Sazzad Hossain</h3>
          <p className='testimonial__about'>System Engineer from Co-Well Co., Ltd.</p>
          <p className='testimonial__text'>As a fresh graduate with the dream to join a reputed IT firm in Japan, it seemed hard, and I felt lost at first. However, soon with the help of B-JET, I was finally able to reach my goal. This is a program for people who have a passion to build their careers in Japan with the goal to learn and develop. If you have a strong conviction, determined about reaching your target, B-JET will surely guide you to the best of its abilities and help you reach your goal.</p>
        </div>
      </div>
    </div>
    </div>
  );
}
export default Cards;