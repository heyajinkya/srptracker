// src/App.js

import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [projectData, setProjectData] = useState({
    name: '',
    description: '',
    process: '',
    personnel: [], // personnel should be an array
  });

  const handleChange = (e) => {
    setProjectData({
      ...projectData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/api/projects', projectData);
      if (response.status === 200) {
        alert('Project added successfully');
      }
    } catch (error) {
      console.error('Error adding project:', error);
      alert('Error adding project');
    }
  };

  return (
    <div>
      <h1>Add Project</h1>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          name="name" 
          value={projectData.name} 
          onChange={handleChange} 
          placeholder="Project Name" 
          required 
        />
        <textarea 
          name="description" 
          value={projectData.description} 
          onChange={handleChange} 
          placeholder="Description" 
          required 
        />
        <input 
          type="text" 
          name="process" 
          value={projectData.process} 
          onChange={handleChange} 
          placeholder="Process" 
          required 
        />
        {/* You can expand the form with more fields for personnel, images, etc. */}
        <button type="submit">Add Project</button>
      </form>
    </div>
  );
};

export default App;





