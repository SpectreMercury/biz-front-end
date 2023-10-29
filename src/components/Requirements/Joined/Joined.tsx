import React from 'react';

interface Props {
  logoSrc: string;
  projectName: string;
  tag: string;
  time: string;
  title: string;
  introduction: string;
  cooperationLogos: string[];
  application: {
    avatarSrc: string;
    applicantName: string;
    applicationTime: string;
    status: string;
    applicationNote?: string;
    replyNote?: string;
    replyTime?: string;
  };
}

const Joined: React.FC<Props> = ({
  logoSrc,
  projectName,
  tag,
  time,
  title,
  introduction,
  cooperationLogos,
  application,
}) => {
  return (
    <div className="p-5 border rounded-lg border-gray-100 flex flex-col gap-4">
      <div className="flex items-center mb-3 gap-4">
        {/* <img src={logoSrc} alt="Logo" className="w-12 h-12 mr-3" /> */}
        <div className='bg-primary w-12 h-12 rounded-full'></div>
        <span className="text-sm text-textSecondary font-bold">{projectName}</span>
      </div>
      <div className="flex gap-4 items-center text-textSecondary text-xs mb-3">
        <span className="bg-purple-100 text-primary font-bold px-2 py-1 text-sm rounded">{tag}</span>
        <span>{time}</span>
      </div>
      <h2 className="text-2xl font-bold mb-3">{title}</h2>
      <p className="line-clamp-2 text-textSecondary text-sm mb-3">{introduction}</p>

      <div className="mb-5 flex flex-col gap-4 border rounded-lg border-gray-100 p-6">
        <h3 className="text-sm font-bold mb-2">已经达成合作意向</h3>
        <div className="flex space-x-3">
          {cooperationLogos.map((logo, index) => (
            // <img key={index} src={logo} alt="Cooperation Logo" className="w-12 h-12" />
            <div className='bg-primary w-12 h-12 rounded-full'></div>
          ))}
        </div>
      </div>

      <div className="mb-5 flex flex-col gap-4 border rounded-lg border-gray-100 p-6">
        <h3 className="text-sm font-bold mb-2">我的申请</h3>
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center space-x-3">
            <div className='bg-primary w-12 h-12 rounded-full'></div>
            {/* <img src={application.avatarSrc} alt="Applicant Avatar" className="w-8 h-8" /> */}
            <span>{application.applicantName}</span>
            <span className="text-gray-500 text-xs">{application.applicationTime}</span>
          </div>
          <span className={`px-2 py-1 rounded ${application.status === 'sent' ? 'bg-purple-500 text-white text-xs' : application.status === 'accepted' ? ' text-secondary' : ' text-textSecondary text-xs'}`}>{application.status}</span>
        </div>
        {application.applicationNote && (
          <div className="flex gap-2">
            <h4 className="text-sm font-bold">申请备注</h4>
            <p className="text-sm text-textSecondary">{application.applicationNote}</p>
          </div>
        )}
        {application.replyTime && <span className="text-sm text-textSecondary">{application.replyTime}</span>}
        {application.replyNote && (
          <div className="flex gap-2">
            <h4 className="text-sm font-bold">申请回复</h4>
             <p className="text-sm text-textSecondary">{application.replyNote}</p>
          </div>
        )}
        {application.replyTime && <span className="text-sm text-textSecondary">{application.replyTime}</span>}
      </div>

      {application.status === 'accepted' && (
        <div className="flex space-x-3">
          <button className="bg-primary text-white px-4 py-2 rounded-full text-xs">已完成合作任务</button>
          <button className="bg-gray-100 text-gray-500 px-4 py-2 rounded-full text-xs">结束合作</button>
        </div>
      )}
    </div>
  );
};

export default Joined;
