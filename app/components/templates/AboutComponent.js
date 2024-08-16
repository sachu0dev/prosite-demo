
import React, { useState, useRef } from 'react';

export default function AboutComponent() {
  const [mainText, setMainText] = useState('Your One-Stop Shop for Gifting');
  const [subText, setSubText] = useState('We offer a wide variety of gift and combo hampers perfect for any occasion. Join party Bag community today and unlock exclusive discounts!');
  const [buttonText, setButtonText] = useState('Order now');


  const subTextRef = useRef(null)
  const mainTextRef = useRef(null)

  const autoResize = (ref) => {
    if (ref.current) {
      ref.current.style.height = 'auto';
      ref.current.style.height = ref.current.scrollHeight + 'px';
    }
  };

  return (
    <div className="p-5">
       <textarea
          ref={mainTextRef}
          value={mainText}
          onChange={(e) => setMainText(e.target.value)}
          className="text-2xl font-bold bg-transparent border-none outline-none w-full text-center mb-2 resize-none overflow-hidden"
          style={{ whiteSpace: 'pre-wrap' }}
        />
    <textarea
          ref={subTextRef}
          value={subText}
          onChange={(e) => setSubText(e.target.value)}
          className="text-md bg-transparent border-none outline-none w-full text-center mb-8 resize-none overflow-hidden"
          style={{ whiteSpace: 'pre-wrap' }}
        />
      <button className="bg-white text-gray-700 py-2 px-4 ">
        {buttonText}
      </button>

    </div>
  );
}
