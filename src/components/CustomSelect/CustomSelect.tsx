import React, { useState } from 'react';

interface CustomSelectProps {
  options: string[];
  onOptionSelected: (selected: string, name: string) => void;
  defaultDisplay: string;
  name: string;
  className?: string;
}

const CustomSelect: React.FC<CustomSelectProps> = ({ options, onOptionSelected, defaultDisplay, name, className = "" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(defaultDisplay || options[0]);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
    onOptionSelected(option, name); // Passing the name as the second argument
  };

  return (
    <div className={`relative ${className} text-sm`}>
      <div className="w-full p-2 cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        {selectedOption}
        <span className="absolute right-2 top-1/2 transform -translate-y-1/2">
          <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M6.293 9.293L10 13l3.707-3.707a.999.999 0 111.414 1.414l-4 4a.999.999 0 01-1.414 0l-4-4a.997.997 0 010-1.414.999.999 0 011.414 0z"/>
          </svg>
        </span>
      </div>
      {isOpen && (
        <div className="absolute bg-white w-full mt-2 border border-gray-300 rounded-md shadow-md z-10">
          {options.map(option => (
            <div key={option} className="p-2 hover:bg-gray-200 cursor-pointer" onClick={() => handleOptionClick(option)}>
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CustomSelect;
