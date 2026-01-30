import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import NewPatient from './pages/Newpatient';
import Header from './components/Header';
import './App.css';
import Footer from './components/Footer';
import DoctorPage from './pages/doctor';
import KTASTriageForm from './pages/New';
import Queue from './pages/Queue';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if user is already logged in on initial load
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <Router>
      <div className="App">
        <Header isLoggedIn={isLoggedIn} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route
            path="/new-patient"
            element={
              <PrivateRoute isLoggedIn={isLoggedIn}>
                {/* <NewPatient /> */}
                <KTASTriageForm />
              </PrivateRoute>
            }
          />
          <Route
            path="/doctor"
            element={
              <PrivateRoute isLoggedIn={isLoggedIn}>
                <DoctorPage />

              </PrivateRoute>
            }
          />
          <Route
            path="/queue"
            element={
              <PrivateRoute isLoggedIn={isLoggedIn}>
                <Queue />

              </PrivateRoute>
            }
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

// Private Route component to protect routes
function PrivateRoute({ isLoggedIn, children }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);

  if (!isLoggedIn) {
    return null;
  }

  return children;
}

export default App;