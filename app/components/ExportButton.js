import React from 'react';
import { useSelector } from 'react-redux';
import { generateReactComponent } from './genrateReactCompnent';
import toast from 'react-hot-toast';

export default function ExportButton({ components }) {
  const backgroundImage = useSelector((state) => state.website.bgImg);

  const handleExportComponent = async () => {
    const componentCode = generateReactComponent(components, backgroundImage);

    try {
      const response = await fetch('/api/saveComponent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ componentCode }),
      });

      if (response.ok) {
        toast.success('Component saved successfully!');
      } else {
        toast.error('Error saving component.');
      }
    } catch (error) {
      console.error('Error saving component:', error);
      toast.error('Error saving component.');
    }
  };

  return (
    <button className="px-4 py-2 bg-blue-500 text-white rounded-lg" onClick={handleExportComponent}>
      Deploy
    </button>
  );
}
