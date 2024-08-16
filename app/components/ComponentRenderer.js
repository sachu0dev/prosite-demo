// components/ComponentRenderer.js
import React from 'react';
import HeaderComponent from './templates/HeaderComponent';
import AboutComponent from './templates/AboutComponent';
import ServicesComponent from './templates/ServicesComponent';
import ProjectsComponent from './templates/ProjectsComponent';
import ContactComponent from './templates/ContactComponent';
import TemlateComponent from './templates/TemlateComponenet';

const componentMap = {
  HeaderComponent: HeaderComponent,
  AboutComponent: AboutComponent,
  ServicesComponent: ServicesComponent,
  ProjectsComponent: ProjectsComponent,
  ContactComponent: ContactComponent,
  TemlateComponent: TemlateComponent,
};

export default function ComponentRenderer({ component }) {
  const Component = componentMap[component.component];
  return Component ? <Component /> : null;
}
