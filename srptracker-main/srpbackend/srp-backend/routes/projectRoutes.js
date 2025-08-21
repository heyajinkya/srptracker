const express = require("express");
const multer = require("multer");
const path = require("path");
const Project = require("../models/project"); // make sure file name matches exactly

const router = express.Router();

// ===== Multer Setup for File Uploads =====
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// ===== POST /projects (Add new project) =====
router.post("/", upload.single("photo"), async (req, res) => {
  try {
    console.log("📥 Received request body:", req.body);
    if (req.file) {
      console.log("📸 Received file:", req.file.originalname);
    }

    const {
      name,
      code,
      dateOfSanction,
      objective,
      scopeLab,
      scopeSRP,
      drdsOfficers,
      drtcOfficers,
      gocoManpower,
    } = req.body;

    // Create new project document
    const newProject = new Project({
      name,
      code,
      dateOfSanction,
      objective,
      scopeLab,
      scopeSRP,
      drdsOfficers: drdsOfficers ? drdsOfficers.split(",") : [],
      drtcOfficers: drtcOfficers ? drtcOfficers.split(",") : [],
      gocoManpower: gocoManpower ? gocoManpower.split(",") : [],
      photo: req.file ? `/uploads/${req.file.filename}` : null,
    });

    await newProject.save();
    console.log("✅ Project saved:", newProject);

    res.json({ message: "Project added successfully" });
  } catch (err) {
    console.error("❌ Error saving project:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// ===== GET all projects =====
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
