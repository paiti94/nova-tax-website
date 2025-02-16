import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
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

  // Function to handle navigation and close menu
  const handleNavClick = (e, sectionId) => {
    e.preventDefault();
    setIsMenuOpen(false); // Close menu when nav link is clicked
    if (!isHomePage) {
      navigate('/' + sectionId);
    } else {
      const element = document.querySelector(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Function to handle service page navigation
  const handleServiceClick = (path) => {
    setIsMenuOpen(false); // Close menu when service link is clicked
    navigate(path);
  };

  const handleDropdownClick = (e) => {
    if (window.innerWidth <= 768) {
      e.preventDefault();
      setIsDropdownOpen(!isDropdownOpen);
    }
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''} ${isServicePage ? 'service-page' : 'page'}`}>
      <div className="navbar-container">
        <div className="logo">
            <a 
              href="/" 
              onClick={(e) => {
                e.preventDefault();
                setIsMenuOpen(false); // Close menu when logo is clicked
                if (!isHomePage) {
                  navigate('/');
                } else {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
            >
                <img 
                src={isServicePage || isScrolled ? "/assets/logo.png" : "/assets/logo_white.png"} 
                alt="Nova Tax" 
                />
            </a>
        </div>
        
        <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          <a 
            href="/" 
            onClick={(e) => {
              e.preventDefault();
              setIsMenuOpen(false); // Close menu when home is clicked
              if (!isHomePage) {
                navigate('/');
              } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
          >
            Home
          </a>
          <div className={`dropdown ${isDropdownOpen ? 'show' : ''}`}>
            <a 
              href="/#services" 
              onClick={(e) => {
                handleDropdownClick(e);
                if (window.innerWidth > 768) {
                  handleNavClick(e, '#services');
                }
              }}
            >
              Services
            </a>
            <div className="dropdown-content">
              <Link 
                to="/services/tax-planning" 
                onClick={() => {
                  setIsMenuOpen(false);
                  setIsDropdownOpen(false);
                }}
              >
                Tax Planning
              </Link>
              <Link 
                to="/services/tax-prep" 
                onClick={() => {
                  setIsMenuOpen(false);
                  setIsDropdownOpen(false);
                }}
              >
                Tax Preparation & Accounting
              </Link>
              <Link 
                to="/services/cfo-services" 
                onClick={() => {
                  setIsMenuOpen(false);
                  setIsDropdownOpen(false);
                }}
              >
                Fractional CFO Services
              </Link>
            </div>
          </div>
          <a href="/#about" onClick={(e) => handleNavClick(e, '#about')}>About Us</a>
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