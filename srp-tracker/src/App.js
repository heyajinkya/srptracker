import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    supervisor: ""
  });

  // Load projects on page load
  useEffect(() => {
    axios.get("http://localhost:5000/api/projects")
      .then(res => setProjects(res.data))
      .catch(err => console.log(err));
  }, []);

  // Handle form change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form)
    axios.post("http://localhost:5000/api/projects", form)
      .then(res => {
        setProjects([...projects, res.data]);
        setForm({ title: "", description: "", supervisor: "" });
      })
      .catch(err => console.log(err));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>SRP Project Tracker</h1>

      <form onSubmit={handleSubmit}>
        <input name="title" value={form.title} onChange={handleChange} placeholder="Title" required />
        <br />
        <input name="description" value={form.description} onChange={handleChange} placeholder="Description" required />
        <br />
        <input name="supervisor" value={form.supervisor} onChange={handleChange} placeholder="Supervisor" required />
        <br />
        <button type="submit">Add Project</button>
      </form>

      <h2>All Projects</h2>
      <ul>
        {projects.map((proj, index) => (
          <li key={index}>
            <strong>{proj.title}</strong> - {proj.description} (Supervisor: {proj.supervisor})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;


