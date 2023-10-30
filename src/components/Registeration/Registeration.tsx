import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAddress } from '@/store/walletSlice';
import { RootState } from '@/store/store';

const ProductRegistration: React.FC = () => {
  const [formData, setFormData] = useState({
    logo: null,
    userName: '',
    description: '',
    website: '',
    twitter: '',
    other: '',
    checkbox: false,
  });
  const dispatch = useDispatch();
  const walletAddress = useSelector((state: RootState) => state.wallet.address);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    // Handle form submission logic here
    console.log(formData);
  };

  return (
    <div className="p-6 border border-grey-100 rounded-lg flex flex-col gap-4">
      <h1 className="text-2xl font-bold">登记您的产品，开始合作</h1>

      <div className="">
        <label className="mb-2 flex items-center text-sm font-bold"><span className='text-red-500'>*</span>上传logo</label>
        <div className="flex items-end p-4">
          <div className="rounded-lg bg-white border border-grey-100 w-16 h-16 flex items-center justify-center">
            <span>+</span>
          </div>
          <span className="ml-4 text-sm">支持svg/jpg/png格式</span>
        </div>
      </div>

      <div className="mb-4">
        <label className="mb-2 flex items-center text-sm font-bold"><span className='text-red-500'>*</span> 产品/品牌名字</label>
        <input
          type="text"
          name="userName"
          value={formData.userName}
          onChange={handleInputChange}
          className="w-full p-2 rounded-full border"
        />
      </div>

      <div className="mb-4">
        <label className="mb-2 flex items-center text-sm font-bold"><span className='text-red-500'>*</span>一句话描述</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          rows={6}
          className="w-full p-2 rounded border"
        ></textarea>
      </div>

      <div className="mb-4">
        <label className="mb-2 flex items-center text-sm font-bold"><span className='text-red-500'>*</span>网站</label>
        <input
          type="text"
          name="website"
          value={formData.website}
          onChange={handleInputChange}
          className="w-full p-2 rounded-full border"
        />
      </div>

      <div className="mb-4">
        <label className="mb-2 flex items-center text-sm font-bold"><span className='text-red-500'>*</span>twitter</label>
        <input
          type="text"
          name="twitter"
          value={formData.twitter}
          onChange={handleInputChange}
          className="w-full p-2 rounded-full border"
        />
      </div>

      <div className="mb-4">
        <label className="mb-2 flex items-center text-sm font-bold">其他</label>
        <input
          type="text"
          name="other"
          value={formData.other}
          onChange={handleInputChange}
          className="w-full p-2 rounded-full border"
        />
      </div>

      <div className="mb-4 flex items-center">
        <input
          type="checkbox"
          name="checkbox"
          checked={formData.checkbox}
          onChange={e => setFormData(prev => ({ ...prev, checkbox: e.target.checked }))}
        />
        <label className="ml-2">确保您填写的信息真实有效</label>
      </div>

      <button onClick={handleSubmit} className="bg-primary text-white px-4 py-2 rounded-full">
        完成登记
      </button>
    </div>
  );
};

export default ProductRegistration;
