import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ isLoggedIn, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        {/* Logo */}
        <Link to="/" className="nav-logo">
          <span className="logo-icon">🏥</span>
          <div className="logo-text">
            <h1>SmartCare Hospital</h1>
            <p className="logo-subtitle">AI-Powered Management System</p>
          </div>
        </Link>

        {/* Navigation Links */}
        <div className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          
          {isLoggedIn ? (
            <>
              <Link to="/new-patient" className="nav-link">New Patient</Link>
              <button onClick={handleLogout} className="nav-logout-btn">
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="nav-login-btn">
              Staff Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;