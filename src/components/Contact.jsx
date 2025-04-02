import React, { useState } from 'react';
import '../styles/Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Check the response structure based on your serverless function
      if (data.success) {
        setStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: ''
        });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('Error:', error);
      setStatus('error');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section className="contact" id="contact">
      <div className="contact-container">
        <div className="contact-info">
          <h2>Contact Your Tax Experts</h2>
          <p>Professional tax and accounting services serving across Canada</p>
          
          <div className="info-items">
            <div className="info-item">
              <i className="fas fa-phone"></i>
              <div>
                <h3>Contact</h3>
                <p><a href="sms:+16137995909">+1 (613) 799-5909</a></p>
              </div>
            </div>
            
            <div className="info-item">
              <i className="fas fa-envelope"></i>
              <div>
                <h3>Email</h3>
                <p><a href="mailto:ali@novatax.ca">ali@novatax.ca</a></p>
              </div>
            </div>
            
            <div className="info-item cpa-info">
              <img 
                src="/assets/cpa-logo.jpg" 
                alt="CPA Canada Member" 
                className="cpa-contact-logo"
              />
              {/* <div>
                <h3>Licensed CPA</h3>
                <p>Chartered Professional Accountant</p>
                <p>Member of CPA Canada</p>
              </div> */}
            </div>
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="tel"
              name="phone"
              placeholder="Your Phone"
              value={formData.phone}
              onChange={handleChange}
              required
              pattern="[0-9]{10}|[0-9]{11}"  // For 10 or 11 digit phone numbers
              title="Please enter a valid phone number"
            />
          </div>
          <div className="form-group">
            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <button 
            type="submit" 
            className="submit-button"
            disabled={status === 'sending'}
          >
            {status === 'sending' ? 'Sending...' : 'Send Message'}
          </button>

          {status === 'success' && (
            <div className="success-message">
              Thank you! Your message has been sent successfully.
            </div>
          )}
          
          {status === 'error' && (
            <div className="error-message">
              Sorry, something went wrong. Please try again later.
            </div>
          )}
        </form>
      </div>
    </section>
  );
};

export default Contact; 