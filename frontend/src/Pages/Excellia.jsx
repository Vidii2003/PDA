import React from 'react';
import './Excellia.css';
import ParticlesComponent from '../components/ParticlesComponent';
import {poster} from "../assets";
import { Link } from 'react-router-dom';
const Excellia = () => {
  const imageData = [
    { src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRM5LdqwqqlJMEvuVCcjb26qI6yFZEIHiK_FQ&s', title: 'Tamil Mandram' },
    { src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGLkwuN0R3mCzlK_HZte2RkzHD4fQo1WyTUw&s', title: 'Tedc MIT' },
    { src: 'https://via.placeholder.com/150', title: 'QUANTuMIT' },
    { src: 'https://via.placeholder.com/150', title: 'Photo Society of MIT' },
    { src: 'https://via.placeholder.com/150', title: 'AUSEC MIT' },
    { src: 'https://via.placeholder.com/150', title: 'VIBEZ MIT' },
    { src: 'http://www.tbo.mitindia.edu/images/logo5.png', title: 'The Box Office' },
    { src: 'https://via.placeholder.com/150', title: 'Metrological club' },
    { src: 'https://via.placeholder.com/150', title: 'MIT Museum' },
    { src: 'https://via.placeholder.com/150', title: 'BRO MIT' },
    { src: 'https://via.placeholder.com/150', title: 'MIT Quill' },
    { src: 'https://via.placeholder.com/150', title: 'MIT Athenaeum' },
    { src: 'https://via.placeholder.com/150', title: 'Quiz Club of MIT' }
   
  ];
  
  return (
    <div className="excellia-container">
      {/* Particles Effect */}

      {/* 1st Section: Title with background video */}
      <section className="hero-section">
        <video
          className="background-video"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/header_video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* New Info Section */}
        <div className="info-grid">
          <div className="info-item">
            <i className="fas fa-map-marker-alt"></i>
            <h3>Venue</h3>
            <p>Madras Institute of Technology</p>
          </div>
          <div className="info-item">
            <i className="fas fa-calendar-alt"></i>
            <h3>Date</h3>
            <p>20 October, 2024</p>
          </div>
          <div className="info-item">
            <i className="fas fa-calendar-alt"></i>
            <h3>Title Event</h3>
            <p>8 Rounds</p>
          </div>
          <div className="info-item">
            <i className="fas fa-calendar-alt"></i>
            <h3>Rolling Events</h3>
            <p>5</p>
          </div>


        </div>
      </section>

      {/* Restricted Particles Effect Section */}
      <section className="details-section">
     
        <div className="particles-wrapper">
          <ParticlesComponent />
        </div>

        <div className="details-content">
          <img src={poster} alt="Left Image" className="details-image" />
        </div>
        <div className="pos">
        <div className="details-text">
          <h2>Excellia'24</h2>
          <p>PDA proudly presents the MEGA EVENT, Excellia'24 for the year 2024 in association with AUSEC, CSMIT, MIT Robotics Association, Photo Society of MIT, Quiz Club MIT, Tamil Mandram, TED Club of MIT, The MIT Quill, QuantuMMIT, MIT Variety Team, VIBEZ, MIT Museum, BRC MIT, The Box Office, Metrological club</p>
          <button className="details-button"><Link to="/Event">Register</Link></button>
        </div>
        </div>
      </section>

      {/* <section className="cards-section">
        <h3>In Association With</h3>
        <div className="cards">
          {imageData.map((item, index) => (
            <div className="card" key={index}>
              <img src={item.src} alt={item.title} />
              <h3>{item.title}</h3>
            </div>
          ))}
        </div>
      </section> */}

      <footer>
        <div className="footer-section">
          <p>© 2024 Excellia. All rights reserved.</p></div>
      </footer>
    </div>
  );
};

export default Excellia;
