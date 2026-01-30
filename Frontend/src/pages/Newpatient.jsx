import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './NewPatient.css';
import api from '../api/api';

const NewPatient = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        Sex: '',
        Age: '',
        Arrival_mode: '',
        Patients_number_per_hour: '',
        Injury: '',
        Chief_complain: '',
        Mental: '',
        Pain: '',
        NRS_pain: '',
        SBP: '',
        DBP: '',
        HR: '',
        RR: '',
        BT: '',
        Saturation: ''
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await api.post('/patients/register', formData);

            // ✅ Show backend success message
            alert(response.data.message);

            if (response.data.success) {
                setPriorityScore(response.data.priorityScore);
                setShowPriority(true);
            }

        } catch (error) {
            console.error('Patient registration failed:', error);

            // ❌ Get backend error message safely
            const errorMessage =
                error.response?.data?.message ||
                "Failed to register patient. Please try again.";

            alert(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleNewRegistration = () => {
        setShowPriority(false);
        setFormData({
            Sex: '',
            Age: '',
            Arrival_mode: '',
            Patients_number_per_hour: '',
            Injury: '',
            Chief_complain: '',
            Mental: '',
            Pain: '',
            NRS_pain: '',
            SBP: '',
            DBP: '',
            HR: '',
            RR: '',
            BT: '',
            Saturation: ''
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
                                        <p><strong>Chief Complain:</strong> {formData.Chief_complain}</p>
                                        <p><strong>Age:</strong> {formData.Age} years</p>
                                        <p><strong>Pain Level:</strong> {formData.NRS_pain}/10</p>
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
                                <label htmlFor="Sex">
                                    Sex <span className="required">*</span>
                                </label>
                                <select
                                    id="Sex"
                                    name="Sex"
                                    value={formData.Sex}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select Sex</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="Age">
                                    Age <span className="required">*</span>
                                </label>
                                <input
                                    type="number"
                                    id="Age"
                                    name="Age"
                                    value={formData.Age}
                                    onChange={handleChange}
                                    placeholder="Age in years"
                                    min="0"
                                    max="120"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="Arrival_mode">
                                    Arrival Mode <span className="required">*</span>
                                </label>
                                <select
                                    id="Arrival_mode"
                                    name="Arrival_mode"
                                    value={formData.Arrival_mode}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select Arrival Mode</option>
                                    <option value="walking">Walking</option>
                                    <option value="ambulance">Ambulance</option>
                                    <option value="wheelchair">Wheelchair</option>
                                    <option value="stretcher">Stretcher</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="Patients_number_per_hour">
                                    Patients per Hour
                                </label>
                                <input
                                    type="number"
                                    id="Patients_number_per_hour"
                                    name="Patients_number_per_hour"
                                    value={formData.Patients_number_per_hour}
                                    onChange={handleChange}
                                    placeholder="Number of patients"
                                    min="0"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Medical Condition */}
                    <div className="form-section">
                        <h2 className="section-title">
                            <span className="section-icon">⚕️</span>
                            Medical Condition
                        </h2>
                        <div className="form-grid">
                            <div className="form-group full-width">
                                <label htmlFor="Injury">
                                    Injury Type
                                </label>
                                <select
                                    id="Injury"
                                    name="Injury"
                                    value={formData.Injury}
                                    onChange={handleChange}
                                >
                                    <option value="">Select Injury Type</option>
                                    <option value="none">None</option>
                                    <option value="blunt">Blunt Trauma</option>
                                    <option value="penetrating">Penetrating Trauma</option>
                                    <option value="burn">Burn</option>
                                    <option value="fracture">Fracture</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>

                            <div className="form-group full-width">
                                <label htmlFor="Chief_complain">
                                    Chief Complain <span className="required">*</span>
                                </label>
                                <textarea
                                    id="Chief_complain"
                                    name="Chief_complain"
                                    value={formData.Chief_complain}
                                    onChange={handleChange}
                                    placeholder="Describe the main complain in detail"
                                    rows="3"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="Mental">
                                    Mental Status
                                </label>
                                <select
                                    id="Mental"
                                    name="Mental"
                                    value={formData.Mental}
                                    onChange={handleChange}
                                >
                                    <option value="">Select Status</option>
                                    <option value="alert">Alert</option>
                                    <option value="confused">Confused</option>
                                    <option value="drowsy">Drowsy</option>
                                    <option value="unresponsive">Unresponsive</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="Pain">
                                    Pain Present
                                </label>
                                <select
                                    id="Pain"
                                    name="Pain"
                                    value={formData.Pain}
                                    onChange={handleChange}
                                >
                                    <option value="">Select</option>
                                    <option value="yes">Yes</option>
                                    <option value="no">No</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="NRS_pain">
                                    NRS Pain (0-10)
                                </label>
                                <input
                                    type="number"
                                    id="NRS_pain"
                                    name="NRS_pain"
                                    value={formData.NRS_pain}
                                    onChange={handleChange}
                                    placeholder="0 to 10"
                                    min="0"
                                    max="10"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Vital Signs */}
                    <div className="form-section">
                        <h2 className="section-title">
                            <span className="section-icon">❤️</span>
                            Vital Signs
                        </h2>
                        <div className="form-grid">
                            <div className="form-group">
                                <label htmlFor="SBP">SBP (mmHg)</label>
                                <input
                                    type="number"
                                    id="SBP"
                                    name="SBP"
                                    value={formData.SBP}
                                    onChange={handleChange}
                                    placeholder="Systolic BP"
                                    min="50"
                                    max="250"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="DBP">DBP (mmHg)</label>
                                <input
                                    type="number"
                                    id="DBP"
                                    name="DBP"
                                    value={formData.DBP}
                                    onChange={handleChange}
                                    placeholder="Diastolic BP"
                                    min="30"
                                    max="150"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="HR">HR (BPM)</label>
                                <input
                                    type="number"
                                    id="HR"
                                    name="HR"
                                    value={formData.HR}
                                    onChange={handleChange}
                                    placeholder="Heart Rate"
                                    min="30"
                                    max="200"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="RR">RR (breaths/min)</label>
                                <input
                                    type="number"
                                    id="RR"
                                    name="RR"
                                    value={formData.RR}
                                    onChange={handleChange}
                                    placeholder="Respiratory Rate"
                                    min="8"
                                    max="40"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="BT">BT (°C)</label>
                                <input
                                    type="number"
                                    id="BT"
                                    name="BT"
                                    value={formData.BT}
                                    onChange={handleChange}
                                    placeholder="Body Temperature"
                                    min="30"
                                    max="45"
                                    step="0.1"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="Saturation">Saturation (%)</label>
                                <input
                                    type="number"
                                    id="Saturation"
                                    name="Saturation"
                                    value={formData.Saturation}
                                    onChange={handleChange}
                                    placeholder="O2 Saturation"
                                    min="50"
                                    max="100"
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