'use client';

import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { useSelector } from 'react-redux';
import AboutComponent from "./templates/AboutComponent";
import ContactComponent from "./templates/ContactComponent";
import HeaderComponent from "./templates/HeaderComponent";
import ProjectsComponent from "./templates/ProjectsComponent";
import ServicesComponent from "./templates/ServicesComponent";
import TemlateComponent from './templates/TemlateComponenet';
import Providers from '@/redux/StoreProvider.js';

const componentMap = {
  HeaderComponent,
  AboutComponent,
  ServicesComponent,
  ProjectsComponent,
  ContactComponent,
  TemlateComponent,
};

const ComponentRenderer = ({ component }) => {
  const websiteState = useSelector((state) => state.website);
  const Component = componentMap[component.component];

  let componentProps;
  switch (component.component) {
    case 'HeaderComponent':      
      componentProps = websiteState.headerState;
      break;
    case 'AboutComponent':
      componentProps = websiteState.aboutState;
      break;
    case 'ServicesComponent':
      componentProps = websiteState.serviceState;
      break;
    case 'ProjectsComponent':
      componentProps = websiteState.projectsState;
      break;
    case 'ContactComponent':
      componentProps = websiteState.contactState;
      break;
    default:
      componentProps = {};
  }

  return Component ? <Component props={componentProps} /> : null;
};

export function generateReactComponent(components, backgroundImage = '') {
  const componentsMarkup = components.map((comp) => {
    return ReactDOMServer.renderToStaticMarkup(
      <Providers >
        <ComponentRenderer key={comp.id} component={comp} />
      </Providers>
    );
  }).join('');

  // Inline styles for background
  const style = {
    backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'linear-gradient(to right, #c9d6ff, #e2e2e2)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
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