import React, { useState, useEffect } from "react";

export default function App() {
  const [projects, setProjects] = useState([]);
  const [name, setName] = useState("");
  const [scientist, setScientist] = useState("");
  const [date, setDate] = useState("");
  const [motor, setMotor] = useState("");
  const [process, setProcess] = useState("");
  const [motorsList, setMotorsList] = useState([]);
  const [processesList, setProcessesList] = useState([]);

  useEffect(() => {
    // Fetch projects
    fetch("http://localhost:5000/api/projects")
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch((err) => console.error("Error fetching projects:", err));

    // Fetch motors
    fetch("http://localhost:5000/api/motors")
      .then((res) => res.json())
      .then((data) => setMotorsList(data))
      .catch((err) => console.error("Error fetching motors:", err));

    // Fetch processes
    fetch("http://localhost:5000/api/processes")
      .then((res) => res.json())
      .then((data) => setProcessesList(data))
      .catch((err) => console.error("Error fetching processes:", err));
  }, []);

  const addProject = () => {
    if (!name || !scientist || !date || !motor || !process) {
      alert("Please fill in all fields.");
      return;
    }

    fetch("http://localhost:5000/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, scientist, date, motor, process }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to add project");
        return res.json();
      })
      .then((newProject) => {
        setProjects([...projects, newProject]);
        setName("");
        setScientist("");
        setDate("");
        setMotor("");
        setProcess("");
      })
      .catch((err) => console.error("Error adding project:", err));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>SRP Tracker</h1>

      <div style={{ marginBottom: "15px" }}>
        <input
          type="text"
          placeholder="Project Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Scientist Name"
          value={scientist}
          onChange={(e) => setScientist(e.target.value)}
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <select value={motor} onChange={(e) => setMotor(e.target.value)}>
          <option value="">Select Motor</option>
          {motorsList.map((m, index) => (
            <option key={index} value={m}>
              {m}
            </option>
          ))}
        </select>

        <select value={process} onChange={(e) => setProcess(e.target.value)}>
          <option value="">Select Process</option>
          {processesList.map((p, index) => (
            <option key={index} value={p}>
              {p}
            </option>
          ))}
        </select>

        <button onClick={addProject}>Add Project</button>
      </div>

      <h2>Projects List</h2>
      <ul>
        {projects.map((proj, index) => (
          <li key={index}>
            <strong>{proj.name}</strong> — {proj.scientist} — {proj.date} —{" "}
            {proj.motor} — {proj.process}
          </li>
        ))}
      </ul>
    </div>
  );
}










