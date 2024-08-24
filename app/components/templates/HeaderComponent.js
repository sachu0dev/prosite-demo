import React, { useState } from 'react';

export default function HeaderComponent() {
  const [name, setName] = useState('John Doe');
  const [username, setUsername] = useState('@johndoe');

  return (
    <div className="flex justify-between items-center p-5 text-white">
      <div className="flex items-center">
        <img 
          src="https://via.placeholder.com/50" 
          alt="Logo" 
          width={50} 
          height={50} 
          className="mr-3" 
        />
        <div>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="text-xs bg-transparent border-none outline-none w-full"
          />
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="text-xs bg-transparent border-none outline-none w-full"
          />
        </div>
      </div>
      <div className="flex gap-5">
        <p>Home</p>
        <p>About</p>
        <p>Contact</p>
      </div>
      <div>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
          Chat
        </button>
      </div>
    </div>
  );
}
