"use client";
import React, { useState, useCallback } from 'react';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import Sidebar from './Sidebar';
import Canvas from './Canvas';
import PreviewModal from './PreviewModal';
import ExportButton from './ExportButton';

export default function Builder() {
  const [components, setComponents] = useState([]);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const handleAddComponent = (component) => {
    setComponents([...components, { ...component, id: Date.now() }]);
  };

  const handleRemoveComponent = (index) => {
    setComponents(components.filter((_, i) => i !== index));
  };

  const handlePreview = () => {
    setIsPreviewOpen(true);
  };

  const handleClosePreview = () => {
    setIsPreviewOpen(false);
  };

  const moveComponent = useCallback((dragIndex, hoverIndex) => {
    setComponents((prevComponents) => {
      const updatedComponents = [...prevComponents];
      const [draggedComponent] = updatedComponents.splice(dragIndex, 1);
      updatedComponents.splice(hoverIndex, 0, draggedComponent);
      return updatedComponents;
    });
  }, []);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex p-5 justify-between">
        <Sidebar onAddComponent={handleAddComponent} />
        <Canvas
          components={components}
          onRemoveComponent={handleRemoveComponent}
          moveComponent={moveComponent}
        />
        <div className="ml-4">
          <button className="btn btn-primary mr-2" onClick={handlePreview}>
            Preview
          </button>
          <ExportButton components={components} />
        </div>
        {isPreviewOpen && <PreviewModal components={components} onClose={handleClosePreview} />}
      </div>
    </DndProvider>
  );
}