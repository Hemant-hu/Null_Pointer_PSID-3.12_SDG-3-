import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './NewPatient.css';

const NewPatient = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    patientName: '',
    age: '',
    gender: '',
    contactNumber: '',
    emergencyContact: '',
    address: '',
    symptoms: '',
    severity: 'medium',
    vitals: {
      bloodPressure: '',
      temperature: '',
      heartRate: '',
      oxygenLevel: ''
    },
    medicalHistory: '',
    allergies: '',
    currentMedications: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPriority, setShowPriority] = useState(false);
  const [priorityScore, setPriorityScore] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleVitalsChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      vitals: {
        ...prev.vitals,
        [name]: value
      }
    }));
  };

  // Calculate priority score
  const calculatePriorityScore = () => {
    let score = 50;
    
    // Age factor
    const age = parseInt(formData.age) || 0;
    if (age > 60) score += 20;
    if (age > 80) score += 10;
    
    // Symptom severity
    if (formData.severity === 'high') score += 40;
    if (formData.severity === 'critical') score += 70;
    if (formData.severity === 'low') score -= 20;
    
    // Specific symptoms
    const symptoms = formData.symptoms.toLowerCase();
    if (symptoms.includes('chest')) score += 30;
    if (symptoms.includes('breath')) score += 25;
    if (symptoms.includes('bleed')) score += 35;
    if (symptoms.includes('unconscious')) score += 50;
    
    // Vitals factors
    const hr = parseInt(formData.vitals.heartRate) || 80;
    if (hr < 60 || hr > 100) score += 15;
    
    const temp = parseFloat(formData.vitals.temperature) || 98.6;
    if (temp > 100) score += 10;
    
    const oxygen = parseInt(formData.vitals.oxygenLevel) || 98;
    if (oxygen < 95) score += 20;
    if (oxygen < 90) score += 30;
    
    // Ensure score is between 0-200
    score = Math.max(0, Math.min(200, score));
    
    return Math.round(score);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      const score = calculatePriorityScore();
      setPriorityScore(score);
      setShowPriority(true);
      setIsSubmitting(false);
      
      console.log('New patient registered:', formData);
      console.log('AI Priority Score:', score);
    }, 1500);
  };

  const handleNewRegistration = () => {
    setShowPriority(false);
    setFormData({
      patientName: '',
      age: '',
      gender: '',
      contactNumber: '',
      emergencyContact: '',
      address: '',
      symptoms: '',
      severity: 'medium',
      vitals: {
        bloodPressure: '',
        temperature: '',
        heartRate: '',
        oxygenLevel: ''
      },
      medicalHistory: '',
      allergies: '',
      currentMedications: ''
    });
  };

  const getPriorityColor = (score) => {
    if (score >= 150) return '#d32f2f'; // Critical
    if (score >= 100) return '#ff9800'; // High
    if (score >= 50) return '#2196f3';  // Medium
    return '#4caf50';                  // Low
  };

  const getPriorityLevel = (score) => {
    if (score >= 150) return 'CRITICAL';
    if (score >= 100) return 'HIGH';
    if (score >= 50) return 'MEDIUM';
    return 'LOW';
  };

  const getExpectedAction = (score) => {
    if (score >= 150) return 'Immediate Emergency Care - Direct to ICU';
    if (score >= 100) return 'Urgent Care - See within 30 minutes';
    if (score >= 50) return 'Standard Care - See within 2 hours';
    return 'Non-Urgent - See within 4 hours';
  };

  return (
    <div className="new-patient-container">
      <div className="patient-header">
        <h1>
          <span className="header-icon">👤</span>
          Register New Patient
        </h1>
        <p className="header-subtitle">
          Fill in patient details. AI will automatically assign priority and match with appropriate doctor.
        </p>
      </div>

      {showPriority && priorityScore !== null ? (
        <div className="priority-result">
          <div className="result-card">
            <div className="result-header">
              <div className="success-icon">✅</div>
              <h2>Patient Registered Successfully!</h2>
              <p>AI has analyzed the patient's condition and assigned priority.</p>
            </div>

            <div className="priority-details">
              <div className="priority-score">
                <div 
                  className="score-circle"
                  style={{ backgroundColor: getPriorityColor(priorityScore) }}
                >
                  <span className="score-number">{priorityScore}</span>
                  <span className="score-label">PRIORITY SCORE</span>
                </div>
                <div className="priority-info">
                  <h3 style={{ color: getPriorityColor(priorityScore) }}>
                    {getPriorityLevel(priorityScore)} PRIORITY
                  </h3>
                  <p className="action-text">{getExpectedAction(priorityScore)}</p>
                  <div className="patient-summary">
                    <p><strong>Patient:</strong> {formData.patientName}</p>
                    <p><strong>Age:</strong> {formData.age} years</p>
                    <p><strong>Symptoms:</strong> {formData.symptoms}</p>
                  </div>
                </div>
              </div>

              <div className="next-steps">
                <h3>📋 Next Steps</h3>
                <div className="steps-grid">
                  <div className="step">
                    <div className="step-icon">👨‍⚕️</div>
                    <div className="step-content">
                      <h4>Doctor Assignment</h4>
                      <p>Patient matched with available specialist</p>
                      <span className="step-status">Pending</span>
                    </div>
                  </div>
                  <div className="step">
                    <div className="step-icon">⏱️</div>
                    <div className="step-content">
                      <h4>Estimated Wait Time</h4>
                      <p>{priorityScore >= 150 ? 'Immediate' : priorityScore >= 100 ? '30 mins' : '2 hours'}</p>
                      <span className="step-status">Calculated</span>
                    </div>
                  </div>
                  <div className="step">
                    <div className="step-icon">🛏️</div>
                    <div className="step-content">
                      <h4>Bed Availability</h4>
                      <p>{priorityScore >= 150 ? 'ICU bed reserved' : 'Regular bed available'}</p>
                      <span className="step-status">Checked</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="result-actions">
                <button 
                  className="new-btn"
                  onClick={handleNewRegistration}
                >
                  📝 Register Another Patient
                </button>
                <button 
                  className="home-btn"
                  onClick={() => navigate('/')}
                >
                  🏠 Back to Home
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <form className="patient-form" onSubmit={handleSubmit}>
          {/* Basic Information */}
          <div className="form-section">
            <h2 className="section-title">
              <span className="section-icon">📋</span>
              Basic Information
            </h2>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="patientName">
                  Full Name <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="patientName"
                  name="patientName"
                  value={formData.patientName}
                  onChange={handleChange}
                  placeholder="Enter patient's full name"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="age">
                  Age <span className="required">*</span>
                </label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  placeholder="Age in years"
                  min="0"
                  max="120"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="gender">
                  Gender <span className="required">*</span>
                </label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                  <option value="prefer-not-to-say">Prefer not to say</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="contactNumber">
                  Contact Number <span className="required">*</span>
                </label>
                <input
                  type="tel"
                  id="contactNumber"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  placeholder="10-digit mobile number"
                  pattern="[0-9]{10}"
                  required
                />
              </div>
            </div>
          </div>

          {/* Contact & Address */}
          <div className="form-section">
            <h2 className="section-title">
              <span className="section-icon">📞</span>
              Contact & Address
            </h2>
            <div className="form-grid">
              <div className="form-group full-width">
                <label htmlFor="emergencyContact">
                  Emergency Contact <span className="required">*</span>
                </label>
                <input
                  type="tel"
                  id="emergencyContact"
                  name="emergencyContact"
                  value={formData.emergencyContact}
                  onChange={handleChange}
                  placeholder="Emergency contact number"
                  required
                />
              </div>
              <div className="form-group full-width">
                <label htmlFor="address">Address</label>
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Full residential address"
                  rows="3"
                />
              </div>
            </div>
          </div>

          {/* Medical Information */}
          <div className="form-section">
            <h2 className="section-title">
              <span className="section-icon">⚕️</span>
              Medical Information
            </h2>
            <div className="form-grid">
              <div className="form-group full-width">
                <label htmlFor="symptoms">
                  Symptoms <span className="required">*</span>
                </label>
                <textarea
                  id="symptoms"
                  name="symptoms"
                  value={formData.symptoms}
                  onChange={handleChange}
                  placeholder="Describe symptoms in detail"
                  rows="4"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="severity">
                  Severity Level <span className="required">*</span>
                </label>
                <select
                  id="severity"
                  name="severity"
                  value={formData.severity}
                  onChange={handleChange}
                  required
                >
                  <option value="low">Low (Non-urgent)</option>
                  <option value="medium">Medium (Standard)</option>
                  <option value="high">High (Urgent)</option>
                  <option value="critical">Critical (Emergency)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Vitals */}
          <div className="form-section">
            <h2 className="section-title">
              <span className="section-icon">❤️</span>
              Vital Signs
            </h2>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="bloodPressure">Blood Pressure</label>
                <input
                  type="text"
                  id="bloodPressure"
                  name="bloodPressure"
                  value={formData.vitals.bloodPressure}
                  onChange={handleVitalsChange}
                  placeholder="e.g., 120/80"
                />
              </div>

              <div className="form-group">
                <label htmlFor="temperature">Temperature (°F)</label>
                <input
                  type="number"
                  id="temperature"
                  name="temperature"
                  value={formData.vitals.temperature}
                  onChange={handleVitalsChange}
                  placeholder="e.g., 98.6"
                  step="0.1"
                />
              </div>

              <div className="form-group">
                <label htmlFor="heartRate">Heart Rate (BPM)</label>
                <input
                  type="number"
                  id="heartRate"
                  name="heartRate"
                  value={formData.vitals.heartRate}
                  onChange={handleVitalsChange}
                  placeholder="e.g., 72"
                />
              </div>

              <div className="form-group">
                <label htmlFor="oxygenLevel">Oxygen Level (%)</label>
                <input
                  type="number"
                  id="oxygenLevel"
                  name="oxygenLevel"
                  value={formData.vitals.oxygenLevel}
                  onChange={handleVitalsChange}
                  placeholder="e.g., 98"
                  min="0"
                  max="100"
                />
              </div>
            </div>
          </div>

          {/* Medical History */}
          <div className="form-section">
            <h2 className="section-title">
              <span className="section-icon">📖</span>
              Medical History
            </h2>
            <div className="form-grid">
              <div className="form-group full-width">
                <label htmlFor="medicalHistory">Past Medical History</label>
                <textarea
                  id="medicalHistory"
                  name="medicalHistory"
                  value={formData.medicalHistory}
                  onChange={handleChange}
                  placeholder="Any previous medical conditions"
                  rows="3"
                />
              </div>

              <div className="form-group">
                <label htmlFor="allergies">Allergies</label>
                <input
                  type="text"
                  id="allergies"
                  name="allergies"
                  value={formData.allergies}
                  onChange={handleChange}
                  placeholder="e.g., Penicillin, Pollen"
                />
              </div>

              <div className="form-group">
                <label htmlFor="currentMedications">Current Medications</label>
                <input
                  type="text"
                  id="currentMedications"
                  name="currentMedications"
                  value={formData.currentMedications}
                  onChange={handleChange}
                  placeholder="e.g., Aspirin, Insulin"
                />
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="form-actions">
            <button
              type="button"
              className="cancel-btn"
              onClick={() => navigate('/')}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="spinner"></span>
                  Processing...
                </>
              ) : (
                <>
                  <span className="submit-icon">✅</span>
                  Register Patient & Assign Priority
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default NewPatient;