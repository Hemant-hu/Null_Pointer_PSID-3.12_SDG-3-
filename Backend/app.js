const express = require("express");
const mongoose = require("mongoose");
const Staff = require("./Model/staff");
const Doctor = require("./Model/Doctor");
const cors = require("cors");

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
        const patient = req.body;
        console.log("Patient registration data:", patient);

        // 🔢 Priority calculation
        let score = 50;

        // Age factor
        const age = parseInt(patient.age) || 0;
        if (age > 60) score += 20;
        if (age > 80) score += 10;

        // Severity
        if (patient.severity === "high") score += 40;
        if (patient.severity === "critical") score += 70;
        if (patient.severity === "low") score -= 20;

        // Symptoms
        const symptoms = (patient.symptoms || "").toLowerCase();
        if (symptoms.includes("chest")) score += 30;
        if (symptoms.includes("breath")) score += 25;
        if (symptoms.includes("bleed")) score += 35;
        if (symptoms.includes("unconscious")) score += 50;

        // Vitals
        const hr = parseInt(patient.vitals?.heartRate) || 80;
        if (hr < 60 || hr > 100) score += 15;

        const temp = parseFloat(patient.vitals?.temperature) || 98.6;
        if (temp > 100) score += 10;

        const oxygen = parseInt(patient.vitals?.oxygenLevel) || 98;
        if (oxygen < 95) score += 20;
        if (oxygen < 90) score += 30;

        // Clamp score
        score = Math.max(0, Math.min(200, score));

        // 🟢 TODO: Save patient + score to DB here
        // await Patient.create({ ...patient, priorityScore: score });

        res.status(201).json({
            success: true,
            priorityScore: Math.round(score),
            message: "Patient registered successfully",
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
});


app.get("/doctors", async (req, res) => {
    const doctors = await Doctor.find();
    res.json(doctors);
});



app.listen(PORT, () => {
    console.log(`Backend running at http://localhost:${PORT}`);
});
