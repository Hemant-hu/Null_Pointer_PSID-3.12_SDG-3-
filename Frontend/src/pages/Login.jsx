import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [staffId, setStaffId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    if (!staffId || !password) {
      setError('Please enter both Staff ID and Password');
      return;
    }

    setIsLoading(true);

    // Simple validation for demo
    setTimeout(() => {
      if (staffId === 'staff001' && password === 'password123') {
        navigate('/new-patient');
      } else {
        setError('Invalid credentials. Use staff001 / password123 for demo');
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="login-logo">
            <span className="logo-icon">🏥</span>
            <h2>Staff Login</h2>
          </div>
          <p className="login-subtitle">Access the Hospital Management System</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {error && (
            <div className="error-message">
              ⚠️ {error}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="staffId">Staff ID</label>
            <input
              type="text"
              id="staffId"
              value={staffId}
              onChange={(e) => setStaffId(e.target.value)}
              placeholder="Enter staff ID"
              required
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
              disabled={isLoading}
            />
          </div>

          <div className="form-options">
            <label className="checkbox-label">
              <input type="checkbox" />
              <span>Remember me</span>
            </label>
            <Link to="/forgot-password" className="forgot-link">
              Forgot Password?
            </Link>
          </div>

          <button 
            type="submit" 
            className="login-btn"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="spinner"></span>
                Logging in...
              </>
            ) : 'Login'}
          </button>

          <div className="demo-info">
            <p className="demo-label">Demo Credentials:</p>
            <p className="demo-credentials">
              <strong>Staff ID:</strong> staff001<br />
              <strong>Password:</strong> password123
            </p>
          </div>
        </form>

        <div className="login-footer">
          <Link to="/" className="back-link">
            ← Back to Home
          </Link>
        </div>
      </div>

      <div className="login-info">
        <h3>About the System</h3>
        <ul className="system-features">
          <li>✓ AI-powered patient priority assignment</li>
          <li>✓ Automatic doctor-patient matching</li>
          <li>✓ Real-time bed availability tracking</li>
          <li>✓ Queue management system</li>
          <li>✓ Patient history and records</li>
          <li>✓ Emergency case handling</li>
        </ul>
      </div>
    </div>
  );
};

export default Login;