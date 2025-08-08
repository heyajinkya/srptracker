const express = require("express");
const router = express.Router();
const Project = require("../models/Project");

// ✅ GET all projects
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json({ error: "Server error while fetching projects" });
  }
});

// ✅ POST new project (including dropdown values)
router.post("/", async (req, res) => {
  try {
    const {
      name,
      status,
      startDate,
      endDate,
      progress,
      title,
      description,
      supervisor,
      motorName,    // new dropdown field
      processName,  // new dropdown field
    } = req.body;

    const project = new Project({
      name,
      status,
      startDate,
      endDate,
      progress,
      title,
      description,
      supervisor,
      motorName,
      processName,
    });

    console.log("Saving project:", project);

    await project.save();
    res.json(project);
  } catch (error) {
    console.error("Error saving project:", error);
    res.status(500).json({ error: "Server error while saving project" });
  }
});

// ✅ Get Motor Options
router.get("/motors", (req, res) => {
  const motors = ["Motor A", "Motor B", "Motor C"];
  res.json(motors);
});

// ✅ Get Process Options
router.get("/processes", (req, res) => {
  const processes = ["Mixing", "Casting", "Curing"];
  res.json(processes);
});

module.exports = router;



 