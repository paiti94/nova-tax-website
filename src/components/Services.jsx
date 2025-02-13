import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Services.css';

const Services = () => {
  const [selectedService, setSelectedService] = useState(null);
  const navigate = useNavigate();

  const services = [
    {
      id: 1,
      title: "Tax Planning",
      description: "We are specialized in developing tax strategies to assist our clients with minimizing their tax burden. Let our experts develop a tailored tax plan for you.",
      intro: "Our comprehensive tax planning services include:",
      icon: "📊",
      path: "/services/tax-planning",
      details: `Strategic tax minimization strategies
         Business structure optimization
         Investment tax planning
         Retirement tax planning
         Estate tax planning
         Tax-efficient wealth transfer strategies
         Regular tax law updates and adjustments
         Personalized tax calendars and reminders`
    },
    {
      id: 2,
      title: "Tax Prep & Accounting",
      description: "We are experienced in preparing a variety of tax returns and financial statements for individuals, businesses, partnerships, trusts, non-residents and more!",
      intro: "Our tax preparation and accounting services cover:",
      icon: "📑",
      path: "/services/tax-prep",
      details: `Personal tax returns
         Corporate tax returns
         Partnership returns
         Trust returns
         Non-resident tax returns
         Financial statement preparation
         Bookkeeping services
         GST/HST returns
         Payroll services
         CRA correspondence handling`
    },
    {
      id: 3,
      title: "Fractional CFO Services",
      description: "We provide fractional CFO services to elevate your financial strategy and help you thrive in today's dynamic business landscape.",
      intro: "Our fractional CFO services include:",
      icon: "💼",
      path: "/services/cfo-services",
      details: `Financial strategy development
         Cash flow management
         Budgeting and forecasting
         Financial reporting and analysis
         KPI development and tracking
         Business performance optimization
         Growth strategy planning
         Risk management
         Capital raising support
         Merger and acquisition advisory`
    }
  ];

  return (
    <section className="services" id="services">
      <h2>Our Services</h2>
      <div className="services-grid">
        {services.map(service => (
          <div className="service-card" key={service.id}>
            <div className="service-icon">{service.icon}</div>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
            <button 
              className="learn-more"
              onClick={() => setSelectedService(service)}
            >
              Learn More
            </button>
          </div>
        ))}
      </div>

      {selectedService && (
        <div className="modal-overlay" onClick={() => setSelectedService(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button 
              className="modal-close"
              onClick={() => setSelectedService(null)}
            >
              ×
            </button>
            <div className="modal-header">
              <div className="modal-icon">{selectedService.icon}</div>
              <h3>{selectedService.title}</h3>
            </div>
            <div className="modal-body">
              <p className="modal-description">{selectedService.description}</p>
              <p className="modal-intro">{selectedService.intro}</p>
              <div className="modal-details">
                {selectedService.details.split('\n').map((detail, index) => (
                  <p key={index}>{detail}</p>
                ))}
              </div>
              <button 
                className="modal-cta-button"
                onClick={() => {
                  setSelectedService(null);
                  navigate(selectedService.path);
                }}
              >
                Learn More About {selectedService.title}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Services; 