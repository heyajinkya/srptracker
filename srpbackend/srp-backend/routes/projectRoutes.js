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

// ✅ GET motors list (dropdown data)
router.get("/motors", (req, res) => {
  const motorOptions = ["Motor A", "Motor B", "Motor C", "Motor D"];
  res.json(motorOptions);
});

// ✅ GET processes list (dropdown data)
router.get("/processes", (req, res) => {
  const processOptions = ["Mixing", "Casting", "Curing", "Finishing"];
  res.json(processOptions);
});

module.exports = router;




 