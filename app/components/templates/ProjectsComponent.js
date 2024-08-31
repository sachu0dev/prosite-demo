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
      <h2 
        className="text-2xl font-bold mb-6 cursor-pointer hover:text-blue-500"
        contentEditable
        onBlur={(e) => handleTextChange(0, 'title', e.target.innerText)}
        aria-label="Section Title"
      >
        Our Projects
      </h2>
      <div className="flex flex-wrap justify-center gap-8">
        {projectData.map((project, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-lg w-full sm:w-80">
            <h3
              className="text-xl font-semibold mb-2 cursor-pointer hover:text-blue-500"
              contentEditable
              onBlur={(e) => handleTextChange(index, 'title', e.target.innerText)}
              aria-label={`Project Title ${index + 1}`}
            >
              {project.title}
            </h3>
            <p
              className="text-gray-600"
              contentEditable
              onBlur={(e) => handleTextChange(index, 'description', e.target.innerText)}
              aria-label={`Project Description ${index + 1}`}
            >
              {project.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
