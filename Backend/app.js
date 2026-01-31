const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

const Staff = require("./Model/staff");
const Doctor = require("./Model/Doctor");
const PatientAssessment = require("./Model/Queue");

dotenv.config();

const app = express();

/* ============================
   CONFIG
============================ */
const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.url;

if (!MONGO_URL) {
    console.error("❌ MongoDB URL missing in environment variables");
    process.exit(1);
}

/* ============================
   MIDDLEWARE
============================ */
app.use(express.json());

app.use(
    cors({
        origin: "*", // 🔓 allow all for now (restrict later)
        methods: ["GET", "POST", "PUT", "DELETE"],
    })
);

/* ============================
   DATABASE CONNECTION
============================ */
mongoose
    .connect(MONGO_URL)
    .then(() => console.log("✅ MongoDB connected"))
    .catch((err) => {
        console.error("❌ MongoDB connection failed:", err);
        process.exit(1);
    });

/* ============================
   ROUTES
============================ */

// Health check (IMPORTANT for Render)
app.get("/", (req, res) => {
    res.send("Backend is running 🚀");
});

/* ---------- STAFF ---------- */

app.get("/staff", async (req, res) => {
    try {
        const staff = await Staff.find();
        res.json(staff);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch staff" });
    }
});

app.post("/staff", async (req, res) => {
    try {
        const staff = new Staff(req.body);
        await staff.save();
        res.status(201).json(staff);
    } catch (err) {
        if (err.code === 11000) {
            return res.status(409).json({ error: "Duplicate staff entry" });
        }
        res.status(500).json({ error: "Failed to add staff" });
    }
});

/* ---------- LOGIN ---------- */

app.post("/login", async (req, res) => {
    let { name } = req.body;

    if (!name || !name.trim()) {
        return res.status(400).json({
            success: false,
            message: "Name is required",
        });
    }

    name = name.trim();

    try {
        const staff = await Staff.findOne({
            name: { $regex: `^${name}$`, $options: "i" },
        });

        if (!staff) {
            return res.status(401).json({
                success: false,
                message: "Name not found",
            });
        }

        res.json({
            success: true,
            user: {
                name: staff.name,
                role: staff.role,
                id: staff._id,
            },
        });
    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
});

/* ---------- PATIENTS ---------- */

app.post("/patients/register", async (req, res) => {
    try {
        const assessment = await PatientAssessment.create(req.body);

        res.status(201).json({
            message: "Patient assessment saved",
            priority: assessment.priority,
            id: assessment._id,
        });
    } catch (error) {
        console.error("Patient save error:", error);

        if (error.name === "ValidationError") {
            return res.status(400).json({
                error: "Invalid patient data",
                details: error.message,
            });
        }

        res.status(500).json({
            error: "Failed to save patient assessment",
        });
    }
});

app.get("/queue", async (req, res) => {
    try {
        const patients = await PatientAssessment.find().sort({
            priority: 1,
            createdAt: 1,
        });

        res.json({
            success: true,
            data: patients,
        });
    } catch (err) {
        console.error("Queue error:", err);
        res.status(500).json({ success: false });
    }
});

/* ---------- DOCTORS ---------- */

app.get("/doctors", async (req, res) => {
    try {
        const doctors = await Doctor.find();
        res.json(doctors);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch doctors" });
    }
});

/* ============================
   SERVER START
============================ */
app.listen(PORT, () => {
    console.log(`🚀 Backend running on port ${PORT}`);
});
