import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import NewPatient from './pages/Newpatient';
import Header from './components/Header';
import './App.css';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/new-patient" element={<NewPatient />} />
        </Routes>
        <Footer />
      </div>
    </Router>

  );
}

export default App;