import React from 'react';
import '../styles/ServicePage.css';
import { useNavigation } from '../hooks/useNavigation';

const CFOServices = () => {
  const { handleNavClick } = useNavigation();

  return (
    <div className="service-page">
      <div className="service-hero">
        <h1>Fractional CFO Services</h1>
        <p>Strategic financial leadership for your business growth</p>
      </div>
      
      <div className="service-content">
        <div className="service-intro">
          <h2>Strategic Financial Leadership</h2>
          <p>We provide fractional CFO services to elevate your financial strategy and help you thrive in today's dynamic business landscape.</p>
        </div>

        <div className="service-details">
          <div className="service-section">
            <h3>Our Services Include</h3>
            <ul>
              <li>Financial strategy development</li>
              <li>Cash flow management</li>
              <li>Budgeting and forecasting</li>
              <li>Financial reporting and analysis</li>
              <li>KPI development and tracking</li>
              <li>Business performance optimization</li>
              <li>Growth strategy planning</li>
              <li>Risk management</li>
              <li>Capital raising support</li>
              <li>Merger and acquisition advisory</li>
            </ul>
          </div>

          <div className="service-section">
            <h3>Benefits of Fractional CFO Services</h3>
            <ul>
              <li>Expert financial guidance without full-time costs</li>
              <li>Strategic financial planning and execution</li>
              <li>Improved decision-making with data-driven insights</li>
              <li>Enhanced financial controls and processes</li>
              <li>Scalable financial leadership</li>
            </ul>
          </div>
        </div>

        <div className="cta-section">
          <h3>Ready to Transform Your Financial Strategy?</h3>
          <p>Contact us to learn how our CFO services can benefit your business</p>
          <a 
            href="/#contact" 
            onClick={(e) => handleNavClick(e, '#contact')} 
            className="cta-button"
          >
            Get Started
          </a>
        </div>
      </div>
    </div>
  );
};

export default CFOServices; 