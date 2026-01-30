const mongoose = require("mongoose");

// Schema
const doctorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    doctorId: {
      type: String,
      required: true,
      unique: true,
    },
    department: {
      type: String,
      default: "General",
    },
    specialization: {
      type: String,
      default: "General Physician",
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Doctor = mongoose.model("Doctor", doctorSchema);

// 🔽 Add data function
async function addData() {
  try {
    // Doctor 1
    const doctor1 = new Doctor({
      name: "Dr. Rajesh Kumar",
      email: "rajesh.kumar@hospital.com",
      doctorId: "DOC101",
      department: "Cardiology",
      specialization: "Cardiologist",
      isAvailable: true,
    });

    // Doctor 2
    const doctor2 = new Doctor({
      name: "Dr. Priya Sharma",
      email: "priya.sharma@hospital.com",
      doctorId: "DOC102",
      department: "Pediatrics",
      specialization: "Pediatrician",
      isAvailable: true,
    });

    await doctor1.save();
    await doctor2.save();
    console.log("✅ 2 doctors saved successfully");
  } catch (err) {
    console.error("❌ Error saving doctors:", err.message);
  }
}
// addData();

module.exports = Doctor;