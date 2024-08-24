"use client";
import React, { useState, useCallback } from 'react';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import Sidebar from './Sidebar';
import Canvas from './Canvas';
import PreviewModal from './PreviewModal';
import ExportButton from './ExportButton';
import { useRouter } from 'next/navigation';

export default function Builder() {
  const [components, setComponents] = useState([]);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const router = useRouter();

  const handleAddComponent = (component) => {

    if (component.name === 'Image') {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.onchange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
          const newComponent = { id: Date.now(), type: 'image', src: reader.result };
          console.log('Adding new image component:', newComponent);
          setComponents(prevComponents => {
            const updatedComponents = [...prevComponents, newComponent];
            console.log('Updated components:', updatedComponents);
            return updatedComponents;
          });
        };
        reader.readAsDataURL(file);
      };
      input.click();
    }  else {
      setComponents(prevComponents => [
        ...prevComponents, 
        { ...component, id: Date.now(), type: 'component' }
      ]);
    }
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

  const handleRoute = () => {
    router.push('/pages');
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex p-5 ">
        <div className="mr-4">
          <button className="btn btn-primary text-white m-2 bg-blue-500 p-2 rounded-md" onClick={handleRoute}>
            My Prosites
          </button>
          <ExportButton components={components} />
          <Sidebar onAddComponent={handleAddComponent} />
        </div>
        <div className="flex-grow w-full">
        <Canvas
          components={components}
          onRemoveComponent={handleRemoveComponent}
          moveComponent={moveComponent}
        />
        </div>
        
        {isPreviewOpen && <PreviewModal components={components} onClose={handleClosePreview} />}
      </div>
    </DndProvider>
  );
}
