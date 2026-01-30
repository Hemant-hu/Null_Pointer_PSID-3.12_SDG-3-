const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = 3000;

// middleware
app.use(express.json());

// 🔗 MongoDB connection
mongoose
  .connect("mongodb://127.0.0.1:27017/hospitalDB")
  .then(() => {
    console.log("MongoDB connected successfully ✅");
  })
  .catch((err) => {
    console.error("MongoDB connection error ❌", err);
  });

// route
app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

// start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
