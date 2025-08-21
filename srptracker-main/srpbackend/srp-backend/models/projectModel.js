// srptracker-master/srptracker-main/srp-backend/models/projectModel.js

const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  process: { type: String, required: true },
  personnel: [{ type: String }], // personnel should be an array
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;

