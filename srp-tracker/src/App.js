import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css"; // We'll style separately

function App() {
  const [project, setProject] = useState({
    title: "",
    description: "",
    supervisor: "",
  });
  const [projects, setProjects] = useState([]);

  const handleChange = (e) => {
    setProject({ ...project, [e.target.name]: e.target.value });
  };

  const addProject = async () => {
    if (!project.title || !project.description || !project.supervisor) return;
    await axios.post("http://localhost:5000/api/projects", FormData);
    setProject({ title: "", description: "", supervisor: "" });
    fetchProjects();
  };

  const fetchProjects = async () => {
    const res = await axios.get("http://localhost:5000/api/projects");
    setProjects(res.data);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="container">
      <h1>SRP Project Tracker</h1>
      <div className="form">
        <input
          type="text"
          name="title"
          value={project.title}
          onChange={handleChange}
          placeholder="Project Title"
        />
        <input
          type="text"
          name="description"
          value={project.description}
          onChange={handleChange}
          placeholder="Description"
        />
        <input
          type="text"
          name="supervisor"
          value={project.supervisor}
          onChange={handleChange}
          placeholder="Supervisor Name"
        />
        <button onClick={addProject}>Add Project</button>
      </div>

      <h2>All Projects</h2>
      <div className="projects">
        {projects.map((p, i) => (
          <div className="project-card" key={i}>
            <h3>{p.title}</h3>
            <p>{p.description}</p>
            <p><strong>Supervisor:</strong> {p.supervisor}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;



