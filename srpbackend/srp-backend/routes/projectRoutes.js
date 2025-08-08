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

// ✅ GET dropdown options (motors & processes)
router.get("/options", (req, res) => {
  const motorOptions = ["Motor A", "Motor B", "Motor C"];
  const processOptions = ["Mixing", "Casting", "Curing"];

  res.json({ motors: motorOptions, processes: processOptions });
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
      motorName,    // dropdown field
      processName,  // dropdown field
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

module.exports = router;


 