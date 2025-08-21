// srptracker-master/srptracker-main/srpbackend/srp-backend/routes/projectRoutes.js

const express = require('express');
const Project = require('../models/projectModel');  // Ensure the path is correct
const router = express.Router();

// POST endpoint to add a project
router.post('/api/projects', async (req, res) => {
  try {
    const { name, description, process, personnel } = req.body;

    // Validate required fields
    if (!name || !description || !process) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Ensure personnel is an array before saving
    if (personnel && !Array.isArray(personnel)) {
      return res.status(400).json({ error: 'Personnel should be an array' });
    }

    // Create a new project
    const newProject = new Project({
      name,
      description,
      process,
      personnel,
    });

    // Save the project to the database
    await newProject.save();
    res.status(200).json({ message: 'Project added successfully' });
  } catch (error) {
    console.error('Error saving project:', error);
    res.status(500).json({ error: 'Server error, try again later' });
  }
});

module.exports = router;




