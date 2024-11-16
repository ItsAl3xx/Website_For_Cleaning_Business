import React from 'react';
import './service-page.css';
import { FaHome, FaBuilding, FaBroom, FaSprayCan, FaLeaf } from 'react-icons/fa';

const ServicesPage = () => {
  return (
    <div className="services-page">
      <div className="services-hero">
        <h1>Our Cleaning Services</h1>
        <p>Professional, personalized cleaning solutions for your space</p>
      </div>

      <section className="cleaning-types">
        <h2>What We Clean</h2>
        <div className="service-grid">
          <div className="service-card">
            <FaHome className="service-icon" />
            <h3>Homes</h3>
            <p>Complete house cleaning customized to your needs</p>
            <ul>
              <li>Single rooms or entire house</li>
              <li>Kitchen and bathrooms</li>
              <li>Living spaces</li>
              <li>Bedrooms</li>
            </ul>
            <button className="quote-btn">Get Quote</button>
          </div>

          <div className="service-card">
            <FaBuilding className="service-icon" />
            <h3>Apartments</h3>
            <p>Efficient cleaning for any size apartment</p>
            <ul>
              <li>Studio apartments</li>
              <li>Multi-room units</li>
              <li>Common living areas</li>
              <li>Balconies and patios</li>
            </ul>
            <button className="quote-btn">Get Quote</button>
          </div>

          <div className="service-card">
            <FaBroom className="service-icon" />
            <h3>Single Rooms</h3>
            <p>Focused cleaning for specific areas</p>
            <ul>
              <li>Individual bedrooms</li>
              <li>Kitchen deep clean</li>
              <li>Bathroom sanitizing</li>
              <li>Living room refresh</li>
            </ul>
            <button className="quote-btn">Get Quote</button>
          </div>

          <div className="service-card">
            <FaSprayCan className="service-icon" />
            <h3>Detail Cleaning</h3>
            <p>Thorough deep cleaning service</p>
            <ul>
              <li>Baseboards and trim</li>
              <li>Window sills and tracks</li>
              <li>Cabinet fronts and handles</li>
              <li>Light fixtures and fans</li>
            </ul>
            <button className="quote-btn">Get Quote</button>
          </div>
        </div>
      </section>

      <section className="cleaning-process">
        <h2>Our Approach</h2>
        <div className="process-container">
          <div className="process-card">
            <div className="step-number">1</div>
            <h3>Initial Assessment</h3>
            <p>We visit your space to understand your specific cleaning needs and provide an accurate quote</p>
          </div>
          <div className="process-card">
            <div className="step-number">2</div>
            <h3>Customized Plan</h3>
            <p>We create a cleaning plan tailored to your space and preferences</p>
          </div>
          <div className="process-card">
            <div className="step-number">3</div>
            <h3>Professional Cleaning</h3>
            <p>Thorough cleaning using either our natural products or your preferred supplies</p>
          </div>
          <div className="process-card">
            <div className="step-number">4</div>
            <h3>Final Inspection</h3>
            <p>We ensure everything meets our high standards and your expectations</p>
          </div>
        </div>
      </section>

      <section className="cleaning-features">
        <h2>Why Choose Our Service</h2>
        <div className="features-grid">
          <div className="feature-card">
            <FaLeaf className="feature-icon" />
            <h3>Natural Products</h3>
            <p>We prioritize eco-friendly, natural cleaning solutions that are safe for your family and pets</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔄</div>
            <h3>Flexible Options</h3>
            <p>Choose between our professional supplies or your preferred cleaning products</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⭐</div>
            <h3>Personalized Service</h3>
            <p>Cleaning solutions tailored to your specific needs and preferences</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📅</div>
            <h3>Free Consultation</h3>
            <p>On-site assessment and quote to ensure accurate pricing</p>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <h2>Ready to Get Started?</h2>
        <p>Book a consultation for your personalized cleaning quote</p>
        <button className="cta-button">Book Assessment</button>
      </section>
    </div>
  );
};

export default ServicesPage;
