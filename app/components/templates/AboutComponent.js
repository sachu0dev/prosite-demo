import React, { useState, useRef, useEffect } from 'react';

export default function AboutComponent() {
  const [mainText, setMainText] = useState('Your One-Stop Shop for Gifting');
  const [subText, setSubText] = useState('We offer a wide variety of gift and combo hampers perfect for any occasion. Join party Bag community today and unlock exclusive discounts!');
  const [buttonText, setButtonText] = useState('Order now');

  const subTextRef = useRef(null);
  const mainTextRef = useRef(null);

  const autoResize = (ref) => {
    if (ref.current) {
      // Reset the height to auto before setting the new height
      ref.current.style.height = 'auto';
      // Set the new height based on scrollHeight
      ref.current.style.height = `${ref.current.scrollHeight}px`;
    }
  };

  useEffect(() => {
    // Trigger resize on component mount and whenever the text changes
    autoResize(mainTextRef);
    autoResize(subTextRef);
  }, [mainText, subText]);

  return (
    <div className="w-[60%] h-[60vh] flex items-center justify-start">
      <div className="p-5">
        <textarea
          ref={mainTextRef}
          value={mainText}
          onChange={(e) => setMainText(e.target.value)}
          className="text-2xl font-bold bg-transparent border-none outline-none w-full text-center mb-2 resize-none overflow-hidden"
        />
        <textarea
          ref={subTextRef}
          value={subText}
          onChange={(e) => setSubText(e.target.value)}
          className="text-md bg-transparent border-none outline-none w-full text-center mb-8 resize-none overflow-hidden"
        />
        <button className="bg-white text-gray-700 py-2 px-4">
          {buttonText}
        </button>
      </div>
    </div>
  );
}
