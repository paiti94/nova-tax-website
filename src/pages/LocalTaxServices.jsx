const LocalTaxServices = () => {
  return (
    <div className="service-page">
      <div className="service-header">
        <h1>Tax Return Services Near You | Canadian CPA Firm</h1>
        <p>Professional Tax Services Across Canada</p>
      </div>

      <div className="service-content">
        <section className="service-section">
          <h2>Local Tax Return Services Across Canada</h2>
          <p>Looking for reliable tax return services near you? Nova Tax provides convenient, local tax solutions for Canadians nationwide. Our tax experts are ready to help with all your tax needs, whether you're in Vancouver, Toronto, Montreal, or anywhere in Canada.</p>
          
          <div className="service-features">
            <div className="feature">
              <h3>Local Tax Return Experts</h3>
              <p>Professional tax preparation services in your area, with convenient access to experienced CPAs across Canada.</p>
            </div>
            
            <div className="feature">
              <h3>Nationwide Business Tax Services</h3>
              <p>Local tax planning and preparation for Canadian businesses, with personalized service in every province.</p>
            </div>
            
            <div className="feature">
              <h3>Your Local Tax Partner</h3>
              <p>Accessible tax expertise in your region, understanding provincial and federal tax requirements.</p>
            </div>
          </div>
        </section>

        <section className="service-section">
          <h2>Serving All Canadian Provinces</h2>
          <div className="provinces-grid">
            <div className="province">
              <h3>British Columbia</h3>
              <p>Vancouver, Victoria, Kelowna</p>
            </div>
            <div className="province">
              <h3>Ontario</h3>
              <p>Toronto, Ottawa, Mississauga</p>
            </div>
            <div className="province">
              <h3>Quebec</h3>
              <p>Montreal, Quebec City, Laval</p>
            </div>
            <div className="province">
              <h3>Alberta</h3>
              <p>Calgary, Edmonton, Red Deer</p>
            </div>
            {/* Add more provinces as needed */}
          </div>
        </section>

        <section className="service-section">
          <h2>Why Choose Nova Tax in Your Area?</h2>
          <ul>
            <li>Service available across all Canadian provinces</li>
            <li>Local tax experts who understand your provincial regulations</li>
            <li>Virtual and in-person consultations available</li>
            <li>Expertise in federal and provincial tax laws</li>
            <li>Flexible scheduling for your convenience</li>
          </ul>
        </section>
      </div>
    </div>
  );
}; 