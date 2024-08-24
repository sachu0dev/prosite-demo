import React, { useState } from 'react';

export default function HeaderComponent() {
  const [name, setName] = useState('John Doe');
  const [username, setUsername] = useState('@johndoe');

  return (
    <header className="flex items-center justify-between p-4 w-full h-16  text-white">
      <div className="flex items-center space-x-4">
        <img
          src="https://cdn.lazyshop.com/files/9b0d8bde-34c0-460a-b131-e7a87b1e0543/product/8d70b37b103f0d0d50ea94f692ff3e43.jpeg"
          alt="Logo"
          width={50}
          height={50}
          className="mr-3"
        />
        <div className="flex flex-col">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="text-xs bg-transparent border-none outline-none text-white"
            placeholder="Name"
          />
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="text-xs bg-transparent border-none outline-none text-white"
            placeholder="Username"
          />
        </div>
      </div>
      <nav className="flex space-x-4">
        <p className="cursor-pointer">Home</p>
        <p className="cursor-pointer">About</p>
        <p className="cursor-pointer">Contact</p>
      </nav>
      <div>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
          Chat
        </button>
      </div>
    </header>
  );
}
