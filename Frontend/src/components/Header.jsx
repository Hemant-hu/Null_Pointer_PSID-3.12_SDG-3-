import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Header = ({ isLoggedIn, onLogout }) => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // ⭐ Fetch logged-in username from localStorage
    useEffect(() => {
        const storedName = localStorage.getItem('user'); // we stored only name
        console.log(storedName)
        if (storedName) {
            setUsername(storedName);
        }
    }, [isLoggedIn]);

    const handleLogout = () => {
        localStorage.removeItem('user'); // clear username
        setUsername('');
        setMobileMenuOpen(false);
        window.location.href = "/";
    };

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setMobileMenuOpen(false);
    };

    return (
        <>
            <nav className="navbar">
                <div className="nav-container">
                    {/* Logo */}
                    <Link to="/" className="nav-logo" onClick={closeMobileMenu}>
                        <span className="logo-icon"></span>
                        <div className="logo-text">
                            <h1>SmartCare Hospital</h1>
                            <p className="logo-subtitle">AI-Powered Management System</p>
                        </div>
                    </Link>

                    {/* Mobile Menu Toggle */}
                    <button
                        className={`mobile-toggle ${mobileMenuOpen ? 'active' : ''}`}
                        onClick={toggleMobileMenu}
                        aria-label="Toggle menu"
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>

                    {/* Navigation Links */}
                    <div className={`nav-links ${mobileMenuOpen ? 'active' : ''}`}>
                        <Link to="/" className="nav-link" onClick={closeMobileMenu}>
                            <span>🏠</span> Home
                        </Link>

                        {isLoggedIn ? (
                            <>
                                <span className="nav-username">Hello, {username}</span> {/* ⭐ Show username */}
                                <Link to="/new-patient" className="nav-link" onClick={closeMobileMenu}>
                                    <span>👨‍⚕️</span> New Patient
                                </Link>
                                <Link to="/doctor" className="nav-link" onClick={closeMobileMenu}>
                                    <span>💼</span> Doctors
                                </Link>
                                <Link to="/queue" className="nav-link" onClick={closeMobileMenu}>
                                    <span>📋</span> Check Queue
                                </Link>
                                <button onClick={handleLogout} className="nav-logout-btn">
                                    Logout
                                </button>
                            </>
                        ) : (
                            <Link to="/login" className="nav-login-btn" onClick={closeMobileMenu}>
                                <span>🔑</span> Staff Login
                            </Link>
                        )}
                    </div>
                </div>
            </nav>

            {/* Overlay for mobile menu */}
            <div
                className={`menu-overlay ${mobileMenuOpen ? 'active' : ''}`}
                onClick={closeMobileMenu}
            />
        </>
    );
};

export default Header;