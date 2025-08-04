const express = require("express");
const router = express.Router();
const Project = require("../models/Project");

router.get("/", async (req, res) => {
  const projects = await Project.find();
  res.json(projects);
});

router.post("/", async (req, res) => {
  const project = new Project(req.body);
  console.log(project);
  await project.save();
  res.json(project);
});

module.exports = router;
 