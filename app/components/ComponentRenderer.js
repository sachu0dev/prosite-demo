"use client";
import HeaderComponent from './templates/HeaderComponent';
import AboutComponent from './templates/AboutComponent';
import ServicesComponent from './templates/ServicesComponent';
import ProjectsComponent from './templates/ProjectsComponent';
import ContactComponent from './templates/ContactComponent';
import { useDispatch, useSelector } from 'react-redux';

const componentMap = {
  HeaderComponent,
  AboutComponent,
  ServicesComponent,
  ProjectsComponent,
  ContactComponent,
};

export default function ComponentRenderer({ component }) {
  
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
      componentProps = { projects: [{ name: 'Project A' }, { name: 'Project B' }] };
      break;
    case 'ContactComponent':
      componentProps = { email: 'contact@example.com', phone: '123-456-7890' };
      break;
    default:
      componentProps = {};
  }

  return Component ? <Component props={componentProps} /> : null;
}
