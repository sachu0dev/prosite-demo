import { useRef, useState, useCallback } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import ComponentRenderer from './ComponentRenderer';
import Image from 'next/image';
import { Resizable } from 'react-resizable';
import 'react-resizable/css/styles.css';
import Draggable from 'react-draggable';
import { IoRemoveOutline } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { setImage } from '@/redux/PrositeSlice';

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
      <button 
        className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full"
        onClick={() => onRemoveComponent(index)}
      >
       <IoRemoveOutline />
      </button>
    </div>
  );
};

const DraggableResizableImage = ({ id, src, index, moveImage, onRemoveComponent }) => {
  const [position, setPosition] = useState({ x: index * 10, y: index * 10 });
  const [size, setSize] = useState({ width: 100, height: 100 });
  const [isResizing, setIsResizing] = useState(false);

  const [{ isDragging }, drag, preview] = useDrag({
    type: 'image',
    item: { id, index, type: 'image' },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const onResize = (event, { size }) => {
    setSize(size);
  };

  const onResizeStart = () => {
    setIsResizing(true);
  };

  const onResizeStop = (event, { size }) => {
    setIsResizing(false);
    setSize(size);
  };

  const onDrag = useCallback(
    (e, data) => {
      if (!isResizing) {
        setPosition({ x: data.x, y: data.y });
      }
    },
    [isResizing]
  );

  return (
    <Draggable
      position={position}
      onDrag={onDrag}
      disabled={isResizing}
    >
      <Resizable
        width={size.width}
        height={size.height}
        onResize={onResize}
        onResizeStart={onResizeStart}
        onResizeStop={onResizeStop}
        draggableOpts={{ grid: [1, 1] }}
        minConstraints={[50, 50]}
        maxConstraints={[400, 400]}
      >
        <div
          style={{
            width: `${size.width}px`,
            height: `${size.height}px`,
            opacity: isDragging ? 0.5 : 1,
            cursor: isResizing ? 'auto' : 'move',
            position: 'relative',
            border: '1px solid #ddd',
            overflow: 'hidden',
          }}
        >
          <Image 
            src={src} 
            alt="Draggable" 
            layout="fill"
            objectFit="cover"
          />
          <button 
            className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded"
            onClick={() => onRemoveComponent(index)}
          >
            Remove
          </button>
        </div>
      </Resizable>
    </Draggable>
  );
};

export default function Canvas({ components, onRemoveComponent, moveComponent }) {
  const dispatch = useDispatch();
  const backgroundImage = useSelector((state) => state.prosite.bgImg);


  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
  
    reader.onloadend = () => {
      console.log('File loaded:', reader.result); // Debugging line
      dispatch(setImage(`${reader.result}`));
    };
  
    if (file) {
      reader.readAsDataURL(file);
    }
  };
  

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = useCallback((event) => {
    event.preventDefault();
  }, []);

  const moveImage = useCallback((dragIndex, hoverIndex) => {
    moveComponent(dragIndex, hoverIndex);
  }, [moveComponent]);

  const [, drop] = useDrop({
    accept: ['component', 'canvasComponent', 'image'],
    drop: (item, monitor) => {
      return { name: 'Canvas' };
    },
  });

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen">
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 mb-4"
      />
     <div
        ref={drop}
        className="flex-1 p-4 border w-full border-gray-300 rounded-lg min-h-screen bg-white relative"
        style={{ 
          backgroundImage: `url(${backgroundImage})`, 
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {components.map((comp, index) => 
          comp.type === 'image' ? (
            <DraggableResizableImage
              key={comp.id}
              id={comp.id}
              src={comp.src}
              index={index}
              moveImage={moveImage}
              onRemoveComponent={onRemoveComponent}
            />
          ) : (
            <DraggableComponent
              key={comp.id}
              id={comp.id}
              index={index}
              component={comp}
              moveComponent={moveComponent}
              onRemoveComponent={onRemoveComponent}
            />
          )
        )}
      </div>
    </div>
  );
}
