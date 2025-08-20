// models/project.js
const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, required: true },
  date: { type: Date, required: true },
  objective: { type: String },
  scopeLab: { type: String },
  scopeSRP: { type: String },
  drdsOfficers: [{ type: String }],
  drtcOfficers: [{ type: String }],
  gocoManpower: [{ type: String }],
  photo: { type: String }, // store file path
});

module.exports = mongoose.model("Project", projectSchema);



 