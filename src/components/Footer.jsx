import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>Nova Tax</h3>
          <p>Professional tax and accounting services you can trust.</p>
          <div className="social-links">
            <a href="https://www.linkedin.com/in/alibou-hamya/" target='_blank'><i className="fab fa-linkedin"></i></a>
            <a href="https://www.instagram.com/novataxllp/" target='_blank'><i className="fab fa-instagram"></i></a>
            {/* <a href="#"><i className="fab fa-facebook"></i></a> */}
          </div>
        </div>

        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About Us</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Services</h3>
          <ul>
            <li><a href="#tax-planning">Tax Planning</a></li>
            <li><a href="#tax-prep">Tax Preparation</a></li>
            <li><a href="#accounting">Accounting</a></li>
            <li><a href="#cfo">CFO Services</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Contact Info</h3>
          <ul className="contact-info">
            {/* <li><i className="fas fa-map-marker-alt"></i> 123 Business Avenue, Toronto</li> */}
            <li><i className="fas fa-phone"></i> +1 (613) 799-5909</li>
            <li><i className="fas fa-envelope"></i> ali@novatax.ca</li>
          </ul>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; 2025 Nova Tax LLP. All rights reserved. Site by Jinny K</p>
      </div>
    </footer>
  );
};

export default Footer; 