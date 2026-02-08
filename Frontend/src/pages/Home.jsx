import React from 'react';
import { Link } from 'react-router-dom';
import {
  Stethoscope,
  Activity,
  Users,
  Clock,
  MapPin,
  Phone,
  Mail,
  ArrowRight,
  Shield,
  Bed,
  Calendar,
  UserCheck,
  AlertCircle
} from 'lucide-react';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="badge">
            <Shield size={16} />
            <span>AI-Powered Healthcare</span>
          </div>
          <h1>Advanced Hospital <span className="gradient-text">Management System</span></h1>
          {/* <p className="hero-subtitle">
            Streamline patient care with intelligent triage, automated doctor matching,
            and real-time resource optimization for enhanced hospital efficiency.
          </p> */}
          <div className="hero-actions">
            <Link to="/login" className="hero-btn primary">
              <span>Staff Portal</span>
              <ArrowRight size={20} />
            </Link>
            <Link to="/new-patient" className="hero-btn secondary">
              <span>Emergency Registration</span>
              <AlertCircle size={20} />
            </Link>
          </div>
          <div className="hero-stats">
            <div className="stat">
              <div className="stat-number">24/7</div>
              <div className="stat-label">Emergency Care</div>
            </div>
            <div className="stat-divider"></div>
            <div className="stat">
              <div className="stat-number">99.8%</div>
              <div className="stat-label">System Uptime</div>
            </div>
            <div className="stat-divider"></div>
            <div className="stat">
              <div className="stat-number">≤ 5min</div>
              <div className="stat-label">Average Triage Time</div>
            </div>
          </div>
        </div>
        {/* <div className="hero-visual">
          <div className="dashboard-preview">
            <div className="dashboard-header">
              <div className="dashboard-title">Live Patient Queue</div>
              <div className="dashboard-status active"></div>
            </div>
            <div className="dashboard-content">
              <div className="queue-item priority-high">
                <div className="queue-badge">Priority 1</div>
                <div className="queue-info">Cardiac Emergency</div>
              </div>
              <div className="queue-item priority-medium">
                <div className="queue-badge">Priority 2</div>
                <div className="queue-info">Fracture Case</div>
              </div>
              <div className="queue-item priority-low">
                <div className="queue-badge">Priority 3</div>
                <div className="queue-info">General Consultation</div>
              </div>
            </div>
          </div>
        </div> */}
      </section>

      {/* Workflow Section */}
      {/* <section className="workflow-section">
        <div className="section-header">
          <h2>Intelligent Patient Journey</h2>
          <p className="section-subtitle">Streamlined process from admission to discharge</p>
        </div>
        <div className="workflow-steps">
          <div className="step">
            <div className="step-icon">
              <UserCheck size={24} />
            </div>
            <div className="step-number">01</div>
            <h3>Digital Registration</h3>
            <p>Secure patient data entry with instant EHR creation</p>
          </div>
          <div className="step-connector">
            <div className="connector-line"></div>
            <ArrowRight size={20} className="connector-arrow" />
          </div>
          <div className="step">
            <div className="step-icon">
              <Activity size={24} />
            </div>
            <div className="step-number">02</div>
            <h3>AI Triage Assessment</h3>
            <p>Real-time priority scoring (0-200) based on vital signs</p>
          </div>
          <div className="step-connector">
            <div className="connector-line"></div>
            <ArrowRight size={20} className="connector-arrow" />
          </div>
          <div className="step">
            <div className="step-icon">
              <Stethoscope size={24} />
            </div>
            <div className="step-number">03</div>
            <h3>Specialist Matching</h3>
            <p>Optimal doctor assignment based on availability & expertise</p>
          </div>
          <div className="step-connector">
            <div className="connector-line"></div>
            <ArrowRight size={20} className="connector-arrow" />
          </div>
          <div className="step">
            <div className="step-icon">
              <Bed size={24} />
            </div>
            <div className="step-number">04</div>
            <h3>Resource Allocation</h3>
            <p>Smart bed management & treatment room assignment</p>
          </div>
        </div>
      </section> */}

      
      {/* <section className="features-section">
        <div className="section-header">
          <h2>Advanced Care Features</h2>
          <p className="section-subtitle">Comprehensive solutions for modern healthcare</p>
        </div>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon-wrapper ai">
              <Activity size={28} />
            </div>
            <h3>Predictive Triage</h3>
            <p>Machine learning algorithms for accurate priority assessment</p>
            <ul className="feature-list">
              <li>Real-time vital monitoring</li>
              <li>Historical data analysis</li>
              <li>Risk prediction models</li>
            </ul>
          </div>
          <div className="feature-card">
            <div className="feature-icon-wrapper match">
              <Users size={28} />
            </div>
            <h3>Intelligent Matching</h3>
            <p>Optimal doctor-patient pairing based on multiple parameters</p>
            <ul className="feature-list">
              <li>Specialty matching</li>
              <li>Availability tracking</li>
              <li>Workload optimization</li>
            </ul>
          </div>
          <div className="feature-card">
            <div className="feature-icon-wrapper monitor">
              <Clock size={28} />
            </div>
            <h3>Real-time Dashboard</h3>
            <p>Comprehensive monitoring of hospital resources & patient flow</p>
            <ul className="feature-list">
              <li>Bed occupancy rates</li>
              <li>Staff availability</li>
              <li>Equipment tracking</li>
            </ul>
          </div>
          <div className="feature-card">
            <div className="feature-icon-wrapper analytics">
              <Calendar size={28} />
            </div>
            <h3>Analytics & Reporting</h3>
            <p>Data-driven insights for operational efficiency & quality care</p>
            <ul className="feature-list">
              <li>Performance metrics</li>
              <li>Trend analysis</li>
              <li>Compliance reporting</li>
            </ul>
          </div>
        </div>
      </section> */}

      {/* Hospital Info */}
      {/* <section className="hospital-info-section">
        <div className="info-container">
          <div className="info-card location">
            <div className="info-header">
              <MapPin size={24} />
              <h3>Hospital Location</h3>
            </div>
            <div className="info-content">
              <h4>SmartCare Medical Center</h4>
              <p className="address">
                123 Healthcare Boulevard<br />
                Medical District<br />
                Nagpur, Maharashtra 440001
              </p>
              <div className="contact-details">
                <div className="contact-item">
                  <Phone size={18} />
                  <div>
                    <div className="contact-label">Emergency Hotline</div>
                    <div className="contact-value">108 / 0712-112233</div>
                  </div>
                </div>
                <div className="contact-item">
                  <Phone size={18} />
                  <div>
                    <div className="contact-label">General Inquiries</div>
                    <div className="contact-value">0712-1234567</div>
                  </div>
                </div>
                <div className="contact-item">
                  <Mail size={18} />
                  <div>
                    <div className="contact-label">Email</div>
                    <div className="contact-value">contact@smartcare.health</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="info-card hours">
            <div className="info-header">
              <Clock size={24} />
              <h3>Operating Hours</h3>
            </div>
            <div className="hours-grid">
              <div className="hour-category emergency">
                <div className="hour-title">
                  <AlertCircle size={18} />
                  <span>Emergency Department</span>
                </div>
                <div className="hour-value">24 Hours / 7 Days</div>
              </div>
              <div className="hour-category">
                <div className="hour-title">Outpatient Department</div>
                <div className="hour-value">8:00 AM - 8:00 PM</div>
              </div>
              <div className="hour-category">
                <div className="hour-title">Consultation Hours</div>
                <div className="hour-value">9:00 AM - 7:00 PM</div>
              </div>
              <div className="hour-category">
                <div className="hour-title">Diagnostic Services</div>
                <div className="hour-value">7:00 AM - 10:00 PM</div>
              </div>
              <div className="hour-category">
                <div className="hour-title">Pharmacy</div>
                <div className="hour-value">24 Hours</div>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* CTA Section */}
      {/* <section className="cta-section">
        <div className="cta-content">
          <h2>Transform Your Hospital Operations</h2>
          <p>
            Join leading healthcare institutions using our AI-powered
            management system to deliver exceptional patient care.
          </p>
          <div className="cta-actions">
            <Link to="/login" className="cta-btn primary">
              <span>Access Staff Portal</span>
              <ArrowRight size={20} />
            </Link>
            <Link to="/demo" className="cta-btn secondary">
              <span>Request Demo</span>
            </Link>
          </div>
        </div>
      </section> */}
    </div>
  );
};

export default Home;