const express = require("express");
const router = express.Router();
const Project = require("../models/Project");

// Get all projects
router.get("/", async (req, res) => {
  const projects = await Project.find();
  res.json(projects);
});

// Create new project
router.post("/", async (req, res) => {
  const project = new Project(req.body);
  console.log(project);
  await project.save();
  res.json(project);
});

// Get list of motors
router.get("/motors", (req, res) => {
  res.json(["Motor A", "Motor B", "Motor C"]);
});

// Get list of processes
router.get("/processes", (req, res) => {
  res.json(["Mixing", "Casting", "Curing"]);
});

module.exports = router;





 