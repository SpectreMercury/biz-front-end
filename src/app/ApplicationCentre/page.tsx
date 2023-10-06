"use client"

import React, { useState } from 'react';

const ApplicationCenter: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('I posted');

  return (
    <div className="w-full min-h-screen flex justify-center items-start pt-16">
      <div className="w-full bg-white p-16 rounded">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          {/* Left Side */}
          <div>
            <h1 className="text-2xl font-bold mb-2">Cooperation needs</h1>
            <p className="text-gray-600">We're happy to have you here.</p>
          </div>
          {/* Right Side */}
          <button className="flex justify-center items-center gap-1.5 px-4 py-2.5 bg-primary rounded-full text-white">
            Release requirements
          </button>
        </div>

        {/* Tabs */}
        <div className="mb-4">
          <button
            onClick={() => setActiveTab('I posted')}
            className={`mr-4 ${activeTab === 'I posted' ? 'text-primary border-b-2 pb-2 border-primary' : ''}`}
          >
            I posted
          </button>
          <button
            onClick={() => setActiveTab('I received')}
            className={`${activeTab === 'I received' ? 'text-primary border-b-2 pb-2 border-primary' : ''}`}
          >
            I received
          </button>
        </div>

        {/* Drawer */}
        <div className={`bg-white p-4 border rounded ${isDrawerOpen ? 'mb-4' : ''}`}>
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <button onClick={() => setIsDrawerOpen(!isDrawerOpen)}>
                {isDrawerOpen ? '🔽' : '🔼'}
              </button>
              <h2 className="ml-4">Biz Connection</h2>
            </div>
            <div>
              <span className="mr-4">2023-10-03</span>
              <span>Status: Active</span>
            </div>
          </div>

          {isDrawerOpen && (
            <div className="mt-4 p-8 bg-gray-50">
              <p className="mb-2 text-xl">Biz 宣发</p>
              <p className="mb-2 text-gray-500">合作条件：</p>
              <ul className="list-decimal pl-5 mb-4 text-gray-500">
                <li>Twiter粉丝达到10,000</li>
                <li>Twitter注册时间满足一年</li>
              </ul>
              <p>截止时间：2023/10/13</p>

              <div className="mt-4 bg-white p-6 rounded">
                <div className="flex justify-between items-center">
                    <div>参与合作方</div>
                    <div className="flex flex-wrap gap-3">
                        {/* Add logos or divs here */}
                        {Array(10).fill(null).map((_, index) => (
                            <div key={index} className="w-14 h-14 bg-purple-200 rounded-full"></div>
                        ))}
                    </div>
                    <button className="px-4 py-2 bg-gray-100 text-primary rounded-full">一键下载所有logo</button>
                </div>
            
              </div>
              <div className="mt-4 bg-white p-4 rounded">
                <div className="flex justify-between items-center">
                  <a href="#" className="text-primary">Ethereum</a>
                  <div>
                    <button className="mr-2 px-4 py-2 bg-gray-100 text-primary rounded-full">Reject</button>
                    <button className="px-4 py-2 bg-primary text-white rounded-full">Accept</button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApplicationCenter;
