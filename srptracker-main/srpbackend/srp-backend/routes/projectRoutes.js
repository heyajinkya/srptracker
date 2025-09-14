// routes/projectRoutes.js
const express = require("express");
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const Project = require("../models/project");

const router = express.Router();

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, "..", "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Multer storage for file uploads
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadsDir),
  filename: (_req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage });

// Helpers
const toArray = (v) =>
  Array.isArray(v) ? v : v !== undefined && v !== "" ? [v] : [];

const toDate = (v) => (v ? new Date(v) : undefined);

// GET /api/projects
router.get("/projects", async (_req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (err) {
    console.error("Error fetching projects:", err);
    res
      .status(500)
      .json({ error: `Failed to fetch projects: ${err.message}` });
  }
});

// POST /api/projects (supports multipart/form-data with optional photo)
router.post("/projects", upload.single("photo"), async (req, res) => {
  try {
    const body = req.body;

    // Build document following your schema
    const doc = {
      name: body.name,
      code: body.code,
      date: toDate(body.date),
      objective: body.objective,
      scopeLab: body.scopeLab,
      scopeSRP: body.scopeSRP,
      drdsOfficers: toArray(body.drdsOfficers),
      drtcOfficers: toArray(body.drtcOfficers),
      gocoManpower: toArray(body.gocoManpower),
      photo: req.file ? path.join("uploads", path.basename(req.file.path)) : undefined,

      // Motor process (all optional)
      motorName: body.motorName,
      dateOfReceipt: toDate(body.dateOfReceipt),
      dateOfInspection: toDate(body.dateOfInspection),
      hardwareReadiness: toDate(body.hardwareReadiness),
      rawMaterialProcessingDate: toDate(body.rawMaterialProcessingDate),
      rawMaterialProcessingText: body.rawMaterialProcessingText,
      batchQualificationDate: toDate(body.batchQualificationDate),
      qualificationProperties: toArray(body.qualificationProperties),
      masterBatchMixing: toDate(body.masterBatchMixing),
      castingOfPropellant: toDate(body.castingOfPropellant),
      curingOfMotor: toDate(body.curingOfMotor),
      postCureOperation: toDate(body.postCureOperation),
      postCureTrimming: toDate(body.postCureTrimming),
      looseFlapFilling: toDate(body.looseFlapFilling),
      propellantMotorProperties: toArray(body.propellantMotorProperties),
      mainMotorNDT: toDate(body.mainMotorNDT),
      dateOfReadinessForDispatch: toDate(body.dateOfReadinessForDispatch),
      dateOfDispatch: toDate(body.dateOfDispatch),
      motorStatusDate: toDate(body.motorStatusDate),
      motorStatusText: body.motorStatusText,
    };

    const saved = await new Project(doc).save();
    res.status(201).json(saved);
  } catch (err) {
    console.error("Error saving project:", err);
    res.status(500).json({ error: `Failed to save project: ${err.message}` });
  }
});

// POST /api/motor-process (kept for your UI; stores nothing, just returns OK)
router.post("/motor-process", upload.none(), async (req, res) => {
  try {
    // If later you want to persist, you can update a Project here.
    res
      .status(200)
      .json({ message: "Motor process data received", data: req.body });
  } catch (err) {
    console.error("Motor process error:", err);
    res
      .status(500)
      .json({ error: `Failed to save motor process: ${err.message}` });
  }
});

module.exports = router;







