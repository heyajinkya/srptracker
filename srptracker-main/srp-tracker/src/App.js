// src/App.js
import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  // ------- Project form state -------
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    date: "",
    objective: "",
    scopeLab: "",
    scopeSRP: "",
    drdsOfficers: [""],
    drtcOfficers: [""],
    gocoManpower: [""],
  });
  const [photo, setPhoto] = useState(null);
  const [projects, setProjects] = useState([]);

  // ------- Motor process panel toggle -------
  const [showMotorProcess, setShowMotorProcess] = useState(false);

  // ------- Motor process state (19 fields) -------
  const [motorData, setMotorData] = useState({
    projectName: "",                     // 1 text
    motorName: "",                       // 2 dropdown
    dateOfReceipt: "",                   // 3 date
    dateOfInspection: "",                // 4 date
    hardwareReadiness: "",               // 5 date
    rawMaterialProcessingDate: "",       // 6a date
    rawMaterialProcessingText: "",       // 6b text
    batchQualificationDate: "",          // 7 date
    qualificationProperties: Array(7).fill(""), // 8 seven dropdowns (you can add more)
    masterBatchMixing: "",               // 9 date
    castingOfPropellant: "",             // 10 date
    curingOfMotor: "",                   // 11 date
    postCureOperation: "",               // 12 date
    postCureTrimming: "",                // 13 date
    looseFlapFilling: "",                // 14 date
    propellantMotorProperties: Array(7).fill(""), // 15 seven dropdowns
    mainMotorNDT: "",                    // 16 date
    dateOfReadinessForDispatch: "",      // 17 date
    dateOfDispatch: "",                  // 18 date
    motorStatusDate: "",                 // 19a date
    motorStatusText: "",                 // 19b text details
  });

  // Simple option sets for the dropdown groups (edit these to your real properties)
  const propertyOptions = [
    "Select",
    "Pass",
    "Fail",
    "Pending",
    "Meets Spec",
    "Below Spec",
    "Above Spec",
    "N/A",
  ];

  // -------- Fetch projects (unchanged) --------
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/projects")
      .then((res) => setProjects(res.data))
      .catch((err) => console.error(err));
  }, []);

  // -------- Project form handlers --------
  const handleProjectChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleProjectArrayChange = (e, index, field) => {
    const next = [...formData[field]];
    next[index] = e.target.value;
    setFormData({ ...formData, [field]: next });
  };
  const addProjectArrayItem = (field) =>
    setFormData({ ...formData, [field]: [...formData[field], ""] });
  const removeProjectArrayItem = (field, index) => {
    const next = formData[field].filter((_, i) => i !== index);
    setFormData({ ...formData, [field]: next });
  };
  const handleFileChange = (e) => setPhoto(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      Object.entries(formData).forEach(([k, v]) => {
        if (Array.isArray(v)) v.forEach((item) => data.append(k, item));
        else data.append(k, v);
      });
      if (photo) data.append("photo", photo);

      await axios.post("http://localhost:8000/api/projects", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Project added successfully!");
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert("Error adding project");
    }
  };

  // -------- Motor process handlers --------
  const handleMotorChange = (e) => {
    setMotorData({ ...motorData, [e.target.name]: e.target.value });
  };
  const handleMotorArrayChange = (e, index, field) => {
    const next = [...motorData[field]];
    next[index] = e.target.value;
    setMotorData({ ...motorData, [field]: next });
  };
  const addMotorArrayItem = (field) =>
    setMotorData({ ...motorData, [field]: [...motorData[field], ""] });
  const removeMotorArrayItem = (field, index) => {
    const next = motorData[field].filter((_, i) => i !== index);
    setMotorData({ ...motorData, [field]: next });
  };

  const handleMotorSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      Object.entries(motorData).forEach(([k, v]) => {
        if (Array.isArray(v)) v.forEach((item) => data.append(k, item));
        else data.append(k, v);
      });

      await axios.post("http://localhost:8000/api/motor-process", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Motor process details saved!");
      // You can choose to not reload; keeping it consistent with your pattern:
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert("Error saving motor process details");
    }
  };

  // -------- UI --------
  return (
    <div style={{ padding: 20 }}>
      <h2>SRP Tracker - Add Project</h2>

      {/* PROJECT FORM (unchanged structure; file input kept in place) */}
      <form
        onSubmit={handleSubmit}
        style={{
          display: "grid",
          gap: 16,
          maxWidth: 900,
          gridTemplateColumns: "1fr 1fr",
        }}
      >
        <input
          style={{ gridColumn: "1 / -1", padding: 10 }}
          type="text"
          name="name"
          placeholder="Project Name"
          value={formData.name}
          onChange={handleProjectChange}
          required
        />
        <input
          style={{ gridColumn: "1 / -1", padding: 10 }}
          type="text"
          name="code"
          placeholder="Project Code"
          value={formData.code}
          onChange={handleProjectChange}
          required
        />
        <input
          style={{ padding: 10 }}
          type="date"
          name="date"
          value={formData.date}
          onChange={handleProjectChange}
          required
        />
        <textarea
          style={{ gridColumn: "1 / -1", padding: 10, minHeight: 90 }}
          name="objective"
          placeholder="Objective as per PDR"
          value={formData.objective}
          onChange={handleProjectChange}
        />
        <textarea
          style={{ gridColumn: "1 / -1", padding: 10, minHeight: 90 }}
          name="scopeLab"
          placeholder="Scope of Work of Laboratory"
          value={formData.scopeLab}
          onChange={handleProjectChange}
        />
        <textarea
          style={{ gridColumn: "1 / -1", padding: 10, minHeight: 90 }}
          name="scopeSRP"
          placeholder="Scope of SRP"
          value={formData.scopeSRP}
          onChange={handleProjectChange}
        />

        {/* DRDS */}
        <div style={{ gridColumn: "1 / -1" }}>
          <label>DRDS Officers:</label>
          {formData.drdsOfficers.map((off, i) => (
            <div key={`drds-${i}`} style={{ display: "flex", gap: 8, marginTop: 6 }}>
              <input
                style={{ flex: 1, padding: 10 }}
                type="text"
                placeholder="Enter DRDS Officer"
                value={off}
                onChange={(e) => handleProjectArrayChange(e, i, "drdsOfficers")}
              />
              <button
                type="button"
                onClick={() => removeProjectArrayItem("drdsOfficers", i)}
              >
                ❌
              </button>
            </div>
          ))}
          <button type="button" onClick={() => addProjectArrayItem("drdsOfficers")}>
            ➕ Add DRDS Officer
          </button>
        </div>

        {/* DRTC */}
        <div style={{ gridColumn: "1 / -1" }}>
          <label>DRTC Officers:</label>
          {formData.drtcOfficers.map((off, i) => (
            <div key={`drtc-${i}`} style={{ display: "flex", gap: 8, marginTop: 6 }}>
              <input
                style={{ flex: 1, padding: 10 }}
                type="text"
                placeholder="Enter DRTC Officer"
                value={off}
                onChange={(e) => handleProjectArrayChange(e, i, "drtcOfficers")}
              />
              <button
                type="button"
                onClick={() => removeProjectArrayItem("drtcOfficers", i)}
              >
                ❌
              </button>
            </div>
          ))}
          <button type="button" onClick={() => addProjectArrayItem("drtcOfficers")}>
            ➕ Add DRTC Officer
          </button>
        </div>

        {/* GoCo */}
        <div style={{ gridColumn: "1 / -1" }}>
          <label>GoCo Manpower:</label>
          {formData.gocoManpower.map((w, i) => (
            <div key={`goco-${i}`} style={{ display: "flex", gap: 8, marginTop: 6 }}>
              <input
                style={{ flex: 1, padding: 10 }}
                type="text"
                placeholder="Enter Worker Name"
                value={w}
                onChange={(e) => handleProjectArrayChange(e, i, "gocoManpower")}
              />
              <button
                type="button"
                onClick={() => removeProjectArrayItem("gocoManpower", i)}
              >
                ❌
              </button>
            </div>
          ))}
          <button type="button" onClick={() => addProjectArrayItem("gocoManpower")}>
            ➕ Add Worker
          </button>
        </div>

        {/* FILE INPUT — kept in original spot above Add Project */}
        <div style={{ gridColumn: "1 / -1" }}>
          <input type="file" accept="image/jpeg" onChange={handleFileChange} />
        </div>

        <button
          style={{
            gridColumn: "1 / -1",
            padding: 12,
            background: "#43A047",
            color: "#fff",
            border: "none",
          }}
          type="submit"
        >
          Add Project
        </button>
      </form>

      {/* Toggle button outside the project form to avoid nested forms */}
      <div style={{ maxWidth: 900, marginTop: 20 }}>
        <button
          onClick={() => setShowMotorProcess((s) => !s)}
          style={{ padding: 10, background: "#007BFF", color: "#fff", border: "none" }}
        >
          Status and Motor Process Details
        </button>
      </div>

      {/* MOTOR PROCESS FORM (all 19 fields) */}
      {showMotorProcess && (
        <form
          onSubmit={handleMotorSubmit}
          style={{
            marginTop: 16,
            border: "1px solid #ddd",
            padding: 16,
            maxWidth: 900,
            display: "grid",
            gap: 16,
            gridTemplateColumns: "1fr 1fr",
          }}
        >
          <h3 style={{ gridColumn: "1 / -1" }}>Status and Motor Process Details</h3>

          {/* 1. Project Name */}
          <div>
            <label>Project Name</label>
            <input
              style={{ width: "100%", padding: 10 }}
              type="text"
              name="projectName"
              value={motorData.projectName}
              onChange={handleMotorChange}
              placeholder="Enter Project Name"
              required
            />
          </div>

          {/* 2. Motor dropdown */}
          <div>
            <label>Motor Name</label>
            <select
              style={{ width: "100%", padding: 10 }}
              name="motorName"
              value={motorData.motorName}
              onChange={handleMotorChange}
              required
            >
              <option value="">Select Motor</option>
              <option>Motor 1</option>
              <option>Motor 2</option>
              <option>Motor 3</option>
            </select>
          </div>

          {/* 3–5 */}
          <div>
            <label>Date of Receipt of Hardware</label>
            <input
              style={{ width: "100%", padding: 10 }}
              type="date"
              name="dateOfReceipt"
              value={motorData.dateOfReceipt}
              onChange={handleMotorChange}
              required
            />
          </div>
          <div>
            <label>Date of Hardware Inspection</label>
            <input
              style={{ width: "100%", padding: 10 }}
              type="date"
              name="dateOfInspection"
              value={motorData.dateOfInspection}
              onChange={handleMotorChange}
              required
            />
          </div>
          <div>
            <label>Hardware Readiness</label>
            <input
              style={{ width: "100%", padding: 10 }}
              type="date"
              name="hardwareReadiness"
              value={motorData.hardwareReadiness}
              onChange={handleMotorChange}
              required
            />
          </div>

          {/* 6a + 6b */}
          <div>
            <label>Raw Material Processing (Date)</label>
            <input
              style={{ width: "100%", padding: 10 }}
              type="date"
              name="rawMaterialProcessingDate"
              value={motorData.rawMaterialProcessingDate}
              onChange={handleMotorChange}
              required
            />
          </div>
          <div>
            <label>Raw Material Processing (Details)</label>
            <input
              style={{ width: "100%", padding: 10 }}
              type="text"
              name="rawMaterialProcessingText"
              value={motorData.rawMaterialProcessingText}
              onChange={handleMotorChange}
              placeholder="Notes / vendor / lot / etc."
            />
          </div>

          {/* 7 */}
          <div>
            <label>Batch Qualification Date</label>
            <input
              style={{ width: "100%", padding: 10 }}
              type="date"
              name="batchQualificationDate"
              value={motorData.batchQualificationDate}
              onChange={handleMotorChange}
              required
            />
          </div>

          {/* 8 — Qualification Properties (7–8 dropdowns) */}
          <div style={{ gridColumn: "1 / -1" }}>
            <label style={{ display: "block", marginBottom: 6 }}>
              Qualification Properties
            </label>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
              {motorData.qualificationProperties.map((val, i) => (
                <div key={`qp-${i}`} style={{ display: "flex", gap: 6 }}>
                  <select
                    style={{ flex: 1, padding: 10 }}
                    value={val}
                    onChange={(e) =>
                      handleMotorArrayChange(e, i, "qualificationProperties")
                    }
                  >
                    {propertyOptions.map((opt) => (
                      <option key={opt} value={opt === "Select" ? "" : opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={() => removeMotorArrayItem("qualificationProperties", i)}
                  >
                    ❌
                  </button>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() => addMotorArrayItem("qualificationProperties")}
              style={{ marginTop: 8 }}
            >
              ➕ Add Property
            </button>
          </div>

          {/* 9–14 */}
          <div>
            <label>Master Batch Mixing</label>
            <input
              style={{ width: "100%", padding: 10 }}
              type="date"
              name="masterBatchMixing"
              value={motorData.masterBatchMixing}
              onChange={handleMotorChange}
              required
            />
          </div>
          <div>
            <label>Casting of Propellant</label>
            <input
              style={{ width: "100%", padding: 10 }}
              type="date"
              name="castingOfPropellant"
              value={motorData.castingOfPropellant}
              onChange={handleMotorChange}
              required
            />
          </div>
          <div>
            <label>Curing of Motor</label>
            <input
              style={{ width: "100%", padding: 10 }}
              type="date"
              name="curingOfMotor"
              value={motorData.curingOfMotor}
              onChange={handleMotorChange}
              required
            />
          </div>
          <div>
            <label>Post-Cure Operation</label>
            <input
              style={{ width: "100%", padding: 10 }}
              type="date"
              name="postCureOperation"
              value={motorData.postCureOperation}
              onChange={handleMotorChange}
              required
            />
          </div>
          <div>
            <label>Post-Cure Trimming</label>
            <input
              style={{ width: "100%", padding: 10 }}
              type="date"
              name="postCureTrimming"
              value={motorData.postCureTrimming}
              onChange={handleMotorChange}
              required
            />
          </div>
          <div>
            <label>Loose Flap Filling & Inhibition</label>
            <input
              style={{ width: "100%", padding: 10 }}
              type="date"
              name="looseFlapFilling"
              value={motorData.looseFlapFilling}
              onChange={handleMotorChange}
              required
            />
          </div>

          {/* 15 — Propellant Motor Properties (7–8 dropdowns) */}
          <div style={{ gridColumn: "1 / -1" }}>
            <label style={{ display: "block", marginBottom: 6 }}>
              Propellant Motor Properties
            </label>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
              {motorData.propellantMotorProperties.map((val, i) => (
                <div key={`pmp-${i}`} style={{ display: "flex", gap: 6 }}>
                  <select
                    style={{ flex: 1, padding: 10 }}
                    value={val}
                    onChange={(e) =>
                      handleMotorArrayChange(e, i, "propellantMotorProperties")
                    }
                  >
                    {propertyOptions.map((opt) => (
                      <option key={opt} value={opt === "Select" ? "" : opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={() => removeMotorArrayItem("propellantMotorProperties", i)}
                  >
                    ❌
                  </button>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() => addMotorArrayItem("propellantMotorProperties")}
              style={{ marginTop: 8 }}
            >
              ➕ Add Property
            </button>
          </div>

          {/* 16–18 */}
          <div>
            <label>Main Motor NDT</label>
            <input
              style={{ width: "100%", padding: 10 }}
              type="date"
              name="mainMotorNDT"
              value={motorData.mainMotorNDT}
              onChange={handleMotorChange}
              required
            />
          </div>
          <div>
            <label>Date of Readiness for Dispatch</label>
            <input
              style={{ width: "100%", padding: 10 }}
              type="date"
              name="dateOfReadinessForDispatch"
              value={motorData.dateOfReadinessForDispatch}
              onChange={handleMotorChange}
              required
            />
          </div>
          <div>
            <label>Date of Dispatch to Project</label>
            <input
              style={{ width: "100%", padding: 10 }}
              type="date"
              name="dateOfDispatch"
              value={motorData.dateOfDispatch}
              onChange={handleMotorChange}
              required
            />
          </div>

          {/* 19 — Status: date + text */}
          <div>
            <label>Status Date</label>
            <input
              style={{ width: "100%", padding: 10 }}
              type="date"
              name="motorStatusDate"
              value={motorData.motorStatusDate}
              onChange={handleMotorChange}
              required
            />
          </div>
          <div>
            <label>Status Details</label>
            <textarea
              style={{ width: "100%", padding: 10, minHeight: 80 }}
              name="motorStatusText"
              value={motorData.motorStatusText}
              onChange={handleMotorChange}
              placeholder="Status generation notes / observations / approvals"
            />
          </div>

          <button
            type="submit"
            style={{
              gridColumn: "1 / -1",
              padding: 12,
              background: "#43A047",
              color: "#fff",
              border: "none",
            }}
          >
            Save Motor Process Details
          </button>
        </form>
      )}

      {/* (Optional) Existing projects list below, unchanged */}
      {projects?.length ? (
        <>
          <h3 style={{ marginTop: 24 }}>Existing Projects</h3>
          <ul>
            {projects.map((p) => (
              <li key={p._id}>
                <strong>{p.name}</strong> ({p.code}) —{" "}
                {p.date ? new Date(p.date).toLocaleDateString() : ""}
              </li>
            ))}
          </ul>
        </>
      ) : null}
    </div>
  );
}

export default App;

















