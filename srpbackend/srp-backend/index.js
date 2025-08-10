// index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const Project = require('./models/projectModel'); // Your Mongoose project schema

const app = express();
app.use(cors());
app.use(express.json());

// ====== MongoDB Connection ======
mongoose.connect('mongodb://127.0.0.1:27017/srptracker', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB Connected'))
.catch(err => console.error(err));

// ====== Static Motor & Process Lists ======
// You can replace these with a DB fetch if needed
const motors = [
  'Motor A',
  'Motor B',
  'Motor C'
];

const processes = [
  'Mixing',
  'Casting',
  'Curing',
  'Inspection'
];

// ====== Routes ======

// Get all projects
app.get('/api/projects', async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add new project
app.post('/api/projects', async (req, res) => {
  const { name, code, date, motor, process } = req.body;

  if (!name || !code || !date || !motor || !process) {
    return res.status(400).json({ message: 'Please fill all fields' });
  }

  try {
    const newProject = new Project({ name, code, date, motor, process });
    await newProject.save();
    res.json({ message: 'Project added successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get motors list
app.get('/api/motors', (req, res) => {
  res.json(motors);
});

// Get processes list
app.get('/api/processes', (req, res) => {
  res.json(processes);
});

// ====== Start Server ======
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

 