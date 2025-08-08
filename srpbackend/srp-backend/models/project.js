const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  name: String,
  status: String,
  startDate: Date,
  endDate: Date,
  progress: Number,
  title: String,
  description: String,
  supervisor: String,
  motorName: String,      // ✅ New field for dropdown
  processName: String,    // ✅ New field for dropdown
});

module.exports = mongoose.model("Project", projectSchema);

 