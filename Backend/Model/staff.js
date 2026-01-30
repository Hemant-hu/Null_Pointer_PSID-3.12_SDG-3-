const mongoose = require("mongoose");

// 🔗 MongoDB connection


// Schema
const staffSchema = new mongoose.Schema(
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
    role: {
      type: String,
      enum: ["receptionist", "doctor"],
      required: true,
    },
    employeeId: {
      type: String,
      required: true,
      unique: true,
    },
    department: {
      type: String,
      default: "General",
    },
  },
  { timestamps: true }
);

const Staff = mongoose.model("Staff", staffSchema);

// 🔽 Add data function
async function addData() {
  try {
    const staff = new Staff({
      name: "Anita Verma",
      email: "anita@gmail.com",
      role: "receptionist",
      employeeId: "EMP102",
    });

    await staff.save();
    console.log("Staff saved successfully ✅");
  } catch (err) {
    console.error("Error saving staff ❌", err.message);
  }
}
// addData();

module.exports = Staff;
