import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Check if we're on the home page
  const isHomePage = location.pathname === '/';

  // Check if we're on a service page
  const isServicePage = location.pathname.includes('/services/');

  // Function to handle navigation
  const handleNavClick = (e, sectionId) => {
    e.preventDefault();
    if (!isHomePage) {
      navigate('/' + sectionId);
    } else {
      const element = document.querySelector(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''} ${isServicePage ? 'service-page' : 'page'}`}>
      <div className="navbar-container">
        <div className="logo">
          <img 
            src={isServicePage || isScrolled ? "/public/assets/logo.png" : "/public/assets/logo_white.png"} 
            alt="Nova Tax" 
          />
        </div>
        
        <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          <a 
            href="/" 
            onClick={(e) => {
              e.preventDefault();
              if (!isHomePage) {
                navigate('/');
              } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
          >
            Home
          </a>
          <a href="/#about" onClick={(e) => handleNavClick(e, '#about')}>About Us</a>
          <div className="dropdown">
            <a href="/#services" onClick={(e) => handleNavClick(e, '#services')}>Services</a>
            <div className="dropdown-content">
              <Link to="/services/tax-planning">Tax Planning</Link>
              <Link to="/services/tax-prep">Tax Preparation & Accounting</Link>
              <Link to="/services/cfo-services">Fractional CFO Services</Link>
            </div>
          </div>
          <a href="/#contact" onClick={(e) => handleNavClick(e, '#contact')}>Contact Us</a>
        </div>
        
        <div className="hamburger" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 