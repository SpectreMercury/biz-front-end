import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface CardProps {
    avatarSrc: string;
    projectName: string;
    projectDescription: string;
    date: Date;
}

const HomeCardItem: React.FC<CardProps> = ({ avatarSrc, projectName, projectDescription, date }) => {
    const formattedDate = `${date.getDate()}${['th', 'st', 'nd', 'rd'][((date.getDate() + 90) % 100 - 10) % 10] || 'th'} ${date.toLocaleString('default', { month: 'short' })}, ${date.getFullYear()}`;

    return (
        <div className="p-[24px]">
            {/* First Row */}
            <div className="flex items-center justify-between mt-8 mb-4">
                <Link href="/profile-page-url">
                    <Image src={avatarSrc} alt="User Avatar" width={80} height={80} className="rounded-full" />
                </Link>
                <div className="w-12 h-12 bg-gray-100 rounded-full flex justify-center items-center">
                    <Image src={'/assets/svg/message-icon.svg'} alt="message" width={30} height={30}/>
                </div>
            </div>

            {/* Second Row */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center px-3 py-1 bg-[#F5FAFF] text-textPrimary rounded">
                    <span>Tag</span>
                </div>
                <span className='text-textSecondary text-sm'>{formattedDate}</span>
            </div>

            {/* Third Row */}
            <h2 className="text-gray-700 text-xl font-semibold leading-7 line-clamp-2 h-12">{projectName}</h2>
            {/* Fourth Row */}
            <p className="line-clamp-4 text-textSecondary">{projectDescription}</p>
        </div>
    );
}

export default HomeCardItem;
