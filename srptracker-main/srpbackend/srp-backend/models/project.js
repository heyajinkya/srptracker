// models/project.js
const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, required: true },
  date: { type: Date, required: true },
  objective: { type: String },
  scopeLab: { type: String },
  scopeSRP: { type: String },
  drdsOfficers: [{ type: String }],
  drtcOfficers: [{ type: String }],
  gocoManpower: [{ type: String }],
  photo: { type: String }, // store file path

  // Motor process details
  motorName: { type: String },
  dateOfReceipt: { type: Date },
  dateOfInspection: { type: Date },
  hardwareReadiness: { type: Date },
  rawMaterialProcessingDate: { type: Date },
  rawMaterialProcessingText: { type: String },
  batchQualificationDate: { type: Date },
  qualificationProperties: [{ type: String }],
  masterBatchMixing: { type: Date },
  castingOfPropellant: { type: Date },
  curingOfMotor: { type: Date },
  postCureOperation: { type: Date },
  postCureTrimming: { type: Date },
  looseFlapFilling: { type: Date },
  propellantMotorProperties: [{ type: String }],
  mainMotorNDT: { type: Date },
  dateOfReadinessForDispatch: { type: Date },
  dateOfDispatch: { type: Date },
  motorStatusDate: { type: Date },
  motorStatusText: { type: String },
});

module.exports = mongoose.model("Project", projectSchema);





 