'use client'
import React, { useState, useEffect } from 'react';
import PublicRequirements from '@/components/Requirements/Public/Public';
import { SearchOutlined } from '@material-ui/icons';
import CustomSelect from '@/components/CustomSelect/CustomSelect';
import { PublicNeedRequest } from '@/interface/requirements';
import { getPublicNeeds } from '@/api/requirements';
import Link from 'next/link';

const mockFilters = ['Filter 1', 'Filter 2', 'Filter 3'];

const RequirementSquare: React.FC = () => {

  const [publicNeedsData, setPublicNeedsData] = useState<PublicNeedRequest[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getPublicNeeds();
        setPublicNeedsData(data);
      } catch (error) {
        console.error('Failed to fetch public needs:', error);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="flex">
      {/* Left Side - Filters */}
      <div className="w-1/5 m-4 p-4 flex flex-col items-center border border-gray-100 self-start rounded-lg">
        <h2 className="mb-4 font-bold">Filters</h2>
        {mockFilters.map((filter, index) => (
          <div key={index} className="mb-2">
            <input type="checkbox" id={`filter-${index}`} />
            <label htmlFor={`filter-${index}`} className="ml-2">{filter}</label>
          </div>
        ))}
      </div>

      {/* Right Side - Content */}
      <div className="w-4/5 p-4">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-4">
            <div className='flex items-center border border-gray-100 rounded-full pl-2 text-sm'>
                <div className='text-grey-100' >
                    <SearchOutlined className='text-gray-100' />
                </div>
                <input type="text" placeholder="Search..." className="rounded-full p-2 flex-grow" />
                <button className="h-full bg-primary text-white p-2 rounded-r-full text-sm">Search</button>
            </div>
            <div>
                <CustomSelect 
                    options={['Red', 'Blue', 'Green']}
                    onOptionSelected={(selected, name) => {
                        console.log(`Selected option: ${selected} for ${name}`);
                    }}
                    defaultDisplay="所有"
                    name="color"
                    className="w-24 border border-gray-100 rounded-full"
                />
            </div>
          </div>
          <Link href="/PostRequirements" className="bg-primary rounded-full text-sm font-bold text-white px-4 py-2 roundeSearchOutlinedd">Release Requirements</Link>
        </div>

        {/* Content Components */}
        {publicNeedsData.map((item) => (
          <PublicRequirements 
            key={item.needsName}
            avatar={item.avatar}
            organizationName={item.organizationName}
            reward={item.reward}
            projectTag={item.projectTag}
            createTime={item.createTime}
            needsName={item.needsName}
            description={item.description}
          />
      ))}
      </div>
    </div>
  );
};

export default RequirementSquare;
