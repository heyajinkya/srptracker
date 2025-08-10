import React, { useState, useEffect } from 'react';

function App() {
  const [projects, setProjects] = useState([]);
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [date, setDate] = useState('');
  const [motor, setMotor] = useState('');
  const [process, setProcess] = useState('');
  const [motorsList, setMotorsList] = useState([]);
  const [processesList, setProcessesList] = useState([]);

  // Fetch projects, motors, processes
  useEffect(() => {
    fetch('/api/projects')
      .then(res => res.json())
      .then(data => setProjects(data))
      .catch(err => console.error(err));

    fetch('/api/motors')
      .then(res => res.json())
      .then(data => setMotorsList(data))
      .catch(err => console.error(err));

    fetch('/api/processes')
      .then(res => res.json())
      .then(data => setProcessesList(data))
      .catch(err => console.error(err));
  }, []);

  // Add new project
  const addProject = () => {
    if (!name || !code || !date || !motor || !process) {
      alert('Please fill all fields');
      return;
    }

    fetch('/api/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, code, date, motor, process })
    })
      .then(res => res.json())
      .then(data => {
        alert(data.message);
        // Refresh list
        return fetch('/api/projects');
      })
      .then(res => res.json())
      .then(data => setProjects(data))
      .catch(err => console.error(err));
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>SRP Tracker</h1>
      <input
        type="text"
        placeholder="Project Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Project Code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      {/* Motors dropdown */}
      <select value={motor} onChange={(e) => setMotor(e.target.value)}>
        <option value="">Select Motor</option>
        {motorsList.map((m, index) => (
          <option key={index} value={m}>{m}</option>
        ))}
      </select>

      {/* Processes dropdown */}
      <select value={process} onChange={(e) => setProcess(e.target.value)}>
        <option value="">Select Process</option>
        {processesList.map((p, index) => (
          <option key={index} value={p}>{p}</option>
        ))}
      </select>

      <button onClick={addProject}>Add Project</button>

      <h2>Projects List</h2>
      <ul>
        {projects.map((p, index) => (
          <li key={index}>
            {p.name} - {p.code} - {p.date} - {p.motor} - {p.process}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;











