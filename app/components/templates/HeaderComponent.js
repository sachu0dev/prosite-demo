import { setName, setUsername } from '@/redux/websiteSlice';
import Link from 'next/link';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

export default function HeaderComponent({ props }) {

  const dispatch = useDispatch();

  const handleNameChange = (e) => {
    const newHeading = e.target.innerText;
    dispatch(setName(newHeading));
  };

  const handleUsernameChange = (e) => {
    const newHeading = e.target.innerText;
    dispatch(setUsername(newHeading));
  };

  


  return (
    <header id="header" className="flex items-center justify-between p-4 w-full h-16 text-white">
      <div className="flex items-center space-x-4">
        <img
          src={props?.profileUrl}
          alt="Logo"
          width={50}
          height={50}
          className="mr-3"
        />
        <div className="flex flex-col">
          <p
            className="text-xs bg-transparent border-none outline-none text-white"
            contentEditable
            onBlur={handleNameChange}
            suppressContentEditableWarning={true}
          >
            {props.name}
          </p>
          <p
            className="text-xs bg-transparent border-none outline-none text-white"
            contentEditable
            onBlur={handleUsernameChange}
            suppressContentEditableWarning={true}
          >
            {props.username}
          </p>
        </div>
      </div>
      <nav className="flex space-x-4">
        {props?.navs.map((nav, index) => {
          console.log(nav);
          return (
            <Link
              key={index}
              href={`#${nav}`}
              className="bg-transparent border-none outline-none text-white"
            >
              {nav}
            </Link>
          )
        })}
      </nav>
      <div>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
          Chat
        </button>
      </div>
    </header>
  );
}
