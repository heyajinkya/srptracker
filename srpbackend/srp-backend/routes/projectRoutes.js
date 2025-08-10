const express = require("express");
const router = express.Router();
const Project = require("../models/project");

// Get all projects
router.get("/projects", async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new project
router.post("/projects", async (req, res) => {
  try {
    console.log("Incoming Project Data:", req.body); // Debug log

    const { name, scientist, date, motor, process } = req.body;

    if (!name || !scientist || !date || !motor || !process) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const project = new Project({
      name,
      scientist,
      date,
      motor,
      process,
    });

    const newProject = await project.save();
    res.status(201).json(newProject);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get motors list
router.get("/motors", (req, res) => {
  res.json(["Motor A", "Motor B", "Motor C"]);
});

// Get processes list
router.get("/processes", (req, res) => {
  res.json(["Mixing", "Casting", "Curing"]);
});

module.exports = router;






 