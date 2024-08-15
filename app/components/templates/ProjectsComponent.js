import React, { useState } from 'react';

export default function ProjectsComponent() {
  const [projectData, setProjectData] = useState([
    { title: 'Project Alpha', description: 'A cutting-edge web application for e-commerce businesses.' },
    { title: 'Project Beta', description: 'A mobile app that enhances user experience through AI-driven insights.' },
    { title: 'Project Gamma', description: 'A robust content management system tailored for creative professionals.' },
  ]);

  const handleTextChange = (index, field, value) => {
    const updatedProjects = [...projectData];
    updatedProjects[index][field] = value;
    setProjectData(updatedProjects);
  };

  return (
    <section className="py-12 text-center">
      <h2 className="text-2xl font-bold mb-6" contentEditable onBlur={(e) => handleTextChange(0, 'title', e.target.innerText)}>
        Our Projects
      </h2>
      <div className="flex justify-center space-x-8">
        {projectData.map((project, index) => (
          <div key={index} className="bg-gray-100 p-6 rounded-lg shadow-lg">
            <h3
              className="text-xl font-semibold mb-2"
              contentEditable
              onBlur={(e) => handleTextChange(index, 'title', e.target.innerText)}
            >
              {project.title}
            </h3>
            <p
              className="text-gray-600"
              contentEditable
              onBlur={(e) => handleTextChange(index, 'description', e.target.innerText)}
            >
              {project.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
