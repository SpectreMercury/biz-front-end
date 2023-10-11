import React, { useState } from 'react';

interface GlobalAlertProps {
  message: string[];
  type: 'success' | 'error' | null;
}


const GlobalAlert: React.FC<GlobalAlertProps> = ({ message, type }) => {
  const [isVisible, setIsVisible] = useState(true);

  if (!message.length || !isVisible) return null;

  const bgColor = type === 'success' ? 'bg-green-500' : 'bg-red-500';
  const borderColor = type === 'success' ? 'border-green-400' : 'border-red-400';
  const textColor = type === 'success' ? 'text-green-700' : 'text-red-700';

  return (
    <div className='fixed inset-x-0 max-w-max mx-auto z-10' role="alert">
      <div className={`w-[640px] ${bgColor} text-white font-bold rounded-t px-4 py-2`}>
        {type === 'success' ? 'Success' : 'Error'}
      </div>
      <div className={`w-[640px] border bg-white z-10 border-t-0 ${borderColor} rounded-b px-4 py-3 ${textColor}`}>
        <ul>
          {message.map((msg, index) => (
            <li key={index}>• {msg}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default GlobalAlert;
