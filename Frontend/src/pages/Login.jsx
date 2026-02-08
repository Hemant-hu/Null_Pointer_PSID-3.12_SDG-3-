import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import api from "../api/api";

const Login = () => {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!name || !password) {
            setError("Please enter name and password");
            return;
        }

        try {
            setIsLoading(true);

            const response = await api.post("/login", { name: name.trim() });

            /**
             * Expected backend response:
             * {
             *   success: true,
             *   user: { name, role, _id }
             * }
             */

            if (response.data.success) {
                // Store only the name
                localStorage.setItem("user", response.data.user.name);

                console.log("Logged in username:", localStorage.getItem("user"));

                window.location.href = "/";
            } else {
                setError("Invalid name or password");
            }

        } catch (err) {
            setError(err.response?.data?.message || "Server not responding");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="login-header">
                    <div className="login-logo">
                        <h2>Staff Login</h2>
                    </div>
                    <p className="login-subtitle">
                        Access the Hospital Management System
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="login-form">
                    {error && <div className="error-message">⚠️ {error}</div>}

                    {/* Name */}
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter your name"
                            disabled={isLoading}
                            required
                        />
                    </div>

                    {/* Password */}
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            disabled={isLoading}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="login-btn"
                        disabled={isLoading}
                    >
                        {isLoading ? "Logging in..." : "Login"}
                    </button>

                    <div className="demo-info">
                        <p>
                            Demo: <strong>Anita Verma</strong> / <strong>123456</strong>
                        </p>
                    </div>
                </form>

                <div className="login-footer">
                   <a href="/">← Back to Home</a>
                </div>
            </div>
        </div>
    );
};

export default Login;