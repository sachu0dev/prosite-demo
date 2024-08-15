// components/Canvas.js
import React from 'react';
import { useDrop } from 'react-dnd';
import ComponentRenderer from './ComponentRenderer';

export default function Canvas({ components, onRemoveComponent }) {
  const [{ isOver }, drop] = useDrop({
    accept: 'component',
    drop: (item) => ({ name: 'Canvas' }),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <div
      ref={drop}
      className={`flex-1 p-4 border border-gray-300 rounded-lg min-h-screen bg-white ${isOver ? 'bg-gray-100' : ''}`}
    >
      <div className={`flex flex-col flex-wrap bg-black ${components.length === 0 ? '' : 'p-4'}`}>
      {components.map((comp, index) => (
        <div key={index} className="relative mb-4">
          <ComponentRenderer component={comp} />
          <button
            className="absolute top-0 right-0 text-red-500"
            onClick={() => onRemoveComponent(index)}
          >
            &times;
          </button>
        </div>
      ))}
      </div>
   
    </div>
  );
}
