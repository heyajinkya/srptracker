const express = require('express');
const router = express.Router();
const Project = require('../models/projectModel');

// ---- Static lists for dropdowns ----
const motorsList = [
  "Motor A",
  "Motor B",
  "Motor C",
  "Motor D"
];

const processesList = [
  "Casting",
  "Curing",
  "Assembly",
  "Inspection"
];

// ---- GET all projects ----
router.get('/projects', async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ---- POST new project ----
router.post('/projects', async (req, res) => {
  try {
    const { name, code, date, motor, process } = req.body;

    if (!name || !code || !date || !motor || !process) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const newProject = new Project({
      name,
      code,
      date,
      motor,
      process
    });

    await newProject.save();
    res.json({ message: 'Project added successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ---- GET motors ----
router.get('/motors', (req, res) => {
  res.json(motorsList);
});

// ---- GET processes ----
router.get('/processes', (req, res) => {
  res.json(processesList);
});

module.exports = router;







 