'use client'

import React, { useState, ChangeEvent } from 'react';
import CustomSelect from '@/components/CustomSelect/CustomSelect';

function PostRequirements() {
  const [formData, setFormData] = useState({
    title: '',
    type: '',
    description: '',
    budget: '',
    currency: '',
    startTime: '',
    endTime: ''
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center">
      <div className="box-border w-[640px] bg-white m-8 p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">发布合作需求</h1>

        <label className="block text-sm font-medium mb-2">标题</label>
        <input 
          type="text" 
          name="title" 
          value={formData.title} 
          onChange={handleInputChange} 
          className="w-full p-2 mb-4 bg-gray-100 text-sm rounded-full"
          placeholder="请输入标题"
        />

        <label className="block text-sm font-medium mb-2">类型</label>
        <CustomSelect 
          name="type"
          options={['Option 1', 'Option 2']}
          onOptionSelected={(selected, name) => {
            setFormData(prev => ({ ...prev, [name]: selected }));
          }}
          defaultDisplay="请选择类型"
          className="w-full mb-4"
        />

        <label className="block text-sm font-medium mb-2">详细描述</label>
        <textarea 
          name="description" 
          value={formData.description} 
          onChange={handleInputChange} 
          rows={6}
          className="w-full p-2 mb-4 bg-gray-100 rounded"
          placeholder="请输入详细描述"
        ></textarea>

        <label className="block text-lg font-medium mb-2">预算赏金</label>
         <CustomSelect 
            name="type"
            options={['Option 1', 'Option 2']}
            onOptionSelected={(selected, name) => {
              setFormData(prev => ({ ...prev, [name]: selected }));
            }}
            defaultDisplay="请选择类型"
            className="w-full mb-4"
          />
        <div className="flex items-center mb-4 bg-gray-100 rounded-full space-x-2">
          <input 
            type="text" 
            name="budget" 
            value={formData.budget} 
            onChange={handleInputChange} 
            className="flex-grow p-2"
            placeholder="输入数值"
          />
          <CustomSelect 
            name="currency"
            options={['USD', 'EUR']}
            onOptionSelected={(selected, name) => {
              setFormData(prev => ({ ...prev, [name]: selected }));
            }}
            defaultDisplay="Crypto"
            className="w-32"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">时间</label>
          <CustomSelect 
            name="type"
            options={['Option 1', 'Option 2']}
            onOptionSelected={(selected, name) => {
              setFormData(prev => ({ ...prev, [name]: selected }));
            }}
            defaultDisplay="请选择类型"
            className="w-full mb-4"
          />
          <div className="flex flex-col gap-4 items-start bg-gray-100 px-2 py-4 rounded">
            <div>
              <label className="block text-xs text-textSecondary">开始时间</label>
              <div className="flex items-center gap-2">
                <input type="date" name="startTime" value={formData.startTime} onChange={handleInputChange} className="mt-2 p-2 text-xs rounded w-52" />
                <input type="number" name="startHour" placeholder="时" min="0" max="23" className="mt-2 p-2 text-xs w-16 rounded" />
                <input type="number" name="startMinute" placeholder="分" min="0" max="59" className="mt-2 p-2 text-xs w-16 rounded" />
              </div>
            </div>
            <div>
    <label className="block text-xs text-textSecondary">结束时间</label>
    <div className="flex items-center gap-2">
      <input type="date" name="endTime" value={formData.endTime} onChange={handleInputChange} className="mt-2 p-2 text-xs rounded w-52" />
      <input type="number" name="endHour" placeholder="时" min="0" max="23" className="mt-2 p-2 text-xs w-16 rounded" />
      <input type="number" name="endMinute" placeholder="分" min="0" max="59" className="mt-2 p-2 text-xs w-16 rounded" />
    </div>
  </div>
          </div>
        </div>

        <button className="w-full py-2 text-white bg-primary rounded-full">提交</button>
      </div>
    </div>
  );
}

export default PostRequirements;
