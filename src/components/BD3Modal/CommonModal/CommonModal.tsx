import React, { useState } from 'react';

interface ModalProps {
  title: string;
  showUpload?: boolean;
  onSubmit: (text: string, file?: File) => void;
}

const Modal: React.FC<ModalProps> = ({ title, showUpload, onSubmit }) => {
  const [text, setText] = useState('');
  const [file, setFile] = useState<File>();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    } else {
      setFile(undefined);
    }
  };

  const handleSubmit = () => {
    onSubmit(text, file);
  };


  return (
    <div className="p-4 bg-white rounded-md">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <textarea
        rows={4}
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full p-2 mb-4 bg-gray-100 rounded-md outline-none"
        placeholder="Enter your text..."
      ></textarea>
      {showUpload && (
        <>
          <h3 className="text-lg font-bold mb-2">Upload Image *</h3>
          <div className="border-dashed border-2 p-4 mb-4 rounded-md flex items-center justify-center">
            <label className="cursor-pointer">
              <input type="file" className="hidden" onChange={handleFileChange} accept=".svg,.png,.jpg" />
              <span className="text-gray-500">+</span>
            </label>
          </div>
          <p className="mb-4 text-gray-500">(支持svg/png/jpg格式)</p>
        </>
      )}
      <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded-md">
        发送
      </button>
    </div>
  );
};

export default Modal;
