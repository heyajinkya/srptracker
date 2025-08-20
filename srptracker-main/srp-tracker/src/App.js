// src/App.js
import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
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

  // Fetch projects from backend
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/projects")
      .then((res) => setProjects(res.data))
      .catch((err) => console.error(err));
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle dynamic array change
  const handleArrayChange = (e, index, field) => {
    const newArray = [...formData[field]];
    newArray[index] = e.target.value;
    setFormData({ ...formData, [field]: newArray });
  };

  // Add new officer input
  const handleAddField = (field) => {
    setFormData({ ...formData, [field]: [...formData[field], ""] });
  };

  // Remove officer input
  const handleRemoveField = (field, index) => {
    const newArray = formData[field].filter((_, i) => i !== index);
    setFormData({ ...formData, [field]: newArray });
  };

  // Handle file upload
  const handleFileChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        if (Array.isArray(formData[key])) {
          formData[key].forEach((item) => data.append(key, item));
        } else {
          data.append(key, formData[key]);
        }
      });
      if (photo) {
        data.append("photo", photo);
      }

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

  return (
    <div style={{ padding: "20px" }}>
      <h2>SRP Tracker - Add Project</h2>
      <form onSubmit={handleSubmit} style={{ display: "grid", gap: "10px", maxWidth: "600px" }}>
        <input type="text" name="name" placeholder="Project Name" value={formData.name} onChange={handleChange} required />
        <input type="text" name="code" placeholder="Project Code" value={formData.code} onChange={handleChange} required />
        <input type="date" name="date" value={formData.date} onChange={handleChange} required />

        <textarea name="objective" placeholder="Objective as per PDR" value={formData.objective} onChange={handleChange} />

        <textarea name="scopeLab" placeholder="Scope of Work of Laboratory" value={formData.scopeLab} onChange={handleChange} />

        <textarea name="scopeSRP" placeholder="Scope of SRP" value={formData.scopeSRP} onChange={handleChange} />

        {/* DRDS Officers */}
        <label>DRDS Officers:</label>
        {formData.drdsOfficers.map((officer, index) => (
          <div key={index} style={{ display: "flex", gap: "5px" }}>
            <input
              type="text"
              value={officer}
              onChange={(e) => handleArrayChange(e, index, "drdsOfficers")}
              placeholder="Enter DRDS Officer"
            />
            <button type="button" onClick={() => handleRemoveField("drdsOfficers", index)}>❌</button>
          </div>
        ))}
        <button type="button" onClick={() => handleAddField("drdsOfficers")}>➕ Add DRDS Officer</button>

        {/* DRTC Officers */}
        <label>DRTC Officers:</label>
        {formData.drtcOfficers.map((officer, index) => (
          <div key={index} style={{ display: "flex", gap: "5px" }}>
            <input
              type="text"
              value={officer}
              onChange={(e) => handleArrayChange(e, index, "drtcOfficers")}
              placeholder="Enter DRTC Officer"
            />
            <button type="button" onClick={() => handleRemoveField("drtcOfficers", index)}>❌</button>
          </div>
        ))}
        <button type="button" onClick={() => handleAddField("drtcOfficers")}>➕ Add DRTC Officer</button>

        {/* GoCo Manpower */}
        <label>GoCo Manpower:</label>
        {formData.gocoManpower.map((worker, index) => (
          <div key={index} style={{ display: "flex", gap: "5px" }}>
            <input
              type="text"
              value={worker}
              onChange={(e) => handleArrayChange(e, index, "gocoManpower")}
              placeholder="Enter Worker Name"
            />
            <button type="button" onClick={() => handleRemoveField("gocoManpower", index)}>❌</button>
          </div>
        ))}
        <button type="button" onClick={() => handleAddField("gocoManpower")}>➕ Add Worker</button>

        <input type="file" accept="image/jpeg" onChange={handleFileChange} />

        <button type="submit">Add Project</button>
      </form>

      <h2 style={{ marginTop: "30px" }}>Existing Projects</h2>
      <ul>
        {projects.map((p) => (
          <li key={p._id}>
            <strong>{p.name}</strong> ({p.code}) - {new Date(p.date).toLocaleDateString()}
            <br />
            DRDS: {p.drdsOfficers?.join(", ")} <br />
            DRTC: {p.drtcOfficers?.join(", ")} <br />
            GoCo: {p.gocoManpower?.join(", ")}
            <br />
            {p.photo && <img src={`http://localhost:8000${p.photo}`} alt="project" width="100" />}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;




