import React from 'react';

interface ConfirmModalProps {
  title: string;
  introduction: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ title, introduction, onConfirm, onCancel }) => {
  return (
    <div className="p-4 bg-white rounded-md">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <p className="mb-4">{introduction}</p>
      <div className="flex justify-end space-x-4">
        <button onClick={onCancel} className="px-4 py-2 rounded-md border border-gray-300">
          取消
        </button>
        <button onClick={onConfirm} className="bg-blue-500 text-white px-4 py-2 rounded-md">
          确认
        </button>
      </div>
    </div>
  );
};

export default ConfirmModal;
