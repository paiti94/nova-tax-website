import React from 'react';
import '../styles/Hero.css';

const Hero = () => {
  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    const headerOffset = 96; // This accounts for the fixed navbar height
    const elementPosition = contactSection.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  };

  return (
    <section className="hero" id="home">
      <div className="hero-content">
        <h1>Your Trusted Tax Partner</h1>
        <p>As a full-service CPA firm, we are equipped to assist you with all of your accounting and tax needs.</p>
        <button 
          className="cta-button" 
          onClick={scrollToContact}
        >
          Get Free Consultation
        </button>
      </div>
      <div className="hero-overlay"></div>
    </section>
  );
};

export default Hero; 