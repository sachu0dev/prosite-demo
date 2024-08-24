import React from 'react';
import ReactDOMServer from 'react-dom/server';
import AboutComponent from "./templates/AboutComponent";
import ContactComponent from "./templates/ContactComponent";
import HeaderComponent from "./templates/HeaderComponent";
import ProjectsComponent from "./templates/ProjectsComponent";
import ServicesComponent from "./templates/ServicesComponent";
import TemlateComponent from "./templates/TemlateComponenet";

const componentMap = {
  HeaderComponent,
  AboutComponent,
  ServicesComponent,
  ProjectsComponent,
  ContactComponent,
  TemlateComponent,
};

export function generateReactComponent(components, backgroundImage) {
  const componentsMarkup = components.map((comp) => {
    const Component = componentMap[comp.component];
    return Component ? ReactDOMServer.renderToStaticMarkup(<Component key={comp.id} />) : '';
  }).join('');

  const componentString = `
  import React from 'react';

  export default function GeneratedWebsite() {
    return (
      <div 
        className="flex flex-col items-center justify-center w-full min-h-screen bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: ${`'url(${backgroundImage})'`},
        }}
      >
        ${componentsMarkup}
      </div>
    );
  }
  `;

  return componentString;
}
