import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const location = useLocation();
  
  // Check if current page is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="header">
      <div className="header-container">
        {/* Logo Section */}
        <div className="logo-section">
          <Link to="/" className="logo-link">
            <div className="logo-icon">🏥</div>
            <div className="logo-text">
              <h1 className="logo-title">SmartCare Hospital</h1>
              <p className="logo-subtitle">AI-Powered Management System</p>
            </div>
          </Link>
        </div>

        {/* Navigation Menu */}
        <nav className="nav-menu">
          <ul className="nav-list">
            <li className="nav-item">
              <Link 
                to="/" 
                className={`nav-link ${isActive('/') ? 'active' : ''}`}
              >
                <span className="nav-icon">🏠</span>
                <span className="nav-text">Home</span>
              </Link>
            </li>
            
            <li className="nav-item">
              <Link 
                to="/login" 
                className={`nav-link ${isActive('/login') ? 'active' : ''}`}
              >
                <span className="nav-icon">🔐</span>
                <span className="nav-text">Staff Login</span>
              </Link>
            </li>
            
            <li className="nav-item">
              <Link 
                to="/new-patient" 
                className={`nav-link ${isActive('/new-patient') ? 'active' : ''}`}
              >
                <span className="nav-icon">👤</span>
                <span className="nav-text">New Patient</span>
              </Link>
            </li>
          </ul>
        </nav>

        {/* Quick Actions */}
        <div className="header-actions">
          <div className="current-time">
            <span className="time-icon">🕒</span>
            <span className="time-text">
              {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
          
          <a href="tel:108" className="emergency-btn">
            <span className="emergency-icon">🚨</span>
            <span className="emergency-text">Emergency: 108</span>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button className="mobile-menu-btn">
          <span className="menu-bar"></span>
          <span className="menu-bar"></span>
          <span className="menu-bar"></span>
        </button>
      </div>

      {/* Mobile Menu (Hidden by default) */}
      <div className="mobile-menu">
        <ul className="mobile-nav-list">
          <li>
            <Link to="/" className="mobile-nav-link">
              <span className="mobile-nav-icon">🏠</span>
              Home
            </Link>
          </li>
          <li>
            <Link to="/login" className="mobile-nav-link">
              <span className="mobile-nav-icon">🔐</span>
              Staff Login
            </Link>
          </li>
          <li>
            <Link to="/new-patient" className="mobile-nav-link">
              <span className="mobile-nav-icon">👤</span>
              New Patient
            </Link>
          </li>
          <li>
            <a href="tel:108" className="mobile-nav-link emergency">
              <span className="mobile-nav-icon">🚨</span>
              Emergency Call
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;