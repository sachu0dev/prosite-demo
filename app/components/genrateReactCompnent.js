import React from 'react';
import ReactDOMServer from 'react-dom/server';
import AboutComponent from "./templates/AboutComponent";
import ContactComponent from "./templates/ContactComponent";
import HeaderComponent from "./templates/HeaderComponent";
import ProjectsComponent from "./templates/ProjectsComponent";
import ServicesComponent from "./templates/ServicesComponent";
import TemlateComponent from './templates/TemlateComponenet';

const componentMap = {
  HeaderComponent,
  AboutComponent,
  ServicesComponent,
  ProjectsComponent,
  ContactComponent,
  TemlateComponent,
};

export function generateReactComponent(components, backgroundImage = '') {
  const componentsMarkup = components.map((comp) => {
    const Component = componentMap[comp.component];
    return Component ? ReactDOMServer.renderToStaticMarkup(<Component key={comp.id} />) : '';
  }).join('');

  // Inline styles for background
  const style = {
    backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'linear-gradient(to right, #c9d6ff, #e2e2e2)',
    backgroundColor: backgroundImage ? undefined : '#c9d6ff',
  };

  // Convert style object to CSS string
  const styleString = Object.entries(style)
    .map(([key, value]) => `${key.replace(/([A-Z])/g, '-$1').toLowerCase()}:${value}`)
    .join(';');

  const componentString = `
    <div 
      style="${styleString}"
      className="flex p-4 flex-col items-center justify-center w-full min-h-screen bg-cover bg-center bg-no-repeat"
    >
      ${componentsMarkup}
    </div>
  `;

  return componentString;
}
