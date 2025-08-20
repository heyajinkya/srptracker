 const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, required: true },
  date: { type: Date, required: true },
  motor: { type: String, required: true },
  process: { type: String, required: true }
});

module.exports = mongoose.model('Project', projectSchema);
