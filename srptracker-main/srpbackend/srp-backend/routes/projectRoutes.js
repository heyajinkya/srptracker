const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const Project = require("../models/project"); // make sure file name matches exactly

const router = express.Router();

// Create uploads directory if it doesn't exist
const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
  console.log(`Created uploads directory at ${uploadDir}`);
}

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
      date, // Changed from dateOfSanction to match what the frontend sends
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
      date, // Changed to use the date field from the request
      objective,
      scopeLab,
      scopeSRP,
      drdsOfficers:
        typeof drdsOfficers == "string"
          ? drdsOfficers.split(",")
          : drdsOfficers.length > 0
          ? drdsOfficers
          : [],
      drtcOfficers:
        typeof drtcOfficers == "string"
          ? drtcOfficers.split(",")
          : drtcOfficers.length > 0
          ? drtcOfficers
          : [],
      gocoManpower:
        typeof gocoManpower == "string"
          ? gocoManpower.split(",")
          : gocoManpower.length > 0
          ? gocoManpower
          : [],
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
