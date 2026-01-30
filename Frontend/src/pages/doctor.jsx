import React, { useState, useEffect } from "react";
import api from "../api/api";

const DoctorPage = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Form state for adding/editing doctors
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    doctorId: "",
    department: "General",
    specialization: "General Physician",
    isAvailable: true
  });
  
  // Fetch doctors on component mount
  useEffect(() => {
    fetchDoctors();
  }, []);
  
  // Fetch all doctors
  const fetchDoctors = async () => {
    try {
      setLoading(true);
      const response = await api.get("/doctors");
      setDoctors(response.data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch doctors");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };
  
  // Add a new doctor
  const handleAddDoctor = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/doctors", formData);
      setDoctors([...doctors, response.data]);
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        doctorId: "",
        department: "General",
        specialization: "General Physician",
        isAvailable: true
      });
      
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add doctor");
    }
  };
  
  // Update doctor availability
  const toggleAvailability = async (doctorId, currentStatus) => {
    try {
      const response = await api.patch(`/doctors/${doctorId}`, {
        isAvailable: !currentStatus
      });
      
      // Update local state
      setDoctors(doctors.map(doctor => 
        doctor._id === doctorId ? response.data : doctor
      ));
    } catch (err) {
      setError("Failed to update availability");
    }
  };
  
  // Delete a doctor
  const handleDeleteDoctor = async (doctorId) => {
    if (!window.confirm("Are you sure you want to delete this doctor?")) return;
    
    try {
      await api.delete(`/doctors/${doctorId}`);
      setDoctors(doctors.filter(doctor => doctor._id !== doctorId));
    } catch (err) {
      setError("Failed to delete doctor");
    }
  };
  
  if (loading) {
    return <div className="loading">Loading doctors...</div>;
  }
  
  return (
    <div className="doctor-page">
      <h1>Doctor Management</h1>
      
      {error && <div className="error-alert">{error}</div>}
      
      {/* Add Doctor Form */}
      {/* <div className="add-doctor-form">
        <h2>Add New Doctor</h2>
        <form onSubmit={handleAddDoctor}>
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Doctor ID:</label>
            <input
              type="text"
              name="doctorId"
              value={formData.doctorId}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Department:</label>
            <select
              name="department"
              value={formData.department}
              onChange={handleInputChange}
            >
              <option value="General">General</option>
              <option value="Cardiology">Cardiology</option>
              <option value="Neurology">Neurology</option>
              <option value="Orthopedics">Orthopedics</option>
              <option value="Pediatrics">Pediatrics</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>Specialization:</label>
            <input
              type="text"
              name="specialization"
              value={formData.specialization}
              onChange={handleInputChange}
            />
          </div>
          
          <div className="form-group checkbox">
            <label>
              <input
                type="checkbox"
                name="isAvailable"
                checked={formData.isAvailable}
                onChange={handleInputChange}
              />
              Available
            </label>
          </div>
          
          <button type="submit" className="btn-primary">
            Add Doctor
          </button>
        </form>
      </div> */}
      
      {/* Doctors List */}
      <div className="doctors-list">
        <h2>Doctors ({doctors.length})</h2>
        
        {doctors.length === 0 ? (
          <p>No doctors found</p>
        ) : (
          <div className="doctors-grid">
            {doctors.map((doctor) => (
              <div key={doctor._id} className="doctor-card">
                <div className="doctor-info">
                  <h3>{doctor.name}</h3>
                  <p><strong>ID:</strong> {doctor.doctorId}</p>
                  <p><strong>Email:</strong> {doctor.email}</p>
                  <p><strong>Department:</strong> {doctor.department}</p>
                  <p><strong>Specialization:</strong> {doctor.specialization}</p>
                  <p>
                    <strong>Status:</strong> 
                    <span className={`status ${doctor.isAvailable ? 'available' : 'unavailable'}`}>
                      {doctor.isAvailable ? ' Available' : ' Unavailable'}
                    </span>
                  </p>
                  <p><strong>Added:</strong> {new Date(doctor.createdAt).toLocaleDateString()}</p>
                </div>
                
                <div className="doctor-actions">
                  <button
                    onClick={() => toggleAvailability(doctor._id, doctor.isAvailable)}
                    className={`btn ${doctor.isAvailable ? 'btn-warning' : 'btn-success'}`}
                  >
                    {doctor.isAvailable ? 'Mark Unavailable' : 'Mark Available'}
                  </button>
                  
                  <button
                    onClick={() => handleDeleteDoctor(doctor._id)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorPage;