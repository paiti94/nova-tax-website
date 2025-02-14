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

  const API_KEY = import.meta.env.VITE_SMTP2GO_API_KEY;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const response = await fetch('https://api.smtp2go.com/v3/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          api_key: API_KEY,
          to: ["ali@novatax.ca"], // Send to your business email
          sender: "contact@novatax.ca",
          subject: `New Contact Form Submission from ${formData.name}`,
          text_body: `
            Name: ${formData.name}
            Email: ${formData.email}
            Phone: ${formData.phone}
            Message: ${formData.message}
          `,
          html_body: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${formData.name}</p>
            <p><strong>Email:</strong> ${formData.email}</p>
            <p><strong>Phone:</strong> ${formData.phone}</p>
            <p><strong>Message:</strong> ${formData.message}</p>
          `,
          custom_headers: [
            {
              header: "Reply-To",
              value: formData.email
            }
          ]
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json().catch(() => null);

      if (data && data.data && data.data.succeeded) {
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
          <h2>Get In Touch</h2>
          <p>We're here to help with all your tax and accounting needs</p>
          
          <div className="info-items">
            {/* <div className="info-item">
              <i className="fas fa-map-marker-alt"></i>
              <div>
                <h3>Location</h3>
                <p>123 Business Avenue, Toronto, ON M5V 2T6</p>
              </div>
            </div> */}
            
            <div className="info-item">
              <i className="fas fa-phone"></i>
              <div>
                <h3>Call or Text</h3>
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