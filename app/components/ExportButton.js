import React from 'react';
import { useSelector } from 'react-redux';
import { generateReactComponent } from './genrateReactCompnent';


export default function ExportButton({ components }) {
  const backgroundImage = useSelector((state) => state.prosite.bgImg);
  
  const handleExportComponent = () => {
    const componentCode = generateReactComponent(components, backgroundImage);

    const blob = new Blob([componentCode], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'GeneratedWebsite.js';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    URL.revokeObjectURL(url);
  };

  return (
    <button className="px-4 py-2 bg-blue-500 text-white rounded-lg" onClick={handleExportComponent}>
      Export as HTML
    </button>
  );
}
