'use client'
import React, { useState, useRef, useEffect } from 'react';

const PublicRequirements: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const descriptionRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (descriptionRef.current) {
      const element = descriptionRef.current;
      setIsOverflowing(element.scrollHeight > element.clientHeight);
    }
  }, []);
  return (
    <div className="flex flex-col border p-4 mb-4 rounded gap-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className='rounded-full bg-purple-100 w-10 h-10'></div>
          {/* <img src="/path/to/avatar.jpg" alt="Avatar" className="w-10 h-10 rounded-full mr-2" /> */}
          <span className='text-textSecondary font-bold'>Project Name</span>
        </div>
        <span className="px-2 py-1 bg-purple-100 text-primary rounded text-sm">$1000</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="bg-purple-100 text-purple-500 p-1 rounded text-xs">Tech</span>
        <span className='text-xs text-textSecondary'>2023-10-01</span>
      </div>
      <h2 className="text-xl font-bold mb-2">Sample Title</h2>
      <p className="line-clamp-2 text-sm text-textSecondary" ref={descriptionRef}>
        This is a detailed description about the project...
        {isOverflowing && (isExpanded ? (
          <span onClick={() => setIsExpanded(false)} className="text-primary cursor-pointer">收起</span>
        ) : (
          <span onClick={() => setIsExpanded(true)} className="text-primary cursor-pointer">...展开</span>
        ))}
      </p>
      <button className="mt-2 w-24 text-sm bg-primary text-white p-2 rounded-full">申请</button>
    </div>
  );
};

export default PublicRequirements;
