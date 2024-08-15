// components/templates/HeaderComponent.js

import React, { useState } from 'react';

export default function HeaderComponent() {
  const [text, setText] = useState('Welcome to My Portfolio');
  const [bgColor, setBgColor] = useState('#000');

  return (
    <div className="p-5 text-white" >
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="text-2xl bg-transparent border-none outline-none w-full"
      />
    </div>
  );
}
