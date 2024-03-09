"use client"

import React, { useState, ChangeEvent, useEffect, useRef } from 'react';
import HomeCardItem from '@/components/HomeCardItem/HomeCardItem';
import { getOrganizations } from '@/api/organisation';
import mediaCardData from '@/data/mockData';

interface OrganzationListItem {
    avatar?: string;
    userName: string;
    desc: string;
}

const HomePage: React.FC = () => {
    const [searchValue, setSearchValue] = useState<string>('');
    const [orgData, setOrgData] = useState([])
    const [originalOrgData, setOriginalOrgData] = useState<Array<OrganzationListItem>>(mediaCardData);
    const [searchMessage, setSearchMessage] = useState<string | null>(null);
    const searchTimeout = useRef<NodeJS.Timeout | null>(null);

    return (
        <div className="container pt-32 flex flex-col items-center space-y-6">
            {/* Title */}
            <h1 className="text-4xl font-bold">Connect with your partners in Biz</h1>

            {/* Get Started Button */}
            <button className="bg-primary text-white px-8 py-4 !mt-6 !mb-16 rounded-full">
                Connect with your partners
            </button>

            {/* Search Bar */}
            <div className="flex items-center w-[598px] h-[58px] bg-white border rounded-full px-6">
                <input
                    type="text"
                    value={searchValue}
                    // onChange={handleInputChange}
                    // onKeyPress={handleSearchEnter}
                    placeholder="Search..."
                    className="flex-grow outline-none"
                />
                <button>
                    {/* Replace with your magnifying glass icon */}
                    🔍
                </button>
            </div>

            {/* Card List */}
            <div className="container grid grid-cols-4 gap-3 pb-8 px-[120px]">
                {originalOrgData.length > 0 ? (
                    originalOrgData.map((data, index) => (
                        <div key={index} className="h-[398px] border rounded-lg">
                            <HomeCardItem 
                                key={index}
                                avatarSrc={data.avatar ? data.avatar : 'https://i.imgs.ovh/2023/10/06/L3TVU.png'}
                                projectName={data.userName}
                                projectDescription={data.desc}
                            />
                        </div>
                    ))
                ) : (
                    <div className="col-span-4 flex justify-center items-center">
                        <p>目前还没有项目，<a href="/profile" className="text-blue-500 underline">快去创建一个</a></p>
                    </div>
                )}
            </div>
            {searchMessage && (
                <div className="w-full flex justify-center items-center mt-4">
                    <p>{searchMessage}</p>
                </div>
            )}
        </div>
    );
}

export default HomePage;
