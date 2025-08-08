import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [projects, setProjects] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    status: "",
    startDate: "",
    motorName: "",
    processName: "",
  });
  const [motors, setMotors] = useState([]);
  const [processes, setProcesses] = useState([]);

  // Fetch projects
  const fetchProjects = async () => {
    const res = await axios.get("http://localhost:5000/projects");
    setProjects(res.data);
  };

  // Fetch motors and processes from backend
  const fetchDropdownData = async () => {
    const motorsRes = await axios.get("http://localhost:5000/projects/motors");
    setMotors(motorsRes.data);

    const processesRes = await axios.get(
      "http://localhost:5000/projects/processes"
    );
    setProcesses(processesRes.data);
  };

  useEffect(() => {
    fetchProjects();
    fetchDropdownData();
  }, []);

  // Handle form change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Submit form
  const handleSubmit = async () => {
    await axios.post("http://localhost:5000/projects", formData);
    fetchProjects();
    setFormData({
      name: "",
      status: "",
      startDate: "",
      motorName: "",
      processName: "",
    });
  };

  return (
    <div>
      <h1>SRP Project Tracker</h1>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
      />
      <input
        type="text"
        name="status"
        placeholder="Status"
        value={formData.status}
        onChange={handleChange}
      />
      <input
        type="date"
        name="startDate"
        value={formData.startDate}
        onChange={handleChange}
      />

      {/* Motor Dropdown */}
      <select
        name="motorName"
        value={formData.motorName}
        onChange={handleChange}
      >
        <option value="">Select Motor</option>
        {motors.map((motor, idx) => (
          <option key={idx} value={motor}>
            {motor}
          </option>
        ))}
      </select>

      {/* Process Dropdown */}
      <select
        name="processName"
        value={formData.processName}
        onChange={handleChange}
      >
        <option value="">Select Process</option>
        {processes.map((process, idx) => (
          <option key={idx} value={process}>
            {process}
          </option>
        ))}
      </select>

      <button onClick={handleSubmit}>Add Project</button>

      <h2>Projects</h2>
      <ul>
        {projects.map((project, idx) => (
          <li key={idx}>
            {project.name} - {project.motorName} - {project.processName}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;








