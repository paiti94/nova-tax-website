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

  // Check if we're on a blog page
  const isBlogPage = location.pathname.includes('/blog');

  // Add a new check for the checklist page
  const isChecklistPage = location.pathname.includes('/2024-checklist');

  // Function to handle navigation and close menu
  const handleNavClick = (e, sectionId) => {
    e.preventDefault();
    setIsMenuOpen(false);

    if (!isHomePage) {
      // If we're not on homepage, navigate and then scroll
      navigate('/');
      // Wait for navigation to complete before scrolling
      setTimeout(() => {
        const element = document.querySelector(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      // If we're already on homepage, just scroll
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

  const handleContactClick = (e) => {
    e.preventDefault();
    setIsMenuOpen(false);
    
    if (!isHomePage) {
      navigate('/#contact');
    }
    
    // Scroll to contact section
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
      
      // Focus on the first input field after scrolling
      setTimeout(() => {
        const firstInput = document.querySelector('.contact-form input[name="name"]');
        if (firstInput) {
          firstInput.focus();
        }
      }, 1000); // Wait for scroll to complete
    }
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''} ${
      isChecklistPage ? 'checklist-page' :
      isServicePage ? 'service-page' : 
      isBlogPage ? 'blog-page' : 'page'
    }`}>
      <div className="navbar-container">
        <div className="logo">
          <a 
            href="/" 
            onClick={(e) => {
              e.preventDefault();
              setIsMenuOpen(false);
              if (!isHomePage) {
                navigate('/');
                setTimeout(() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }, 100);
              } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
          >
            <img 
              src={
                isChecklistPage ? "/assets/logo_white.png" :
                isServicePage || (isScrolled && !isBlogPage) ? "/assets/logo.png" : 
                isBlogPage ? "/assets/logo.png" : "/assets/logo_white.png"
              } 
              alt="Nova Tax" 
            />
          </a>
        </div>
        
        <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          <a 
            href="/" 
            onClick={(e) => {
              e.preventDefault();
              setIsMenuOpen(false);
              if (!isHomePage) {
                navigate('/');
                setTimeout(() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }, 100);
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
          <Link 
            to="/blog" 
            onClick={() => {
              setIsMenuOpen(false);
              setTimeout(() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }, 100);
            }}
          >
            Blog
          </Link>
          {/* <a href="/#contact" onClick={handleContactClick}>Contact Us</a> */}
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