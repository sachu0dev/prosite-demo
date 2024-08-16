import React, { useState } from 'react';
import HeaderComponent from './HeaderComponent';
import AboutComponent from './AboutComponent';

export default function TemlateComponent() {

  const [img, setImg] = useState();

  return (
    <section className="text-center w-full" style={{ backgroundImage: img }}>
      <HeaderComponent />
      <div className="w-[60%] h-[60vh] flex items-center justify-start">
        <AboutComponent />
      </div>
    </section>
  );
}
