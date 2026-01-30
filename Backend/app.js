const express = require("express");
const mongoose = require("mongoose");
const Staff = require("./Model/staff");
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

app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});
