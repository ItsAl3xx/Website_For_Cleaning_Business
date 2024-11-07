import React from 'react';
import './about-page.css';
import { FaAward, FaHandshake, FaHeart, FaLeaf, FaCheckCircle } from 'react-icons/fa';

const AboutPage = () => {
  return (
    <div className="about-page">
      <section className="about-hero">
        <h1>Transforming Spaces</h1>
        <p>Creating cleaner, healthier environments for over 10 years</p>
      </section>

      <section className="stats-grid">
        <div className="stat-item">
          <div className="stat-number">10+</div>
          <p>Years of Experience</p>
        </div>
        <div className="stat-item">
          <div className="stat-number">15K+</div>
          <p>Happy Customers</p>
        </div>
        <div className="stat-item">
          <div className="stat-number">99%</div>
          <p>Satisfaction Rate</p>
        </div>
      </section>

      <section className="about-story">
        <h2>Our Story</h2>
        <div className="story-content">
          <div className="story-text">
            <p>Founded in 2013, we began with a simple mission: to provide exceptional cleaning services that make a real difference in people's lives. Today, we're proud to be one of Los Angeles' most trusted cleaning services.</p>
            <p>Our team of certified professionals brings expertise, dedication, and attention to detail to every project. We've earned the trust of major companies like Google and Snapchat, while maintaining our commitment to providing personalized service to every client.</p>
            <ul className="achievements-list">
              <li><FaCheckCircle /> Certified Green Cleaning Company</li>
              <li><FaCheckCircle /> Award-winning Customer Service</li>
              <li><FaCheckCircle /> Fully Bonded and Insured</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="core-values">
        <h2>Our Core Values</h2>
        <div className="values-grid">
          <div className="value-card">
            <FaAward className="value-icon" />
            <h3>Excellence</h3>
            <p>Committed to delivering outstanding results with attention to detail</p>
          </div>
          <div className="value-card">
            <FaHandshake className="value-icon" />
            <h3>Reliability</h3>
            <p>Consistent, dependable service you can count on</p>
          </div>
          <div className="value-card">
            <FaHeart className="value-icon" />
            <h3>Care</h3>
            <p>Treating every space with respect and personal attention</p>
          </div>
          <div className="value-card">
            <FaLeaf className="value-icon" />
            <h3>Sustainability</h3>
            <p>Using eco-friendly products for a healthier environment</p>
          </div>
        </div>
      </section>

      <section className="team-section">
        <h2>Meet Our Leadership</h2>
        <div className="team-grid">
          <div className="team-member">
            <div className="team-photo-placeholder"></div>
            <h3>Sarah Johnson</h3>
            <p>Founder & CEO</p>
          </div>
          <div className="team-member">
            <div className="team-photo-placeholder"></div>
            <h3>Michael Chen</h3>
            <p>Operations Director</p>
          </div>
        </div>
      </section>

      <section className="about-approach">
        <h2>Our Approach</h2>
        <div className="approach-content">
          <div className="approach-card">
            <h3>Personalized Service</h3>
            <p>Every cleaning plan is tailored to your specific needs and preferences</p>
          </div>
          <div className="approach-card">
            <h3>Quality Products</h3>
            <p>Using professional-grade, eco-friendly cleaning solutions</p>
          </div>
          <div className="approach-card">
            <h3>Attention to Detail</h3>
            <p>Thorough cleaning with focus on often-overlooked areas</p>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <h2>Ready for a Spotless Space?</h2>
        <p>Get a free quote for your first cleaning service</p>
        <button className="cta-button">Get Your Free Quote</button>
      </section>
    </div>
  );
};

export default AboutPage;
