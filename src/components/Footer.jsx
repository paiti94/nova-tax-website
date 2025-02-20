import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../styles/Footer.css';

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/';

  const handleNavClick = (e, sectionId) => {
    e.preventDefault();
    
    if (!isHomePage) {
      navigate('/');
      setTimeout(() => {
        const element = document.querySelector(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.querySelector(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="footer">
      <div className="footer-container">
      <div className="footer-section desktop-only">
          <h3>Nova Tax</h3>
          <p>Professional tax and accounting services you can trust.</p>
          <div className="social-links">
            <a href="https://www.linkedin.com/in/alibou-hamya/" target='_blank'><i className="fab fa-linkedin"></i></a>
            <a href="https://www.instagram.com/novataxllp/" target='_blank'><i className="fab fa-instagram"></i></a>
          </div>
        </div>


        <div className="footer-section desktop-only">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="#home" onClick={(e) => handleNavClick(e, '#home')}>Home</a></li>
            <li><a href="#about" onClick={(e) => handleNavClick(e, '#about')}>About Us</a></li>
            <li><a href="#services" onClick={(e) => handleNavClick(e, '#services')}>Services</a></li>
            <li><a href="#contact" onClick={(e) => handleNavClick(e, '#contact')}>Contact</a></li>
          </ul>
        </div>

        <div className="footer-section desktop-only">
          <h3>Services</h3>
          <ul>
            <li><Link to="/services/tax-planning">Tax Planning</Link></li>
            <li><Link to="/services/tax-prep">Tax Preparation & Accounting</Link></li>
            <li><Link to="/services/cfo-services">Fractional CFO Services</Link></li>
          </ul>
        </div>

        <div className="footer-section desktop-only">
          <h3>Contact Info</h3>
          <ul className="contact-info">
            {/* <li><i className="fas fa-map-marker-alt"></i> 123 Business Avenue, Toronto</li> */}
            <li><i className="fas fa-phone"></i><a href="sms:+16137995909">+1 (613) 799-5909</a></li>
            <li><i className="fas fa-envelope"></i><a href="mailto:ali@novatax.ca">ali@novatax.ca</a></li>
          </ul>
        </div>

        <div className="footer-section mobile-only">
        <h3>Nova Tax</h3>
        <p>Professional tax and accounting services you can trust.</p>
            <div className="social-links">
                <a href="https://www.linkedin.com/in/alibou-hamya/" target='_blank'><i className="fab fa-linkedin"></i></a>
                <a href="https://www.instagram.com/novataxllp/" target='_blank'><i className="fab fa-instagram"></i></a>
            </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2025 Nova Tax LLP. All rights reserved. Site by Jinny K</p>
      </div>
    </footer>
  );
};

export default Footer; 