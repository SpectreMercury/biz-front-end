"use client"

import React, { useState, ChangeEvent, useEffect, useRef } from 'react';
import HomeCardItem from '@/components/HomeCardItem/HomeCardItem';
import { getOrganizations } from '@/api/organisation';

interface OrganzationListItem {
    avatar?: string;
    userName: string;
}

const HomePage: React.FC = () => {
    const [searchValue, setSearchValue] = useState<string>('');
    const [orgData, setOrgData] = useState([])
    const [originalOrgData, setOriginalOrgData] = useState<Array<OrganzationListItem>>([]);
    const [searchMessage, setSearchMessage] = useState<string | null>(null);
    const searchTimeout = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        fetchOrganizationsData()
    }, []);

    const fetchOrganizationsData = async () => {
        const response:any= await getOrganizations()
        setOriginalOrgData(response)
    };

    return (
        <div className="pt-32 flex flex-col items-center space-y-6">
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
            <div className=" grid grid-cols-4 gap-3 pb-8">
                {orgData.length > 0 ? (
                    orgData.map((data, index) => (
                        <div key={index} className="h-[398px] border rounded-lg">
                            {/* <HomeCardItem 
                                key={index}
                                avatarSrc={data.avatar ? data.avatarUrl : 'https://i.imgs.ovh/2023/10/06/L3TVU.png'}
                                projectName={data.name}
                                projectDescription={data.about}
                            /> */}
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
