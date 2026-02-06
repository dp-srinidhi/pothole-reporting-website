const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// MongoDB connection
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

export default connectDB;
import dotenv from "dotenv";
dotenv.config();

connectDB();


app.get("/api/potholes", async (req, res) => {
  try {
    const potholes = await Potholes.find();
    res.json(potholes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});
// GET total potholes
app.get("/api/potholes/count", async (req, res) => {
  try {
    const total = await Potholes.countDocuments(); // counts all potholes
    res.json({ total });
  } catch (err) {
    console.error("Error fetching total:", err);
    res.status(500).json({ error: "Server error" });
  }
});


// POST route to report potholes
app.post("/api/potholes/report", upload.single("image"), async (req, res) => {
  try {
    console.log("req.file:", req.file);
    console.log("req.body:", req.body);

    const { location, severity } = req.body;

    if (!location) {
      return res.status(400).json({ error: "Location is required" });
    }

    // Split the location string by comma and convert to numbers
    const [latitudeStr, longitudeStr] = location.split(",");
    const latitude = parseFloat(latitudeStr);
    const longitude = parseFloat(longitudeStr);

    if (isNaN(latitude) || isNaN(longitude)) {
      return res.status(400).json({ error: "Invalid latitude or longitude" });
    }

    // Create the new pothole document
    const pothole = new Potholes({
      latitude,
      longitude,
      severity,
      image: req.file ? req.file.filename : null,
    });

    await pothole.save();  

    console.log("Saved to DB:", pothole);
    res.status(201).json({ message: "Pothole reported successfully", pothole });
  } catch (err) {
    console.error("DB save error:", err);
    res.status(500).json({ error: "Server error" });
  }
});


// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
