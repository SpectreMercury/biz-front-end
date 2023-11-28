'use client'
import React, { useState, useRef, useEffect } from 'react';
import { PublicRequirements } from '@/interface/requirements'
import AppliedDialog from '../AppliedDialog/AppliedDialog';
import { applyNeeds } from '@/api/needs';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';

const PublicRequirement: React.FC<PublicRequirements> = ({ avatar, organizationName, reward, projectTag, createTime, needsName, description, projectId }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [appliedProject, setAppliedProject] = useState('')
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const walletAddress = useSelector((state: RootState) => state.wallet.address);


  useEffect(() => {
    console.log(description)
    console.log(descriptionRef.current)
    if (descriptionRef.current) {
      const element = descriptionRef.current;
      console.log(element.scrollHeight, element.clientHeight)
      setIsOverflowing(element.scrollHeight > element.clientHeight);
    }
  }, [description]);

  const formatTimestamp = (timestamp: string): string => {
    const date = new Date(timestamp);
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();

    // 确定正确的日期后缀
    let suffix = 'th';
    const exceptions = [1, 21, 31];
    if (exceptions.includes(day)) {
      suffix = 'st';
    } else if ([2, 22].includes(day)) {
      suffix = 'nd';
    } else if ([3, 23].includes(day)) {
      suffix = 'rd';
    }

    return `${day}${suffix}, ${month}, ${year}`;
  }

  const handleApply = async (reason: string) => {
    console.log('申请理由:', reason);
    const rlt = await applyNeeds({
      walletAddress: walletAddress,
      projectId: projectId,
      applyStatus: 2
    })
    console.log(rlt)
  };

  return (
    <div className="flex flex-col border p-4 mb-4 rounded gap-4">
      <AppliedDialog 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onApply={handleApply}
      />
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className='rounded-full bg-purple-100 w-10 h-10'></div>
          <span className='text-textSecondary font-bold'>{organizationName}</span>
        </div>
        <span className="px-2 py-1 bg-purple-100 text-primary rounded text-sm">${reward}</span>
      </div>
      <div className="flex items-center gap-2">
        {projectTag && projectTag.split(',').map((tag, index) => (
          <span key={index} className="bg-purple-100 text-purple-500 p-1 rounded text-xs">
            {tag.trim()}
          </span>
        ))}
        <span className='text-xs text-textSecondary'>{formatTimestamp(createTime)}</span>
      </div>
      <h2 className="text-xl font-bold mb-2">{needsName}</h2>
      <p className={`text-sm text-textSecondary ${isExpanded ? '' : 'line-clamp-2'}`} ref={descriptionRef}>
        {description}
      </p>
      {isOverflowing && (isExpanded ? (
        <span onClick={() => setIsExpanded(false)} className="text-primary cursor-pointer text-sm">收起</span>
      ) : (
        <span onClick={() => setIsExpanded(true)} className="text-primary cursor-pointer text-sm">...展开</span>
      ))}
      <div className="mt-2 w-24 text-sm bg-primary text-center cursor-pointer text-white p-2 rounded-full" onClick={() => {
        setIsModalOpen(true)
        setAppliedProject(projectId)  
      }}>申请</div>
    </div>
  );
};

export default PublicRequirement;
