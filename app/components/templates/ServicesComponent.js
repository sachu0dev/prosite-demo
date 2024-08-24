import React, { useState } from 'react';

export default function ServicesComponent() {
  const [serviceData, setServiceData] = useState([
    { title: 'Web Development', description: 'We build modern and responsive web applications to meet your business needs.' },
    { title: 'UI/UX Design', description: 'Our design team creates intuitive and beautiful user interfaces.' },
    { title: 'SEO Optimization', description: 'Improve your website\'s visibility on search engines with our expert SEO services.' },
  ]);

  const handleTextChange = (index, field, value) => {
    const updatedServices = [...serviceData];
    updatedServices[index][field] = value;
    setServiceData(updatedServices);
  };

  return (
    <section className="py-12 text-center">
      <h2 
        className="text-2xl font-bold mb-6 cursor-pointer hover:text-blue-500" 
        contentEditable 
        onBlur={(e) => handleTextChange(0, 'title', e.target.innerText)}
        aria-label="Section Title"
      >
        Our Services
      </h2>
      <div className="flex flex-wrap justify-center gap-8">
        {serviceData.map((service, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-lg w-full sm:w-80 hover:shadow-xl transition-shadow duration-300">
            <h3
              className="text-xl font-semibold mb-2 cursor-pointer hover:text-blue-500"
              contentEditable
              onBlur={(e) => handleTextChange(index, 'title', e.target.innerText)}
              aria-label={`Service Title ${index + 1}`}
            >
              {service.title}
            </h3>
            <p
              className="text-gray-600"
              contentEditable
              onBlur={(e) => handleTextChange(index, 'description', e.target.innerText)}
              aria-label={`Service Description ${index + 1}`}
            >
              {service.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
