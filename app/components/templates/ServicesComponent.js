import React from 'react';
import { useDispatch } from 'react-redux';
import { setServices, setServicesHeading, addService, removeService } from '@/redux/websiteSlice';

export default function ServicesComponent({ props }) {
  const dispatch = useDispatch();

  const serviceData = props.serviceData;
  const heading = props.heading;

  const handleTextChange = (index, field, value) => {
    if (props.serviceData) {
      const updatedServices = serviceData.map((service, idx) =>
        idx === index ? { ...service, [field]: value } : service
      );
      dispatch(setServices(updatedServices));
    } else {
      console.log('no service data');
    }
  };

  const handleHeadingChange = (e) => {
    const newHeading = e.target.innerText;
    dispatch(setServicesHeading(newHeading));
  };

  const handleAddService = () => {
    dispatch(addService());
  };

  const handleRemoveService = (index) => {
    dispatch(removeService(index));
  };

  return (
    <section id="services" className="py-12 text-center">
      <h2
        className="text-2xl font-bold mb-6 cursor-pointer hover:text-blue-500"
        contentEditable
        onBlur={handleHeadingChange}
        suppressContentEditableWarning
        aria-label="Heading"
      >
        {heading}
      </h2>
      <div className="flex flex-wrap justify-center gap-8">
        {serviceData.map((service, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-lg w-full sm:w-80 hover:shadow-xl transition-shadow duration-300"
          >
            <h3
              className="text-xl font-semibold mb-2 cursor-pointer hover:text-blue-500"
              contentEditable
              onBlur={(e) => handleTextChange(index, 'title', e.target.innerText)}
              suppressContentEditableWarning
              aria-label={`Service Title ${index + 1}`}
            >
              {service.title}
            </h3>
            <p
              className="text-gray-600"
              contentEditable
              onBlur={(e) => handleTextChange(index, 'description', e.target.innerText)}
              suppressContentEditableWarning
              aria-label={`Service Description ${index + 1}`}
            >
              {service.description}
            </p>
            <button
              className="mt-4 text-red-500 hover:text-red-700"
              onClick={() => handleRemoveService(index)}
            >
              Remove Service
            </button>
          </div>
        ))}
      </div>
      <button
        className="mt-6 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
        onClick={handleAddService}
      >
        Add Service
      </button>
    </section>
  );
}
