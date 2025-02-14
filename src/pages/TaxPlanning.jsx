import React, { useEffect } from 'react';
import { useNavigation } from '../hooks/useNavigation';
import '../styles/ServicePage.css';
const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    // const headerOffset = 96; // This accounts for the fixed navbar height
    const headerOffset = 0;
    const elementPosition = contactSection.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  };
const TaxPlanning = () => {
  const { handleNavClick, navigate } = useNavigation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="service-page">
      <div className="service-hero">
        <h1>Tax Planning</h1>
        <p>Strategic tax solutions to minimize your tax burden</p>
      </div>
      
      <div className="service-content">
        <div className="service-intro">
          <h2>Comprehensive Tax Planning Services</h2>
          <p>We are specialized in developing tax strategies to assist our clients with minimizing their tax burden. Let our experts develop a tailored tax plan for you.</p>
        </div>

        <div className="service-details">
          <div className="service-section">
            <h3>Our Services Include</h3>
            <ul>
              <li>Strategic tax minimization strategies</li>
              <li>Business structure optimization</li>
              <li>Investment tax planning</li>
              <li>Retirement tax planning</li>
              <li>Estate tax planning</li>
              <li>Tax-efficient wealth transfer strategies</li>
              <li>Regular tax law updates and adjustments</li>
              <li>Personalized tax calendars and reminders</li>
            </ul>
          </div>

          <div className="service-section">
            <h3>Our Proactive Approach to Tax Planning Helps You</h3>
            <ul>
              <li>Minimize your tax liability legally and ethically</li>
              <li>Make informed financial decisions</li>
              <li>Plan for future tax implications</li>
              <li>Stay compliant with tax laws and regulations</li>
              <li>Achieve your financial goals more efficiently</li>
            </ul>
          </div>
        </div>

        <div className="cta-section">
          <h3>Ready to Optimize Your Tax Strategy?</h3>
          <p>Contact us today for a free consultation</p>
          <a 
            // href="/#contact" 
            onClick={(e) => handleNavClick(e, '#contact')} 
            // onClick={scrollToContact}
            style={{ cursor: 'pointer' }}
            className="cta-button"
          >
            Get Started
          </a>
        </div>
      </div>
    </div>
  );
};

export default TaxPlanning; 