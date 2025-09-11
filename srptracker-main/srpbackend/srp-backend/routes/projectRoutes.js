// routes/ProjectRoutes.js
const express = require("express");
const Project = require("../models/project"); // Import the updated Project model
const router = express.Router();

// Endpoint to handle project creation (including motor process details)
router.post("/api/projects", async (req, res) => {
  try {
    // Log the incoming request body for debugging purposes
    console.log("Request Data:", req.body);

    // Create a new Project object with the form data
    const newProject = new Project({
      name: req.body.name,
      code: req.body.code,
      date: req.body.date,
      objective: req.body.objective,
      scopeLab: req.body.scopeLab,
      scopeSRP: req.body.scopeSRP,
      drdsOfficers: req.body.drdsOfficers,
      drtcOfficers: req.body.drtcOfficers,
      gocoManpower: req.body.gocoManpower,
      photo: req.body.photo, // file path

      // Motor process fields
      motorName: req.body.motorName,
      dateOfReceipt: req.body.dateOfReceipt,
      dateOfInspection: req.body.dateOfInspection,
      hardwareReadiness: req.body.hardwareReadiness,
      rawMaterialProcessingDate: req.body.rawMaterialProcessingDate,
      rawMaterialProcessingText: req.body.rawMaterialProcessingText,
      batchQualificationDate: req.body.batchQualificationDate,
      qualificationProperties: req.body.qualificationProperties,
      masterBatchMixing: req.body.masterBatchMixing,
      castingOfPropellant: req.body.castingOfPropellant,
      curingOfMotor: req.body.curingOfMotor,
      postCureOperation: req.body.postCureOperation,
      postCureTrimming: req.body.postCureTrimming,
      looseFlapFilling: req.body.looseFlapFilling,
      propellantMotorProperties: req.body.propellantMotorProperties,
      mainMotorNDT: req.body.mainMotorNDT,
      dateOfReadinessForDispatch: req.body.dateOfReadinessForDispatch,
      dateOfDispatch: req.body.dateOfDispatch,
      motorStatusDate: req.body.motorStatusDate,
      motorStatusText: req.body.motorStatusText,
    });

    // Save the new project to the database
    await newProject.save();

    // Return the saved project as a response
    res.status(200).json(newProject);
  } catch (err) {
    console.error("Error saving motor process details:", err);
    // Send a detailed error message back to the client
    res.status(500).json({ error: `Failed to save motor process details: ${err.message}` });
  }
});

module.exports = router;




