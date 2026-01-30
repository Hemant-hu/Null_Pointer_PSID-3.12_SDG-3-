const mongoose = require("mongoose");

const patientAssessmentSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },

    // 🔴 Final ER Triage Priority
    priority: {
      type: String,
      enum: ["LOW", "MEDIUM", "HIGH"],
      required: true,
    },

    patientData: {
      Gender: {
        type: Number,
        required: true,
        enum: [0, 1, 2], // ✅ FIXED
      },

      Age: {
        type: Number,
        required: true,
        min: 0,
        max: 120,
      },

      Arrival: { type: Number },
      Injury: { type: Number },

      Symptoms: {
        type: String,
        trim: true,
        default: "",
      },

      Mental: { type: Number },
      Pain: { type: Number },

      Pain_Score: {
        type: Number,
        min: 0,
        max: 10,
      },

      SBP: { type: Number, min: 50, max: 250 },
      DBP: { type: Number, min: 30, max: 150 },
      HR: { type: Number, min: 30, max: 220 },
      RR: { type: Number, min: 5, max: 60 },
      BT: { type: Number, min: 30, max: 45 },
      SpO2: { type: Number, min: 0, max: 100 },
    },
  },
  { timestamps: true }
);
const PatientAssessment = mongoose.model(
  "PatientAssessment",
  patientAssessmentSchema
);
module.exports = PatientAssessment;