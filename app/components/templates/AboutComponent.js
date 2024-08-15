// components/templates/AboutComponent.js

import React, { useState } from 'react';

export default function AboutComponent() {
  const [text, setText] = useState('About Me');

  return (
    <div className="p-5">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="text-xl bg-transparent border-none outline-none w-full"
      />
    </div>
  );
}
