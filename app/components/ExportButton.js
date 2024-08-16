import React from 'react';
import ReactDOMServer from 'react-dom/server';
import ComponentRenderer from './ComponentRenderer';

export default function ExportButton({ components }) {
  const handleExport = () => {
    const htmlContent = components
      .map((comp) => {
        const Component = ComponentRenderer({ component: comp });
        return ReactDOMServer.renderToStaticMarkup(Component);
      })
      .join('');

    const completeHtml = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Exported Portfolio</title>
        <style>
          body { font-family: Arial, sans-serif; }
          .container { max-width: 960px; margin: 0 auto; padding: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          ${htmlContent}
        </div>
      </body>
      </html>
    `;

    const blob = new Blob([completeHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'portfolio.html';
    a.click();
  };

  return (
    <button className="px-4 py-2 bg-blue-500 text-white rounded-lg" onClick={handleExport}>
      Export as HTML
    </button>
  );
}