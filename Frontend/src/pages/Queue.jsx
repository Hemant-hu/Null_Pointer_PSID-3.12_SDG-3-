import React, { useEffect, useState } from "react";
import api from "../api/api";
import "./Queue.css";

const Queue = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchQueue = async () => {
    try {
      const res = await api.get("/queue");
      if (res.data && res.data.data) {
        setPatients(res.data.data);
        setError(null);
      } else {
        throw new Error("Invalid response");
      }
    } catch (err) {
      console.error("Queue fetch error:", err);
      setError("Failed to load queue");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQueue();
  }, []);

  const calculateWaitingTime = (createdAt) => {
    if (!createdAt) return "N/A";
    const diff = Math.floor((Date.now() - new Date(createdAt)) / 60000);
    return `${diff} min`;
  };

  if (loading) return <p className="queue-status">Loading queue...</p>;
  if (error) return <p className="queue-error">{error}</p>;

  return (
    <div className="queue-container">
      <h2 className="queue-title">Patient Queue</h2>

      {patients.length === 0 ? (
        <p className="queue-status">No patients in queue</p>
      ) : (
        patients.map((p) => (
          <div key={p._id} className={`queue-card ${p.priority.toLowerCase()}`}>
            <div className="queue-header">
              <span className="queue-user">{p.username}</span>
              <span className="queue-priority">{p.priority}</span>
            </div>

            <div className="queue-body">
              <p><b>Age:</b> {p.patientData?.Age || "N/A"}</p>
              <p>
                <b>Vitals:</b>{" "}
                HR {p.patientData?.HR || "N/A"} |{" "}
                Temp {p.patientData?.BT || "N/A"}°C |{" "}
                SpO₂ {p.patientData?.SpO2 || "N/A"}%
              </p>
              <p>
                <b>Waiting:</b> {calculateWaitingTime(p.createdAt)}
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Queue;
