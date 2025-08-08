import React, { useState, useEffect } from "react";

function App() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [supervisor, setSupervisor] = useState("");
  const [motorName, setMotorName] = useState("");
  const [processName, setProcessName] = useState("");
  const [projects, setProjects] = useState([]);
  const [motorOptions, setMotorOptions] = useState([]);
  const [processOptions, setProcessOptions] = useState([]);

  // ✅ Fetch projects and dropdown options from backend
  useEffect(() => {
    fetch("http://localhost:5000/projects")
      .then((res) => res.json())
      .then((data) => setProjects(data));

    fetch("http://localhost:5000/projects/motors")
      .then((res) => res.json())
      .then((data) => setMotorOptions(data));

    fetch("http://localhost:5000/projects/processes")
      .then((res) => res.json())
      .then((data) => setProcessOptions(data));
  }, []);

  const addProject = () => {
    if (!title || !description || !supervisor || !motorName || !processName) {
      alert("Please fill all fields before adding a project");
      return;
    }

    fetch("http://localhost:5000/projects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
        supervisor,
        motorName,
        processName,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setProjects([...projects, data]);
        setTitle("");
        setDescription("");
        setSupervisor("");
        setMotorName("");
        setProcessName("");
      });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>SRP Project Tracker</h1>

      <input
        type="text"
        placeholder="Project Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <input
        type="text"
        placeholder="Supervisor Name"
        value={supervisor}
        onChange={(e) => setSupervisor(e.target.value)}
      />

      {/* Motor Dropdown */}
      <select
        value={motorName}
        onChange={(e) => setMotorName(e.target.value)}
      >
        <option value="">Select Motor</option>
        {motorOptions.map((motor, index) => (
          <option key={index} value={motor}>
            {motor}
          </option>
        ))}
      </select>

      {/* Process Dropdown */}
      <select
        value={processName}
        onChange={(e) => setProcessName(e.target.value)}
      >
        <option value="">Select Process</option>
        {processOptions.map((process, index) => (
          <option key={index} value={process}>
            {process}
          </option>
        ))}
      </select>

      <button onClick={addProject}>Add Project</button>

      <hr />

      <h2>Projects</h2>
      {projects.map((project) => (
        <div
          key={project._id}
          style={{
            border: "1px solid #ccc",
            margin: "10px",
            padding: "10px",
            borderRadius: "5px",
          }}
        >
          <h3>{project.title}</h3>
          <p>{project.description}</p>
          <p>
            <strong>Supervisor:</strong> {project.supervisor}
          </p>
          <p>
            <strong>Motor:</strong> {project.motorName}
          </p>
          <p>
            <strong>Process:</strong> {project.processName}
          </p>
        </div>
      ))}
    </div>
  );
}

export default App;







