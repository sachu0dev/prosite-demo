import React, { useState } from 'react';
import HeaderComponent from './HeaderComponent';
import AboutComponent from './AboutComponent';

export default function TemlateComponent() {
  return (
    <section className="text-center w-full">
      <HeaderComponent />
        <AboutComponent />
    </section>
  );
}
