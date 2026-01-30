import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        
        {/* Main Footer Content */}
        <div className="footer-content">
          
          {/* Company Info */}
          <div className="footer-section company-info">
            <div className="footer-logo">
              <span className="footer-logo-icon">🏥</span>
              <div className="footer-logo-text">
                <h3>SmartCare Hospital</h3>
                <p>AI-Powered Healthcare Excellence</p>
              </div>
            </div>
            <p className="footer-description">
              Revolutionizing hospital management with artificial intelligence 
              for faster patient care and efficient resource utilization.
            </p>
            <div className="social-links">
              <a href="#" className="social-link">
                <span className="social-icon">📘</span>
              </a>
              <a href="#" className="social-link">
                <span className="social-icon">🐦</span>
              </a>
              <a href="#" className="social-link">
                <span className="social-icon">📷</span>
              </a>
              <a href="#" className="social-link">
                <span className="social-icon">💼</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section quick-links">
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/" className="footer-link">Home</Link></li>
              <li><Link to="/login" className="footer-link">Staff Login</Link></li>
              <li><Link to="/new-patient" className="footer-link">New Patient</Link></li>
              <li><a href="#" className="footer-link">Emergency Services</a></li>
              <li><a href="#" className="footer-link">Find a Doctor</a></li>
              <li><a href="#" className="footer-link">Appointments</a></li>
            </ul>
          </div>

          {/* Services */}
          <div className="footer-section services">
            <h4 className="footer-heading">Our Services</h4>
            <ul className="footer-links">
              <li><a href="#" className="footer-link">Emergency Care</a></li>
              <li><a href="#" className="footer-link">OPD Services</a></li>
              <li><a href="#" className="footer-link">ICU & Critical Care</a></li>
              <li><a href="#" className="footer-link">Diagnostics</a></li>
              <li><a href="#" className="footer-link">Surgery</a></li>
              <li><a href="#" className="footer-link">Maternity Care</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-section contact-info">
            <h4 className="footer-heading">Contact Us</h4>
            <ul className="contact-details">
              <li className="contact-item">
                <span className="contact-icon">📍</span>
                <div className="contact-text">
                  <p>123 Medical Street, Health District</p>
                  <p>Nagpur, Maharashtra - 440001</p>
                </div>
              </li>
              <li className="contact-item">
                <span className="contact-icon">📞</span>
                <div className="contact-text">
                  <p>Emergency: 108</p>
                  <p>Front Desk: 0712-1234567</p>
                </div>
              </li>
              <li className="contact-item">
                <span className="contact-icon">✉️</span>
                <div className="contact-text">
                  <p>info@smartcarehospital.com</p>
                  <p>support@smartcarehospital.com</p>
                </div>
              </li>
              <li className="contact-item">
                <span className="contact-icon">🕒</span>
                <div className="contact-text">
                  <p>Emergency: 24/7</p>
                  <p>OPD: 8:00 AM - 8:00 PM</p>
                </div>
              </li>
            </ul>
          </div>

        </div>

        {/* Divider */}
        <div className="footer-divider"></div>

        {/* Bottom Footer */}
        <div className="footer-bottom">
          <div className="copyright">
            <p>© {currentYear} SmartCare Hospital System. All rights reserved.</p>
            <p className="tagline">
              "A smart hospital system where patient priority, doctor assignment, 
              and bed availability are decided automatically using AI."
            </p>
          </div>
          
          <div className="footer-bottom-links">
            <a href="#" className="bottom-link">Privacy Policy</a>
            <a href="#" className="bottom-link">Terms of Service</a>
            <a href="#" className="bottom-link">Sitemap</a>
            <a href="#" className="bottom-link">Accessibility</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;