import React, { useState } from 'react';
import '../styles/About.css';

const About = () => {
  const [imageSrc, setImageSrc] = useState('assets/profile.jpg'); // Default image

  const handleMouseEnter = () => {
    setImageSrc('assets/profile-hover.jpg'); // Image on hover
  };

  const handleMouseLeave = () => {
    setImageSrc('assets/profile.jpg'); // Default image
  };
  return (
    <section className="about" id="about">
      <div className="about-container">
        <div className="about-content">
          <h2>About Nova Tax</h2>
          <p className="subtitle">Your Success Is Our Priority</p>
          <div className="about-text">
            <p>We are a team of dedicated professionals committed to providing exceptional tax and accounting services. With years of experience and expertise, we help individuals and businesses navigate complex financial landscapes.</p>
            <p>Our approach combines traditional accounting principles with modern technology to deliver accurate, timely, and valuable financial insights.</p>
          </div>
          <div className="stats-container">
            <div className="stat-item">
              <h3>20+</h3>
              <p>Combined Years Experience</p>
            </div>
            <div className="stat-item">
              <h3>1,000+</h3>
              <p>Clients Served</p>
            </div>
            <div className="stat-item">
              <h3>5+</h3>
              <p>Certifications</p>
            </div>
          </div>
        </div>
        <div className="about-image">
          {/* <img src="/assets/profile.jpg" alt="Professional tax services" /> */}
          <img 
            src={imageSrc} 
            alt="Professional tax services" 
            onMouseEnter={handleMouseEnter} 
            onMouseLeave={handleMouseLeave} 
          />
          <p>Ali Bou-Hamya, CPA, MAcc | Tax Partner</p>
        </div>
      </div>
    </section>
  );
};

export default About; 