import React from 'react';
import { useDrag } from 'react-dnd';
import { FiMenu, FiHome, FiUser, FiBriefcase, FiMail, FiImage } from 'react-icons/fi';

const COMPONENTS = [
  { id: 1, name: 'Header', icon: <FiHome />, component: 'HeaderComponent' },
  { id: 2, name: 'About', icon: <FiUser />, component: 'AboutComponent' },
  { id: 3, name: 'Services', icon: <FiBriefcase />, component: 'ServicesComponent' },
  { id: 4, name: 'Projects', icon: <FiMenu />, component: 'ProjectsComponent' },
  { id: 5, name: 'Contact', icon: <FiMail />, component: 'ContactComponent' },
  { id: 6, name: 'Template', icon: <FiMenu />, component: 'TemlateComponent' },
  { id: 7, name: 'Image', icon: <FiImage />, component: 'ImageComponent' },
];

export default function Sidebar({ onAddComponent }) {
  return (
    <div className="w-48 mr-5">
      <h2 className="text-xl font-bold mb-4">Components</h2>
      {COMPONENTS.map((comp) => (
        <SidebarItem key={comp.id} component={comp} onAddComponent={onAddComponent} />
      ))}
    </div>
  );
}

function SidebarItem({ component, onAddComponent }) {
  const [{ isDragging }, drag] = useDrag({
    type: component.name === 'Image' ? 'image' : 'component',
    item: { component },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (item && dropResult) {
        onAddComponent(item.component);
      }
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      className={`p-2 mb-2 cursor-pointer border text-white border-gray-300 rounded-lg flex items-center ${
        isDragging ? 'opacity-50' : ''
      }`}
    >
      {component.icon}
      <span className="ml-2">{component.name}</span>
    </div>
  );
}