import React, { useState } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (reason: string) => void;
}

const AppliedDialog: React.FC<ModalProps> = ({ isOpen, onClose, onApply }) => {
  const [reason, setReason] = useState<string>('');

  if (!isOpen) return null;

  const handleApply = () => {
    onApply(reason);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="w-[584px] h-[190px] bg-white p-4 rounded shadow-lg rounded-lg">
        <div className="flex items-center mb-4">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.58825 14.8238L12.8107 2.37891C12.8579 2.28453 13.0001 2.31811 13.0001 2.42364V9.26151C13.0001 9.61524 13.3574 9.85712 13.6858 9.72575L16.7791 8.48844C17.206 8.31769 17.6176 8.76507 17.412 9.17629L11.1896 21.6211C11.1424 21.7155 11.0001 21.6819 11.0001 21.5764V14.7385C11.0001 14.3848 10.6429 14.1429 10.3144 14.2743L7.22116 15.5116C6.79428 15.6824 6.38264 15.235 6.58825 14.8238Z" fill="#437EF7"/>
          </svg>
          <span className="ml-2 font-bold">申请</span>
        </div>
        <div className="mb-4">
          <textarea 
            className="rounded p-2 w-full" 
            placeholder="输入理由" 
            value={reason} 
            onChange={(e) => setReason(e.target.value)}
          />
        </div>
        <div className="flex justify-end gap-2">
          <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full" onClick={onClose}>
            取消
          </button>
          <button className="bg-primary hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full" onClick={handleApply}>
            申请
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppliedDialog;
