const mongoose = require("mongoose");

const staffSchema = new mongoose.Schema(
  {
    // Basic info
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    phone: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },

    // Role of staff
    role: {
      type: String,
      enum: ["receptionist", "nurse", "doctor", "admin"],
      required: true,
    },

    // Hospital related info
    department: {
      type: String,
      default: "General",
    },

    employeeId: {
      type: String,
      unique: true,
      required: true,
    },

    // Address
    address: {
      street: String,
      city: String,
      state: String,
      pincode: String,
    },

    // Status
    isActive: {
      type: Boolean,
      default: true,
    },

    // Audit info
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Staff", // admin who created this staff
    },
  },
  {
    timestamps: true, // createdAt & updatedAt
  }
);

module.exports = mongoose.model("Staff", staffSchema);
