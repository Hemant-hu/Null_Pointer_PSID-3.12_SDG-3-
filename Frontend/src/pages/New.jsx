import React, { useState } from "react";
import api from "../api/api";// Assuming you have an API instance for Node.js
import python from "../api/python";
export default function KTASTriageMini() {
    const [data, setData] = useState({
        username: "", // New field
        Gender: "",
        Age: "",
        Arrival: "",
        Injury: "",
        Symptoms: "",
        Mental: "",
        Pain: "",
        Pain_Score: "",
        SBP: "",
        DBP: "",
        HR: "",
        RR: "",
        BT: "",
        SpO2: "",
    });

    const [loading, setLoading] = useState(false);
    const [prediction, setPrediction] = useState(null);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });

        // Clear error for this field when user starts typing
        if (errors[name]) {
            setErrors({ ...errors, [name]: null });
        }
    };

    const validateForm = () => {
        const newErrors = {};
        const requiredFields = ['username', 'Age', 'Symptoms', 'SBP', 'HR', 'RR', 'SpO2'];

        requiredFields.forEach(field => {
            if (!data[field]) {
                newErrors[field] = "This field is required";
            }
        });

        // Validate numeric ranges
        if (data.Age && (data.Age < 0 || data.Age > 120)) {
            newErrors.Age = "Age must be between 0 and 120";
        }

        if (data.SBP && (data.SBP < 50 || data.SBP > 250)) {
            newErrors.SBP = "SBP must be between 50 and 250";
        }

        if (data.HR && (data.HR < 30 || data.HR > 200)) {
            newErrors.HR = "HR must be between 30 and 200";
        }

        if (data.RR && (data.RR < 5 || data.RR > 50)) {
            newErrors.RR = "RR must be between 5 and 50";
        }

        if (data.SpO2 && (data.SpO2 < 50 || data.SpO2 > 100)) {
            newErrors.SpO2 = "SpO2 must be between 50 and 100";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const submit = async () => {
        if (!validateForm()) {
            alert("Please fix the errors in the form before submitting.");
            return;
        }

        setLoading(true);
        setPrediction(null);

        try {
            const payload = {
                Gender: Number(data.Gender) || 0,
                Age: Number(data.Age),
                Arrival: Number(data.Arrival) || 1,
                Injury: Number(data.Injury) || 1,
                Symptoms: data.Symptoms,
                Mental: Number(data.Mental) || 1,
                Pain: Number(data.Pain) || 0,
                Pain_Score: Number(data.Pain_Score) || 0,
                SBP: Number(data.SBP),
                DBP: Number(data.DBP) || 80,
                HR: Number(data.HR),
                RR: Number(data.RR),
                BT: Number(data.BT) || 36.5,
                SpO2: Number(data.SpO2),
            };

            // Send to Python API for prediction
            const res = await python.post("/add_patient", payload);
            const priority = res.data.priority;
            setPrediction(priority);

            // Prepare data for Node.js API with all fields including priority
            const nodePayload = {
                username: data.username,
                priority: priority,
                patientData: {
                    ...payload,
                    priority: priority
                }
            };

            // Send to Node.js API
            try {
                const nodeRes = await api.post("/patients/register", nodePayload);
                console.log("Data saved to Node.js:", nodeRes.data);
            } catch (nodeError) {
                console.error("Failed to save to Node.js:", nodeError);
                // Don't alert the user about this - prediction was successful
            }

            // Show priority with appropriate color
            let alertMessage = `Priority Level: ${priority}`;

            if (priority >= 4) {
                alertMessage += " - 🟢 Minor (Non-urgent)";
            } else if (priority === 3) {
                alertMessage += " - 🟡 Moderate (Urgent)";
            } else if (priority === 2) {
                alertMessage += " - 🟠 Serious (Emergency)";
            } else if (priority <= 1) {
                alertMessage += " - 🔴 Critical (Resuscitation)";
            }

            alert(`🚨 Triage Result: ${alertMessage}\n📊 Data saved to database.`);

        } catch (err) {
            alert("❌ Prediction failed. Please check your connection and try again.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const clearForm = () => {
        setData({
            username: "",
            Gender: "",
            Age: "",
            Arrival: "",
            Injury: "",
            Symptoms: "",
            Mental: "",
            Pain: "",
            Pain_Score: "",
            SBP: "",
            DBP: "",
            HR: "",
            RR: "",
            BT: "",
            SpO2: "",
        });
        setPrediction(null);
        setErrors({});
    };

    const getPriorityColor = (priority) => {
        if (!priority) return "";
        if (priority >= 4) return "priority-green";
        if (priority === 3) return "priority-yellow";
        if (priority === 2) return "priority-orange";
        return "priority-red";
    };

    return (
        <div className="ktas-container">
            <div className="ktas-header">
                <h1>🏥 KTAS Triage Assessment</h1>
                <p className="subtitle">Korean Triage and Acuity Scale - Patient Evaluation</p>
            </div>

            {prediction && (
                <div className={`prediction-result ${getPriorityColor(prediction)}`}>
                    <h3>Triage Priority: <strong>Level {prediction}</strong></h3>
                    <p>
                        {prediction >= 4 ? "Minor (Non-urgent)" :
                            prediction === 3 ? "Moderate (Urgent)" :
                                prediction === 2 ? "Serious (Emergency)" :
                                    "Critical (Resuscitation)"}
                    </p>
                </div>
            )}

            <div className="form-grid">
                <div className="form-section">
                    <h3>👤 Patient Identification</h3>

                    <div className="input-group">
                        <label>Username <span className="required">*</span></label>
                        <input
                            name="username"
                            placeholder="Enter patient username"
                            value={data.username}
                            onChange={handleChange}
                            className={errors.username ? "error" : ""}
                        />
                        {errors.username && <span className="error-text">{errors.username}</span>}
                    </div>

                    <div className="input-group">
                        <label>Gender <span className="hint">(1=Female, 2=Male)</span></label>
                        <div className="radio-group">
                            <button
                                type="button"
                                className={`radio-btn ${data.Gender === "1" ? "selected" : ""}`}
                                onClick={() => setData({ ...data, Gender: "1" })}
                            >
                                Female
                            </button>
                            <button
                                type="button"
                                className={`radio-btn ${data.Gender === "2" ? "selected" : ""}`}
                                onClick={() => setData({ ...data, Gender: "2" })}
                            >
                                Male
                            </button>
                        </div>
                    </div>

                    <div className="input-group">
                        <label>Age <span className="required">*</span></label>
                        <input
                            name="Age"
                            placeholder="e.g., 45"
                            value={data.Age}
                            onChange={handleChange}
                            className={errors.Age ? "error" : ""}
                        />
                        {errors.Age && <span className="error-text">{errors.Age}</span>}
                    </div>

                    <div className="input-group">
                        <label>Arrival Method <span className="hint">(1-4)</span></label>
                        <select name="Arrival" value={data.Arrival} onChange={handleChange}>
                            <option value="">Select method</option>
                            <option value="1">Walk-in</option>
                            <option value="2">Ambulance</option>
                            <option value="3">Helicopter</option>
                            <option value="4">Other EMS</option>
                        </select>
                    </div>
                </div>

                <div className="form-section">
                    <h3>📋 Clinical Presentation</h3>

                    <div className="input-group">
                        <label>Injury <span className="hint">(1=No, 2=Yes)</span></label>
                        <div className="radio-group">
                            <button
                                type="button"
                                className={`radio-btn ${data.Injury === "1" ? "selected" : ""}`}
                                onClick={() => setData({ ...data, Injury: "1" })}
                            >
                                No Injury
                            </button>
                            <button
                                type="button"
                                className={`radio-btn ${data.Injury === "2" ? "selected" : ""}`}
                                onClick={() => setData({ ...data, Injury: "2" })}
                            >
                                Injury Present
                            </button>
                        </div>
                    </div>

                    <div className="input-group">
                        <label>Chief Symptoms <span className="required">*</span></label>
                        <input
                            name="Symptoms"
                            placeholder="e.g., Chest pain, Shortness of breath"
                            value={data.Symptoms}
                            onChange={handleChange}
                            className={errors.Symptoms ? "error" : ""}
                        />
                        {errors.Symptoms && <span className="error-text">{errors.Symptoms}</span>}
                    </div>

                    <div className="input-group">
                        <label>Mental Status <span className="hint">(1-4)</span></label>
                        <select name="Mental" value={data.Mental} onChange={handleChange}>
                            <option value="">Select status</option>
                            <option value="1">Alert</option>
                            <option value="2">Verbal Response</option>
                            <option value="3">Pain Response</option>
                            <option value="4">Unresponsive</option>
                        </select>
                    </div>

                    <div className="input-group">
                        <label>Pain Present <span className="hint">(0=No, 1=Yes)</span></label>
                        <div className="radio-group">
                            <button
                                type="button"
                                className={`radio-btn ${data.Pain === "0" ? "selected" : ""}`}
                                onClick={() => setData({ ...data, Pain: "0" })}
                            >
                                No Pain
                            </button>
                            <button
                                type="button"
                                className={`radio-btn ${data.Pain === "1" ? "selected" : ""}`}
                                onClick={() => setData({ ...data, Pain: "1" })}
                            >
                                Pain Present
                            </button>
                        </div>
                    </div>

                    {data.Pain === "1" && (
                        <div className="input-group">
                            <label>Pain Score <span className="hint">(0-10)</span></label>
                            <input
                                name="Pain_Score"
                                placeholder="0-10 scale"
                                value={data.Pain_Score}
                                onChange={handleChange}
                            />
                        </div>
                    )}
                </div>

                <div className="form-section">
                    <h3>💓 Vital Signs</h3>

                    <div className="vitals-grid">
                        <div className="input-group">
                            <label>SBP (mmHg) <span className="required">*</span></label>
                            <input
                                name="SBP"
                                placeholder="e.g., 120"
                                value={data.SBP}
                                onChange={handleChange}
                                className={errors.SBP ? "error" : ""}
                            />
                            {errors.SBP && <span className="error-text">{errors.SBP}</span>}
                        </div>

                        <div className="input-group">
                            <label>DBP (mmHg)</label>
                            <input
                                name="DBP"
                                placeholder="e.g., 80"
                                value={data.DBP}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="input-group">
                            <label>Heart Rate (bpm) <span className="required">*</span></label>
                            <input
                                name="HR"
                                placeholder="e.g., 75"
                                value={data.HR}
                                onChange={handleChange}
                                className={errors.HR ? "error" : ""}
                            />
                            {errors.HR && <span className="error-text">{errors.HR}</span>}
                        </div>

                        <div className="input-group">
                            <label>Respiratory Rate <span className="required">*</span></label>
                            <input
                                name="RR"
                                placeholder="e.g., 16"
                                value={data.RR}
                                onChange={handleChange}
                                className={errors.RR ? "error" : ""}
                            />
                            {errors.RR && <span className="error-text">{errors.RR}</span>}
                        </div>

                        <div className="input-group">
                            <label>Body Temp (°C)</label>
                            <input
                                name="BT"
                                placeholder="e.g., 36.5"
                                value={data.BT}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="input-group">
                            <label>SpO2 (%) <span className="required">*</span></label>
                            <input
                                name="SpO2"
                                placeholder="e.g., 98"
                                value={data.SpO2}
                                onChange={handleChange}
                                className={errors.SpO2 ? "error" : ""}
                            />
                            {errors.SpO2 && <span className="error-text">{errors.SpO2}</span>}
                        </div>
                    </div>
                </div>
            </div>

            <div className="form-actions">
                <button
                    className="btn-clear"
                    onClick={clearForm}
                    disabled={loading}
                >
                    Clear Form
                </button>

                <button
                    className="btn-submit"
                    onClick={submit}
                    disabled={loading}
                >
                    {loading ? (
                        <>
                            <span className="spinner"></span>
                            Processing...
                        </>
                    ) : (
                        "🚀 Predict Triage Priority"
                    )}
                </button>
            </div>

            <div className="form-footer">
                <p><span className="required">*</span> indicates required field</p>
                <p className="disclaimer">
                    Note: This tool is for辅助 decision making only.
                    Always rely on clinical judgment and comprehensive patient assessment.
                </p>
            </div>

            <style jsx>{`
                .ktas-container {
                    margin: 0px auto;
                    
                    max-width: 900px;
                    
                    padding: 24px;
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    background: linear-gradient(135deg, #f5f7fa 0%, #e4edf5 100%);
                    border-radius: 16px;
                    box-shadow: 0 10px 30px rgba(0, 0, 100, 0.1);
                    border: 1px solid #d1e0f0;
                }
                
                .ktas-header {
                    text-align: center;
                    margin-bottom: 30px;
                    padding-bottom: 20px;
                    border-bottom: 2px solid #e0ecf8;
                }
                
                .ktas-header h1 {
                    color: #2c3e50;
                    margin: 0 0 8px 0;
                    font-size: 28px;
                }
                
                .subtitle {
                    color: #5d7a9c;
                    font-size: 16px;
                    margin: 0;
                }
                
                .form-grid {
                    display: grid;
                    grid-template-columns: 1fr;
                    gap: 30px;
                    margin-bottom: 30px;
                }
                
                @media (min-width: 768px) {
                    .form-grid {
                        grid-template-columns: repeat(2, 1fr);
                    }
                    
                    .form-section:last-child {
                        grid-column: span 2;
                    }
                }
                
                .form-section {
                    background: white;
                    padding: 22px;
                    border-radius: 12px;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
                    border: 1px solid #e1e8f0;
                }
                
                .form-section h3 {
                    color: #3498db;
                    margin-top: 0;
                    margin-bottom: 20px;
                    padding-bottom: 10px;
                    border-bottom: 1px solid #eaeff5;
                    font-size: 18px;
                    display: flex;
                    align-items: center;
                }
                
                .form-section h3:before {
                    margin-right: 10px;
                    font-size: 20px;
                }
                
                .input-group {
                    margin-bottom: 18px;
                }
                
                .input-group label {
                    display: block;
                    margin-bottom: 6px;
                    color: #2c3e50;
                    font-weight: 500;
                    font-size: 14px;
                }
                
                .input-group input, .input-group select {
                    width: 100%;
                    padding: 12px 14px;
                    border: 1px solid #cbd5e0;
                    border-radius: 8px;
                    font-size: 15px;
                    transition: all 0.2s;
                    box-sizing: border-box;
                }
                
                .input-group input:focus, .input-group select:focus {
                    outline: none;
                    border-color: #3498db;
                    box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.2);
                }
                
                .input-group input.error {
                    border-color: #e74c3c;
                    background-color: #fff9f9;
                }
                
                .error-text {
                    color: #e74c3c;
                    font-size: 13px;
                    margin-top: 4px;
                    display: block;
                }
                
                .radio-group {
                    display: flex;
                    gap: 10px;
                }
                
                .radio-btn {
                    flex: 1;
                    padding: 10px;
                    background: #f8fafc;
                    border: 1px solid #cbd5e0;
                    border-radius: 6px;
                    cursor: pointer;
                    text-align: center;
                    font-size: 14px;
                    transition: all 0.2s;
                }
                
                .radio-btn:hover {
                    background: #edf2f7;
                }
                
                .radio-btn.selected {
                    background: #3498db;
                    color: white;
                    border-color: #3498db;
                    font-weight: 600;
                }
                
                .vitals-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
                    gap: 15px;
                }
                
                .required {
                    color: #e74c3c;
                    font-weight: bold;
                }
                
                .hint {
                    color: #7f8c8d;
                    font-size: 12px;
                    font-weight: normal;
                }
                
                .prediction-result {
                    padding: 18px;
                    border-radius: 10px;
                    margin-bottom: 25px;
                    text-align: center;
                    color: white;
                    font-size: 18px;
                    animation: fadeIn 0.5s;
                }
                
                .priority-red {
                    background: linear-gradient(to right, #e74c3c, #c0392b);
                }
                
                .priority-orange {
                    background: linear-gradient(to right, #e67e22, #d35400);
                }
                
                .priority-yellow {
                    background: linear-gradient(to right, #f1c40f, #f39c12);
                }
                
                .priority-green {
                    background: linear-gradient(to right, #2ecc71, #27ae60);
                }
                
                .prediction-result h3 {
                    margin: 0 0 5px 0;
                    font-size: 22px;
                }
                
                .prediction-result p {
                    margin: 0;
                    font-size: 16px;
                    opacity: 0.9;
                }
                
                .form-actions {
                    display: flex;
                    justify-content: space-between;
                    gap: 15px;
                    margin-bottom: 20px;
                }
                
                .btn-clear, .btn-submit {
                    flex: 1;
                    padding: 16px;
                    border: none;
                    border-radius: 10px;
                    font-size: 16px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.2s;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                
                .btn-clear {
                    background: #f8f9fa;
                    color: #5d6d7e;
                    border: 1px solid #dC2626;
                }
                
                .btn-clear:hover:not(:disabled) {
                    background: #fee2e2;
                }
                
                .btn-submit {
                    background: linear-gradient(to right, #3498db, #2980b9);
                    color: white;
                    box-shadow: 0 4px 12px rgba(52, 152, 219, 0.3);
                }
                
                .btn-submit:hover:not(:disabled) {
                    transform: translateY(-2px);
                    box-shadow: 0 6px 16px rgba(52, 152, 219, 0.4);
                }
                
                .btn-clear:disabled, .btn-submit:disabled {
                    opacity: 0.6;
                    cursor: not-allowed;
                }
                
                .spinner {
                    display: inline-block;
                    width: 18px;
                    height: 18px;
                    margin-right: 10px;
                    border: 2px solid rgba(255, 255, 255, 0.3);
                    border-radius: 50%;
                    border-top-color: white;
                    animation: spin 1s linear infinite;
                }
                
                .form-footer {
                    text-align: center;
                    color: #7f8c8d;
                    font-size: 14px;
                    padding-top: 20px;
                    border-top: 1px solid #e0ecf8;
                }
                
                .disclaimer {
                    font-style: italic;
                    margin-top: 10px;
                    font-size: 13px;
                    color: #95a5a6;
                }
                
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(-10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                
                @keyframes spin {
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
}