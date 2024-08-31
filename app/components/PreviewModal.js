import React from 'react';
import ComponentRenderer from './ComponentRenderer';

export default function PreviewModal({ components, onClose }) {
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
      <div className="bg-white rounded-lg p-5 w-full max-w-4xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Preview</h2>
          <button className="btn btn-secondary" onClick={onClose}>
            Close
          </button>
        </div>
        <div className="preview-content max-h-[80vh] overflow-y-auto bg-black p-4">
          {components.map((comp, index) => (
            <ComponentRenderer key={index} component={comp} />
          ))}
        </div>
      </div>
    </div>
  );
}
