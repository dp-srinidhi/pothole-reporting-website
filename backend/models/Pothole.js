const mongoose = require("mongoose");

const potholeSchema = new mongoose.Schema({
  latitude: {
    type: Number,
    required: true
  },
  longitude: {
    type: Number,
    required: true
  },
  severity: {
    type: String,
    required: true
  },
  image:{
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Pothole", potholeSchema);
