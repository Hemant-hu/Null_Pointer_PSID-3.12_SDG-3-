import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>SmartCare Hospital Management System</h1>
          <p className="hero-subtitle">
            AI-powered system for automatic patient priority assignment,
            doctor matching, and bed availability management
          </p>

          <div className="hero-actions">
            <Link to="/login" className="hero-btn primary">
              Staff Login
            </Link>
            <Link to="/new-patient" className="hero-btn secondary">
              Register Patient
            </Link>
          </div>
        </div>
        <div className="hero-image">
          <div className="hospital-visual">
            <div className="visual-icon">🏥</div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="workflow-section">
        <h2>How Our System Works</h2>
        <div className="workflow-steps">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Patient Registration</h3>
            <p>Staff enters patient details and symptoms</p>
          </div>
          <div className="step-arrow">→</div>
          <div className="step">
            <div className="step-number">2</div>
            <h3>AI Priority Assignment</h3>
            <p>System assigns priority level (0-200)</p>
          </div>
          <div className="step-arrow">→</div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>Doctor Allocation</h3>
            <p>Automatic matching with specialists</p>
          </div>
          <div className="step-arrow">→</div>
          <div className="step">
            <div className="step-number">4</div>
            <h3>Bed Management</h3>
            <p>Real-time availability checking</p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="features-section">
        <h2>Key Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>Fast Triage</h3>
            <p>AI determines patient priority instantly</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🤖</div>
            <h3>Smart Matching</h3>
            <p>Automatic doctor-patient matching</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Real-time Monitoring</h3>
            <p>Live bed availability and resource tracking</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">👥</div>
            <h3>Queue Management</h3>
            <p>Reduced waiting times and confusion</p>
          </div>
        </div>
      </section>

      {/* Hospital Info */}
      <section className="hospital-info">
        <div className="info-card">
          <h2>📍 Hospital Location</h2>
          <p><strong>SmartCare General Hospital</strong></p>
          <p>123 Medical Street, Health District</p>
          <p>Nagpur, Maharashtra - 440001</p>
          <div className="contact-info">
            <p>📞 Emergency: 108</p>
            <p>📞 Front Desk: 0712-1234567</p>
            <p>✉️ info@smartcarehospital.com</p>
          </div>
        </div>
        <div className="info-card">
          <h2>⏰ Operating Hours</h2>
          <div className="hours-list">
            <div className="hour-item">
              <span>Emergency Department</span>
              <span className="highlight">24/7</span>
            </div>
            <div className="hour-item">
              <span>Outpatient Department</span>
              <span>8:00 AM - 8:00 PM</span>
            </div>
            <div className="hour-item">
              <span>Patient Registration</span>
              <span>7:30 AM onwards</span>
            </div>
            <div className="hour-item">
              <span>Consultation</span>
              <span>9:00 AM - 7:00 PM</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <h2>Ready to Streamline Hospital Operations?</h2>
        <p>Login to access the AI-powered patient management system</p>
        <Link to="/login" className="cta-btn">
          Staff Login →
        </Link>
      </section>
    </div>
  );
};

export default Home;