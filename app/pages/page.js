"use client";
import React, { useEffect, useState } from 'react';
import DOMPurify from 'dompurify';
import toast from 'react-hot-toast';

const ITEMS_PER_PAGE = 1;

export default function GeneratedWebsite() {
  const [componentStrings, setComponentStrings] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComponents = async () => {
      try {
        const response = await fetch('/api/getComponent');
        const data = await response.json();
        setComponentStrings(data.componentCodes || []);
      } catch (error) {
        console.error('Error fetching components:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchComponents();
  }, []);

  const createMarkup = (htmlString) => {
    return { __html: DOMPurify.sanitize(htmlString) };
  };

  const handleNext = () => {
    if (currentPage < Math.ceil(componentStrings.length / ITEMS_PER_PAGE) - 1) {
      setCurrentPage(currentPage + 1);
    } else{
      toast.error('No more components to display');
    }
  };

  const handleBack = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const startIndex = currentPage * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentComponents = componentStrings.slice(startIndex, endIndex);

  return (
    <div>
      <header className="fixed top-0 left-0 right-0 bg-gray-800 text-white p-4 flex justify-between items-center z-10">
        <button 
          onClick={handleBack}
          disabled={currentPage === 0}
          className="bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded"
        >
          Back
        </button>
        <button 
          onClick={handleNext}
          disabled={currentPage >= Math.ceil(componentStrings.length / ITEMS_PER_PAGE) - 1}
          className="bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded"
        >
          Next
        </button>
      </header>
      <main className="pt-16 min-h-screen w-full">
        {loading ? (
          <div className="flex flex-col items-center">
            <p className="mt-4 text-gray-700">Loading components...</p>
          </div>
        ) : (
          currentComponents.length > 0 ? (
            currentComponents.map((componentCode, index) => (
              <div key={index} dangerouslySetInnerHTML={createMarkup(componentCode)} />
            ))
          ) : (
            <div className="flex flex-col items-center">
            <p className="mt-4 text-gray-700">No components found</p>
          </div>
          )
        )}
      </main>
      
    </div>
  );
}
