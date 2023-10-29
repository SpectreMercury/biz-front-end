import React, { useState } from 'react';

interface Application {
  avatar: string;
  name: string;
  remark: string;
  reply?: string;
  time: string;
  status: string;
  cooperationCompleted?: boolean;
}

interface OwnedProps {
  tag: string;
  time: string;
  status: string;
  bonus: string;
  title: string;
  description: string;
  cooperationAvatars: string[];
  applications: Application[];
}

const Owned: React.FC<OwnedProps> = ({
  tag,
  time,
  status,
  bonus,
  title,
  description,
  cooperationAvatars,
  applications,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDescriptionExpanded, setDescriptionExpanded] = useState(false);
  const [isApplicationsExpanded, setApplicationsExpanded] = useState(false);


  return (
    <>
      <div className="p-4 border rounded-md flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <div className="flex space-x-2 items-center">
          <span className="bg-purple-100 text-sm text-primary p-1 rounded">{tag}</span>
          <span className='text-sm text-textSecondary'>{time}</span>
          <span className={`text-${status === 'ongoing' ? 'green' : status === 'ended' ? 'gray' : 'red'}-500 text-sm`}>{status}</span>
        </div>
        <span className="bg-purple-100 text-sm text-primary py-1 px-2 font-bold rounded">{bonus}</span>
      </div>

      <h2 className="text-xl font-bold mt-2">{title}</h2>

      <p className={`text-sm text-textSecondary ${isDescriptionExpanded ? '' : 'line-clamp-2'}`}>
        {description}
        <span 
          onClick={() => setDescriptionExpanded(!isDescriptionExpanded)} 
          className="text-primary text-sm cursor-pointer">
          {isDescriptionExpanded ? '收起' : '展开全部'}
        </span>
      </p>

      <div className="mt-4 border rounded-lg border-gray-100 p-4">
        <h3>已达成合作意向</h3>
        <div className="flex items-center mt-2 gap-2">
          {cooperationAvatars.map((avatar, index) => (
            <div className='bg-primary w-12 h-12 rounded-full'></div>
            // <img key={index} src={avatar} alt="Avatar" className="w-10 h-10 rounded-full" />
          ))}
        </div>
      </div>
      {
        !isApplicationsExpanded && (
          <div className="mt-2">
            <button onClick={() => setApplicationsExpanded(!isApplicationsExpanded)} className="text-purple-500">展开需求详情</button>
          </div>
        )
      }
    </div>
    {
      isApplicationsExpanded && (
        <div className='flex flex-col border border-grey-100 rounded-lg p-4 mt-4'>
        <p className='font-bold'>申请列表</p>
        {applications.map((application, index) => (   
              <div key={index} className="mt-4">
                <div className={`border-t py-4 ${index < applications.length - 1 ? ' border-b' : ''}`}>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className='bg-primary w-12 h-12 rounded-full'></div>
                      {/* <img src={application.avatar} alt="Application Avatar" className="w-8 h-8 rounded-full" /> */}
                      <span className="ml-2">{application.name}</span>
                    </div>
                    <div>
                      {application.status === 'pending' && (
                        <>
                          <button className="bg-purple-100 text-primary rounded-full px-3 py-2 mr-2 text-sm font-bold">拒绝</button>
                          <button className="bg-primary text-white rounded-full px-3 py-2 text-sm font-bold">接受</button>
                        </>
                      )}
                      {application.status === 'accepted' && <span className="text-green-500 text-sm">已接受申请</span>}
                      {application.status === 'rejected' && <span className="text-purple-500">已拒绝申请</span>}
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-textSecondary"><span className='font-bold text-black'>申请备注：</span>{application.remark}</p>
                  {application.reply && <p className="mt-2 text-sm text-textSecondary"><span className='font-bold text-black'>申请回复：</span>{application.reply}</p>}
                  <p className="mt-2 text-sm text-textSecondary">{application.time}</p>
                </div>
                {application.cooperationCompleted && (
                  <div className="mt-4 mb-4 text-sm">
                    对方已确认合作完成
                  </div>
                )}
                {application.status === 'accepted' && (
                  <div className="mt-2 flex space-x-2">
                    <button className="bg-primary text-white px-4 py-2 rounded-full text-sm font-bold">确认合作完成</button>
                    <button className="bg-gray-100 px-4 py-2 rounded-full text-sm font-bold">有疑问 ?</button>
                  </div>
                )}
              </div>
          ))}
    </div>
      )
    }
    {isApplicationsExpanded && (
      <button onClick={() => setApplicationsExpanded(false)} className="text-purple-500 mt-2">收起</button>
    )}
    </>
  );
}

export default Owned;