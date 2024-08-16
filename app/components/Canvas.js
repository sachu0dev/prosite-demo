import React, { useState, useRef } from 'react';
import { useDrop } from 'react-dnd';
import { useDrag } from 'react-dnd';
import ComponentRenderer from './ComponentRenderer';
import { FaArrowAltCircleUp, FaArrowAltCircleDown } from "react-icons/fa";
import { ImCross } from "react-icons/im";

const DraggableComponent = ({ id, component, index, moveComponent, onRemoveComponent }) => {
  const ref = useRef(null);
  const [{ handlerId }, drop] = useDrop({
    accept: 'canvasComponent',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveComponent(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: 'canvasComponent',
    item: () => {
      return { id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  return (
    <div ref={ref} style={{ opacity }} className="relative mb-4" data-handler-id={handlerId}>
      <ComponentRenderer component={component} />
    </div>
  );
};

export default function Canvas({ components, onRemoveComponent, moveComponent }) {
  const [img, setImg] = useState('');

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImg(`url(${reader.result})`);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const [, drop] = useDrop({
    accept: ['component', 'canvasComponent'],
    drop: (item, monitor) => {
      if (item.type === 'component') {
        // Handle dropping new components from sidebar
        return { name: 'Canvas' };
      }
    },
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 mb-4"
      />
      <div
        ref={drop}
        className="flex-1 p-4 border border-gray-300 rounded-lg min-h-screen bg-white"
        style={{ backgroundImage: img, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className={`flex flex-col min-w-[50vw] ${components.length === 0 ? '' : 'p-4'}`}>
          {components.map((comp, index) => (
            <DraggableComponent
              key={comp.id}
              id={comp.id}
              index={index}
              component={comp}
              moveComponent={moveComponent}
              onRemoveComponent={onRemoveComponent}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
