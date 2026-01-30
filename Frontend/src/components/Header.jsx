import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Header = ({ isLoggedIn, onLogout }) => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');

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
        window.location.href = "/";
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
                            <span className="nav-username">Hello, {username}</span> {/* ⭐ Show username */}
                            <Link to="/new-patient" className="nav-link">New Patient</Link>
                            <Link to="/doctor" className="nav-link">Doctors</Link>
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

export default Header;
