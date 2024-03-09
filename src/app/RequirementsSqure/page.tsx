'use client'
import React from 'react';
import PublicRequirements from '@/components/Requirements/Public/Public';
import { SearchOutlined } from '@material-ui/icons';
import CustomSelect from '@/components/CustomSelect/CustomSelect';

const mockFilters = ['Filter 1', 'Filter 2', 'Filter 3'];

const RequirementSquare: React.FC = () => {
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
                    options={[{key: 'red', value: 'red'},{key: 'blue', value: 'blue'}, {key: 'green', value: 'green'} ]}
                    onOptionSelected={(selected, name) => {
                        console.log(`Selected option: ${selected} for ${name}`);
                        // 这里你可以处理选择的逻辑
                    }}
                    defaultDisplay="所有"
                    name="color"
                    className="w-24 border border-gray-100 rounded-full"
                />
            </div>
          </div>
          <button className="bg-primary rounded-full text-sm font-bold text-white px-4 py-2 roundeSearchOutlinedd">Release Requirements</button>
        </div>

        {/* Content Components */}
        {[1, 2, 3].map((item) => (
          <PublicRequirements key={item} />
        ))}
      </div>
    </div>
  );
};

export default RequirementSquare;