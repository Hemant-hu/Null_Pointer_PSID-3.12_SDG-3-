import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Newpatient.css';
import api from '../api/api';

const NewPatient = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        patientName: '',
        Gender: '', // 1=male, 2=female
        Age: '',
        Arrival: '', // 1=walk, 2=wheelchair, 3=stretcher, 4=ambulance
        Injury: '', // 1=trauma, 2=medical, 3=surgical, 4=other
        Symptoms: '',
        Mental: '', // 1=alert, 2=confused, 3=drowsy, 4=unresponsive
        Pain: '', // 1=yes, 0=no
        Pain_Score: '', // 0-10
        SBP: '',
        DBP: '',
        HR: '',
        RR: '',
        BT: '',
        SpO2: '',
        contactNumber: '',
        emergencyContact: '',
        address: '',
        medicalHistory: '',
        allergies: '',
        currentMedications: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showPriority, setShowPriority] = useState(false);
    const [priorityScore, setPriorityScore] = useState(null);
    const [priorityLevel, setPriorityLevel] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Calculate priority score based on backend criteria
    const calculatePriorityScore = () => {
        let score = 0;

        // Convert form data to numbers
        const age = parseInt(formData.Age) || 0;
        const gender = parseInt(formData.Gender) || 1;
        const arrival = parseInt(formData.Arrival) || 1;
        const injury = parseInt(formData.Injury) || 1;
        const mental = parseInt(formData.Mental) || 1;
        const pain = parseInt(formData.Pain) || 0;
        const painScore = parseInt(formData.Pain_Score) || 0;
        const sbp = parseInt(formData.SBP) || 120;
        const dbp = parseInt(formData.DBP) || 80;
        const hr = parseInt(formData.HR) || 80;
        const rr = parseInt(formData.RR) || 18;
        const temp = parseFloat(formData.BT) || 37;
        const spo2 = parseInt(formData.SpO2) || 98;

        // Age factor
        if (age > 65) score += 2;
        if (age > 75) score += 3;

        // Gender factor (2=female gets +1)
        if (gender === 2) score += 1;

        // Arrival method (higher number = more urgent)
        if (arrival === 2) score += 1; // wheelchair
        if (arrival === 3) score += 2; // stretcher
        if (arrival === 4) score += 3; // ambulance

        // Injury type
        if (injury === 1) score += 3; // trauma
        if (injury === 2) score += 2; // medical
        if (injury === 3) score += 2; // surgical
        if (injury === 4) score += 1; // other

        // Symptoms severity
        const symptoms = formData.Symptoms.toLowerCase();
        if (symptoms.includes('chest pain')) score += 3;
        if (symptoms.includes('shortness of breath') || symptoms.includes('breath')) score += 3;
        if (symptoms.includes('bleeding') || symptoms.includes('bleed')) score += 4;
        if (symptoms.includes('unconscious')) score += 5;

        // Mental status
        if (mental === 2) score += 2; // confused
        if (mental === 3) score += 3; // drowsy
        if (mental === 4) score += 5; // unresponsive

        // Pain presence
        if (pain === 1) score += 2;

        // Pain score (0-10)
        if (painScore >= 7) score += 3;
        else if (painScore >= 4) score += 2;
        else if (painScore > 0) score += 1;

        // Vital signs scoring
        // Blood pressure
        if (sbp > 180 || sbp < 90) score += 3;
        else if (sbp > 160 || sbp < 100) score += 2;

        if (dbp > 110 || dbp < 60) score += 3;
        else if (dbp > 100 || dbp < 70) score += 2;

        // Heart rate
        if (hr > 120 || hr < 50) score += 3;
        else if (hr > 100 || hr < 60) score += 2;

        // Respiratory rate
        if (rr > 30 || rr < 12) score += 3;
        else if (rr > 25 || rr < 14) score += 2;

        // Temperature
        if (temp > 39 || temp < 36) score += 3;
        else if (temp > 38 || temp < 36.5) score += 2;

        // Oxygen saturation
        if (spo2 < 90) score += 4;
        else if (spo2 < 95) score += 2;

        return score;
    };

    const determinePriorityLevel = (score) => {
        if (score >= 20) return 'CRITICAL';
        if (score >= 15) return 'HIGH';
        if (score >= 10) return 'MEDIUM';
        return 'LOW';
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // Calculate score and level
            const score = calculatePriorityScore();
            const level = determinePriorityLevel(score);

            // Prepare data for backend
            const patientData = {
                patientName: formData.patientName,
                Gender: parseInt(formData.Gender) || 1,
                Age: parseInt(formData.Age) || 0,
                Arrival: parseInt(formData.Arrival) || 1,
                Injury: parseInt(formData.Injury) || 1,
                Symptoms: formData.Symptoms,
                Mental: parseInt(formData.Mental) || 1,
                Pain: parseInt(formData.Pain) || 0,
                Pain_Score: parseInt(formData.Pain_Score) || 0,
                SBP: parseInt(formData.SBP) || 0,
                DBP: parseInt(formData.DBP) || 0,
                HR: parseInt(formData.HR) || 0,
                RR: parseInt(formData.RR) || 0,
                BT: parseFloat(formData.BT) || 0,
                SpO2: parseInt(formData.SpO2) || 0,
                contactNumber: formData.contactNumber,
                emergencyContact: formData.emergencyContact,
                address: formData.address,
                medicalHistory: formData.medicalHistory,
                allergies: formData.allergies,
                currentMedications: formData.currentMedications,
                priorityScore: score,
                priorityLevel: level
            };

            const response = await api.post('/patients/register', patientData);

            // ✅ Show backend success message
            alert(response.data.message || 'Patient registered successfully!');

            if (response.data.success || response.data.priorityScore) {
                setPriorityScore(response.data.priorityScore || score);
                setPriorityLevel(response.data.priorityLevel || level);
                setShowPriority(true);
            }

        } catch (error) {
            console.error('Patient registration failed:', error);

            // ❌ Get backend error message safely
            const errorMessage =
                error.response?.data?.message ||
                error.response?.data?.error ||
                "Failed to register patient. Please try again.";

            alert(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleNewRegistration = () => {
        setShowPriority(false);
        setFormData({
            patientName: '',
            Gender: '',
            Age: '',
            Arrival: '',
            Injury: '',
            Symptoms: '',
            Mental: '',
            Pain: '',
            Pain_Score: '',
            SBP: '',
            DBP: '',
            HR: '',
            RR: '',
            BT: '',
            SpO2: '',
            contactNumber: '',
            emergencyContact: '',
            address: '',
            medicalHistory: '',
            allergies: '',
            currentMedications: ''
        });
        setPriorityScore(null);
        setPriorityLevel('');
    };

    const getPriorityColor = (score) => {
        const level = determinePriorityLevel(score);
        if (level === 'CRITICAL') return '#d32f2f';
        if (level === 'HIGH') return '#ff9800';
        if (level === 'MEDIUM') return '#2196f3';
        return '#4caf50';
    };

    const getExpectedAction = (level) => {
        if (level === 'CRITICAL') return 'Immediate Emergency Care - Direct to ICU';
        if (level === 'HIGH') return 'Urgent Care - See within 30 minutes';
        if (level === 'MEDIUM') return 'Standard Care - See within 2 hours';
        return 'Non-Urgent - See within 4 hours';
    };

    const getDisplayValue = (value) => {
        // Convert numeric values to display labels
        if (value === '1') return 'Male';
        if (value === '2') return 'Female';

        if (value === '1') return 'Walk-in';
        if (value === '2') return 'Wheelchair';
        if (value === '3') return 'Stretcher';
        if (value === '4') return 'Ambulance';

        if (value === '1') return 'Trauma';
        if (value === '2') return 'Medical';
        if (value === '3') return 'Surgical';
        if (value === '4') return 'Other';

        if (value === '1') return 'Alert';
        if (value === '2') return 'Confused';
        if (value === '3') return 'Drowsy';
        if (value === '4') return 'Unresponsive';

        if (value === '1') return 'Yes';
        if (value === '0') return 'No';

        return value;
    };

    return (
        <div className="new-patient-container">

            <div className="patient-header">
                <h1>
                    <span className="header-icon">👤</span>
                    Register New Patient
                </h1>
                <p className="header-subtitle">
                    Fill in patient details. Triage system will automatically assign priority.
                </p>
            </div>

            {showPriority && priorityScore !== null ? (
                <div className="priority-result">
                    <div className="result-card">
                        <div className="result-header">
                            <div className="success-icon">✅</div>
                            <h2>Patient Registered Successfully!</h2>
                            <p>Triage system has analyzed the patient's condition and assigned priority.</p>
                        </div>

                        <div className="priority-details">
                            <div className="priority-score">
                                <div
                                    className="score-circle"
                                    style={{ backgroundColor: getPriorityColor(priorityScore) }}
                                >
                                    <span className="score-number">{priorityScore}</span>
                                    <span className="score-label">TRIAGE SCORE</span>
                                </div>
                                <div className="priority-info">
                                    <h3 style={{ color: getPriorityColor(priorityScore) }}>
                                        {priorityLevel} PRIORITY
                                    </h3>
                                    <p className="action-text">{getExpectedAction(priorityLevel)}</p>
                                    <div className="patient-summary">
                                        <p><strong>Patient:</strong> {formData.patientName}</p>
                                        <p><strong>Age:</strong> {formData.Age} years</p>
                                        <p><strong>Gender:</strong> {getDisplayValue(formData.Gender)}</p>
                                        <p><strong>Symptoms:</strong> {formData.Symptoms}</p>
                                        <p><strong>Vitals:</strong> BP: {formData.SBP}/{formData.DBP}, HR: {formData.HR}, SpO2: {formData.SpO2}%</p>
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
                                            <p>
                                                {priorityLevel === 'CRITICAL' ? 'Immediate' :
                                                    priorityLevel === 'HIGH' ? '30 mins' :
                                                        priorityLevel === 'MEDIUM' ? '2 hours' : '4 hours'}
                                            </p>
                                            <span className="step-status">Calculated</span>
                                        </div>
                                    </div>
                                    <div className="step">
                                        <div className="step-icon">🛏️</div>
                                        <div className="step-content">
                                            <h4>Bed Availability</h4>
                                            <p>{priorityLevel === 'CRITICAL' ? 'ICU bed reserved' : 'Regular bed available'}</p>
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
                                <label htmlFor="Gender">
                                    Gender <span className="required">*</span>
                                </label>
                                <select
                                    id="Gender"
                                    name="Gender"
                                    value={formData.Gender}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select Gender</option>
                                    <option value="1">Male</option>
                                    <option value="2">Female</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="Arrival">
                                    Method of Arrival <span className="required">*</span>
                                </label>
                                <select
                                    id="Arrival"
                                    name="Arrival"
                                    value={formData.Arrival}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select Arrival Method</option>
                                    <option value="1">Walk-in</option>
                                    <option value="2">Wheelchair</option>
                                    <option value="3">Stretcher</option>
                                    <option value="4">Ambulance</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Clinical Information */}
                    <div className="form-section">
                        <h2 className="section-title">
                            <span className="section-icon">⚕️</span>
                            Clinical Information
                        </h2>
                        <div className="form-grid">
                            <div className="form-group">
                                <label htmlFor="Injury">
                                    Injury/Illness Type <span className="required">*</span>
                                </label>
                                <select
                                    id="Injury"
                                    name="Injury"
                                    value={formData.Injury}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select Type</option>
                                    <option value="1">Trauma</option>
                                    <option value="2">Medical</option>
                                    <option value="3">Surgical</option>
                                    <option value="4">Other</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="Mental">
                                    Mental Status <span className="required">*</span>
                                </label>
                                <select
                                    id="Mental"
                                    name="Mental"
                                    value={formData.Mental}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select Mental Status</option>
                                    <option value="1">Alert</option>
                                    <option value="2">Confused</option>
                                    <option value="3">Drowsy</option>
                                    <option value="4">Unresponsive</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="Pain">
                                    Pain Present? <span className="required">*</span>
                                </label>
                                <select
                                    id="Pain"
                                    name="Pain"
                                    value={formData.Pain}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select</option>
                                    <option value="1">Yes</option>
                                    <option value="0">No</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="Pain_Score">
                                    Pain Score (0-10)
                                </label>
                                <input
                                    type="number"
                                    id="Pain_Score"
                                    name="Pain_Score"
                                    value={formData.Pain_Score}
                                    onChange={handleChange}
                                    placeholder="0-10 scale"
                                    min="0"
                                    max="10"
                                />
                            </div>

                            <div className="form-group full-width">
                                <label htmlFor="Symptoms">
                                    Symptoms <span className="required">*</span>
                                </label>
                                <textarea
                                    id="Symptoms"
                                    name="Symptoms"
                                    value={formData.Symptoms}
                                    onChange={handleChange}
                                    placeholder="Describe symptoms in detail"
                                    rows="3"
                                    required
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
                                <label htmlFor="SBP">Systolic BP (SBP)</label>
                                <input
                                    type="number"
                                    id="SBP"
                                    name="SBP"
                                    value={formData.SBP}
                                    onChange={handleChange}
                                    placeholder="e.g., 120"
                                    min="0"
                                    max="300"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="DBP">Diastolic BP (DBP)</label>
                                <input
                                    type="number"
                                    id="DBP"
                                    name="DBP"
                                    value={formData.DBP}
                                    onChange={handleChange}
                                    placeholder="e.g., 80"
                                    min="0"
                                    max="200"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="HR">Heart Rate (HR)</label>
                                <input
                                    type="number"
                                    id="HR"
                                    name="HR"
                                    value={formData.HR}
                                    onChange={handleChange}
                                    placeholder="e.g., 72"
                                    min="0"
                                    max="250"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="RR">Respiratory Rate (RR)</label>
                                <input
                                    type="number"
                                    id="RR"
                                    name="RR"
                                    value={formData.RR}
                                    onChange={handleChange}
                                    placeholder="e.g., 18"
                                    min="0"
                                    max="60"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="BT">Body Temp (°C)</label>
                                <input
                                    type="number"
                                    id="BT"
                                    name="BT"
                                    value={formData.BT}
                                    onChange={handleChange}
                                    placeholder="e.g., 37.0"
                                    step="0.1"
                                    min="30"
                                    max="45"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="SpO2">Oxygen Saturation (SpO2)</label>
                                <input
                                    type="number"
                                    id="SpO2"
                                    name="SpO2"
                                    value={formData.SpO2}
                                    onChange={handleChange}
                                    placeholder="e.g., 98"
                                    min="0"
                                    max="100"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Contact Information */}
                    <div className="form-section">
                        <h2 className="section-title">
                            <span className="section-icon">📞</span>
                            Contact Information
                        </h2>
                        <div className="form-grid">
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

                            <div className="form-group">
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
                        </div>
                        <div className="form-group full-width">
                            <label htmlFor="address">Address</label>
                            <textarea
                                id="address"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                placeholder="Full residential address"
                                rows="2"
                            />
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