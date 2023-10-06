"use client"

import React, { useState, KeyboardEvent } from 'react';
import HomeCardItem from '@/components/HomeCardItem/HomeCardItem';

const HomePage: React.FC = () => {
    const [searchValue, setSearchValue] = useState<string>('');
    
    const mockData = [
        {
            avatarUrl: 'https://i.imgs.ovh/2023/10/06/L3TVU.png',
            name: 'OpenAI GPT-4',
            projectIntroduction: 'A state-of-the-art language model by OpenAI that can generate human-like text.',
            date: new Date('2023-10-06')
        },
        {
            avatarUrl: 'https://i.imgs.ovh/2023/10/06/L3TVU.png',
            name: 'Tesla Roadster',
            projectIntroduction: 'An all-electric battery-powered four-seater sports car made by Tesla, Inc.',
            date: new Date('2023-10-05')
        },
        {
            avatarUrl: 'https://i.imgs.ovh/2023/10/06/L3TVU.png',
            name: 'SpaceX Starship',
            projectIntroduction: 'A fully reusable super heavy-lift launch vehicle designed by SpaceX.',
            date: new Date('2023-10-04')
        },
        {
            avatarUrl: 'https://i.imgs.ovh/2023/10/06/L3TVU.png',
            name: 'Neuralink Brain Chip',
            projectIntroduction: 'A neurotechnology company that develops implantable brain–machine interfaces.',
            date: new Date('2023-10-03')
        },
        {
            avatarUrl: 'https://i.imgs.ovh/2023/10/06/L3TVU.png',
            name: 'Boring Company Tunnel',
            projectIntroduction: 'An infrastructure and tunnel construction services company founded by Elon Musk.',
            date: new Date('2023-10-02')
        },
        {
            avatarUrl: 'https://i.imgs.ovh/2023/10/06/L3TVU.png',
            name: 'SolarCity Solar Panel',
            projectIntroduction: 'A subsidiary of Tesla, Inc. that specializes in solar energy services.',
            date: new Date('2023-10-01')
        },
        {
            avatarUrl: 'https://i.imgs.ovh/2023/10/06/L3TVU.png',
            name: 'Hyperloop Transportation',
            projectIntroduction: 'A proposed mode of passenger and freight transportation by Elon Musk.',
            date: new Date('2023-09-30')
        },
        {
            avatarUrl: 'https://i.imgs.ovh/2023/10/06/L3TVU.png',
            name: 'Starlink Internet Service',
            projectIntroduction: 'A satellite internet constellation being constructed by SpaceX.',
            date: new Date('2023-09-29')
        }
    ]

    const handleSearchEnter = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            // Handle search logic here
        }
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
                    onChange={(e) => setSearchValue(e.target.value)}
                    onKeyPress={handleSearchEnter}
                    placeholder="Search..."
                    className="flex-grow outline-none"
                />
                <button>
                    {/* Replace with your magnifying glass icon */}
                    🔍
                </button>
            </div>

            {/* Card List */}
            <div className="w-[1280px] grid grid-cols-4 gap-3 pb-8">
                {mockData.map((data, index) => (
                    <div key={index} className="h-[398px] border rounded-lg">
                        <HomeCardItem 
                            key={index}
                            avatarSrc={data.avatarUrl}
                            projectName={data.name}
                            projectDescription={data.projectIntroduction}
                            date={data.date}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default HomePage;
