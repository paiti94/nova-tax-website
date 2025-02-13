import React from 'react';
import '../styles/ServicePage.css';
import { useNavigation } from '../hooks/useNavigation';

const TaxPrep = () => {
  const { handleNavClick } = useNavigation();

  return (
    <div className="service-page">
      <div className="service-hero">
        <h1>Tax Preparation & Accounting</h1>
        <p>Professional tax and accounting services for individuals and businesses</p>
      </div>
      
      <div className="service-content">
        <div className="service-intro">
          <h2>Comprehensive Tax & Accounting Solutions</h2>
          <p>We are experienced in preparing a variety of tax returns and financial statements for individuals, businesses, partnerships, trusts, non-residents and more!</p>
        </div>

        <div className="service-details">
          <div className="service-section">
            <h3>Our Services Include</h3>
            <ul>
              <li>Personal tax returns</li>
              <li>Corporate tax returns</li>
              <li>Partnership returns</li>
              <li>Trust returns</li>
              <li>Non-resident tax returns</li>
              <li>Financial statement preparation</li>
              <li>Bookkeeping services</li>
              <li>GST/HST returns</li>
              <li>Payroll services</li>
              <li>CRA correspondence handling</li>
            </ul>
          </div>

          <div className="service-section">
            <h3>Why Choose Our Services?</h3>
            <ul>
              <li>Experienced professionals</li>
              <li>Timely and accurate filing</li>
              <li>Maximum tax benefit identification</li>
              <li>Year-round support</li>
              <li>Clear communication and updates</li>
            </ul>
          </div>
        </div>

        <div className="cta-section">
          <h3>Ready to Get Started?</h3>
          <p>Contact us today for professional tax and accounting assistance</p>
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

export default TaxPrep; 