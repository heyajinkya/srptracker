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
});

module.exports = mongoose.model("Project", projectSchema);
 