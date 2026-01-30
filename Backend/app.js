const express = require("express");
const mongoose = require("mongoose");
const Staff = require("./Model/staff");
const Doctor = require("./Model/Doctor");
const cors = require("cors");
const PatientAssessment = require("./Model/Queue");

const app = express();
const PORT = 3000;

app.use(express.json());

app.use(
    cors({
        origin: "http://localhost:5173",
    })
);

mongoose
    .connect("mongodb://127.0.0.1:27017/hospitalDB")
    .then(() => console.log("MongoDB connected ✅"))
    .catch((err) => console.error(err));

// routes
app.get("/staff", async (req, res) => {
    const staff = await Staff.find();
    res.json(staff);
});

app.post("/staff", async (req, res) => {
    const staff = new Staff(req.body);
    await staff.save();
    res.json(staff);
});

app.post("/predict", async (req, res) => {
    console.log(req.body);
});

app.post("/login", async (req, res) => {
    const { name } = req.body;
    console.log(name);

    try {
        const staff = await Staff.findOne({ name: name });

        if (!staff) {
            return res.status(401).json({ success: false, message: "Name not found" });
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
        res.status(500).json({ success: false, message: "Server error" });
    }
});



app.post("/patients/register", async (req, res) => {
    try {
        console.log("Received patient assessment:", req.body);

        const assessment = await PatientAssessment.create(req.body);

        res.status(201).json({
            message: "Patient assessment saved successfully",
            priority: assessment.priority,
            id: assessment._id,
        });
    } catch (error) {
        console.error("Save error:", error);

        // 🔴 Validation error
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

        const queue = patients.map((p) => ({
            _id: p._id,
            username: p.username,
            priority: p.priority,
            patientData: p.patientData,
            createdAt: p.createdAt,
        }));

        res.json({
            success: true,
            data: queue,
        });
    } catch (err) {
        console.error("Queue error:", err);
        res.status(500).json({ success: false });
    }
});











app.get("/doctors", async (req, res) => {
    const doctors = await Doctor.find();
    res.json(doctors);
});



app.listen(PORT, () => {
    console.log(`Backend running at http://localhost:${PORT}`);
});
