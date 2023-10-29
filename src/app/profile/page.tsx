"use client"

import { useState, useEffect } from 'react';
import { Tab } from '@headlessui/react';
import Image from 'next/image';
import { Language, Twitter } from '@material-ui/icons';
import Link from 'next/link';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import Joined from '@/components/Requirements/Joined/Joined';
import Owned from '@/components/Requirements/Owned/Owned';
import ProductRegistration from '@/components/Registeration/Registeration';

interface ProfileData {
  name: string;
  about: string;
  avatarUrl: string;
}


const mockJoinedData = [
  {
    logoSrc: "/path/to/logo.jpg",
    projectName: "Sample Project Accepted",
    tag: "Tech",
    time: "2023-10-01",
    title: "Sample Title for Accepted",
    introduction: "This is a brief introduction about the project...",
    cooperationLogos: ["/path/to/logo1.jpg", "/path/to/logo2.jpg"],
    application: {
      avatarSrc: "/path/to/avatar.jpg",
      applicantName: "John Doe",
      applicationTime: "2023-10-01",
      status: "accepted",
      applicationNote: "Looking forward to this collaboration!",
      replyNote: "Sure, let's get started!",
      replyTime: "2023-10-02",
    },
  },
  {
    logoSrc: "/path/to/logo.jpg",
    projectName: "Sample Project Rejected",
    tag: "Tech",
    time: "2023-10-01",
    title: "Sample Title for Rejected",
    introduction: "This is a brief introduction about the project...",
    cooperationLogos: ["/path/to/logo1.jpg", "/path/to/logo2.jpg"],
    application: {
      avatarSrc: "/path/to/avatar.jpg",
      applicantName: "Jane Smith",
      applicationTime: "2023-10-01",
      status: "rejected",
      applicationNote: "Hope to collaborate on this!",
      replyNote: "Sorry, we are looking for a different skill set.",
      replyTime: "2023-10-02",
    },
  },
  {
    logoSrc: "/path/to/logo.jpg",
    projectName: "Sample Project Pending",
    tag: "Tech",
    time: "2023-10-01",
    title: "Sample Title for Pending",
    introduction: "This is a brief introduction about the project...",
    cooperationLogos: ["/path/to/logo1.jpg", "/path/to/logo2.jpg"],
    application: {
      avatarSrc: "/path/to/avatar.jpg",
      applicantName: "Alice Johnson",
      applicationTime: "2023-10-01",
      status: "pending",
      applicationNote: "I believe I'm a great fit for this project!",
      // 注意：由于状态是 pending，所以可能没有回复或回复时间
    },
  },
];

const mockOwnedData = {
  tag: "Business",
  time: "2023-10-01",
  status: "ongoing",
  bonus: "$1000",
  title: "Sample Title for Owned",
  description: "This is a detailed description about the project...",
  cooperationAvatars: ["/path/to/avatar1.jpg", "/path/to/avatar2.jpg"],
  applications: [
    {
      avatar: "/path/to/applicant1.jpg",
      name: "Applicant 1",
      remark: "I'm interested in this project.",
      reply: "Let's discuss further.",
      time: "2023-10-01",
      status: "accepted",
      cooperationCompleted: true,
    },
    {
      avatar: "/path/to/applicant2.jpg",
      name: "Applicant 2",
      remark: "Can I join?",
      time: "2023-10-02",
      status: "pending",
    },
  ],
};


const Profile: React.FC = () => {
  const [profile, setProfile] = useState<ProfileData>({
    name: 'John Doe',
    about: 'Hello, I am John.',
    avatarUrl: '/assets/img/avatar-demo.png'
  });
  const [isEditing, setIsEditing] = useState(false);
  const [walletAddress, setWalletAddress] = useState("")
  const [currentView, setCurrentView] = useState<'partners' | 'published' | 'applied' | 'register'>('published');
  const router = useRouter(); 
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const checkWalletAddress = searchParams.get('walletAddress')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name as keyof ProfileData]: value }));
  };

  const isOwner = () => {
    if (checkWalletAddress) {
      return checkWalletAddress === walletAddress;
    }
    return true; // 如果没有checkWalletAddress，那么默认是自己的页面
  };


  const getWalletAddress = async (): Promise<string | null> => {
      if (typeof ethereum !== 'undefined') {
          try {
              const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
              const userAddress = accounts[0];
              setWalletAddress(userAddress);
              return userAddress;
          } catch (error) {
              console.error("User denied account access");
              return null;
          }
      } else {
          console.error("Ethereum object doesn't exist!");
          return null;
      }
  }

  useEffect(() => {
    const fetchProfileData = async (address: string) => {
      const response = await fetch(`https://api.web3bd.network/api/profile?addr=${address}`);
      const data = await response.json();
      if (!Object.keys(data.data).length) {
        data.data = {
          name: 'Biz Nexus 42#',
          projectDescription: 'Life, Universe and Everything',
          avatarUrl: '/assets/img/avatar-demo.png'
        }
      } 
      setProfile(data.data);
    };

    if (checkWalletAddress) {
      fetchProfileData(checkWalletAddress);
    } else {
      getWalletAddress().then(address => {
        if (address) {
          fetchProfileData(address);
        }
      });
    }
  }, [checkWalletAddress]);

  useEffect(() => {
      const fetchProfileData = async () => {
          const response = await fetch(`https://api.web3bd.network/api/profile?addr=${walletAddress}`)
          const data = await response.json();
          setProfile(data.data)
      };

      if (!walletAddress) {
          return
      } else {
          fetchProfileData();
      }
  }, [walletAddress])
  
  
  return (
    <div className="flex">
      {/* Left Side */}
      <div className="w-1/5 p-6 border border-grey-100 rounded-lg self-start mt-4 ml-4">
        {/* Avatar & Message */}
        <div className="flex items-center justify-between mb-4">
          <div className="relative rounded-full overflow-hidden hover:cursor-pointer">
            <img src="/assets/img/avatar-demo.png" alt="User Avatar" className="w-36 h-36 rounded-full" />
            {isEditing && (
              <div className="absolute inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
                更换头像
              </div>
            )}
          </div>
          <div className="relative ml-4">
            <Link href={'/ApplicationCentre'}>
              <Image src={'/assets/svg/message-icon.svg'} alt={'logo'} width={46} height={46} />
              <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full px-2 py-0.5 text-xs">
                99+
              </span>
            </Link>
          </div>
        </div>

        {/* Name */}
        <div className="flex items-center mb-4">
          {isEditing ? (
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleInputChange}
              className="flex-grow border p-2"
            />
          ) : (
            <span className="flex-grow text-xl">{profile.name}</span>
          )}
          {!checkWalletAddress && (
            <button
              className="ml-2 border rounded-md pt-1 pb-1 pl-3 pr-3"
            >
              {isEditing ? 'Save' : 'Edit'}
            </button>
          )}
        </div>
        <div className="border-t border-gray-200 my-4"></div>
        {/* Introduction */}
        <div className="mb-4">
          {isEditing ? (
            <textarea
              name="about"
              value={profile.about}
              onChange={handleInputChange}
              rows={6}
              className="w-full border p-2"
            ></textarea>
          ) : (
            <p className="text-sm text-textPrimary">{profile.about}</p>
          )}
        </div>

        {/* Social Icons */}
        <div className="flex space-x-4 mb-4"> 
          {/* Add your social icons here */}
          <div className="bg-gray-100 rounded p-1 hover:cursor-default">
            <Language/>
          </div>
          <div className="bg-gray-100 rounded p-1 hover:cursor-default">
            <Twitter />
          </div>
        </div>

        <div className="flex flex-col gap-2 justify-start">
          {isOwner() ? (
            <>
              <button className={`text-xs ${currentView == 'published' ? 'text-primary': 'text-textSecondary'} block w-full text-left`}>我发布的合作需求</button>
              <button className={`text-xs ${currentView == 'applied' ? 'text-primary': 'text-textSecondary'} block w-full text-left`}>我申请的合作需求</button>
              <button className={`text-xs ${currentView == 'partners' ? 'text-primary': 'text-textSecondary'} block w-full text-left`}>我的合作伙伴</button>
            </>
          ) : (
            <>
              <button className={`text-xs ${currentView == 'published' ? 'text-primary': 'text-textSecondary'} block w-full text-left`}>Ta 发布的合作需求</button>
              <button className={`text-xs ${currentView == 'applied' ? 'text-primary': 'text-textSecondary'} block w-full text-left`}>Ta参与的合作需求</button>
              <button className={`text-xs ${currentView == 'partners' ? 'text-primary': 'text-textSecondary'} block w-full text-left`}>Ta的合作伙伴</button>
            </>
          )}
        </div>
      </div>

      {/* Right Side */}
      <div className="w-4/5 p-4">
        {currentView === 'partners' && (
          <Tab.Group>
              <Tab.List className="flex mb-4">
              <Tab as="button" className={({ selected }) => selected ? 'border-b-2 border-primary px-4 py-2' : 'px-4 py-2'}>
                  Table View
              </Tab>
              <Tab as="button" className={({ selected }) => selected ? 'border-b-2 border-primary px-4 py-2' : 'px-4 py-2'}>
                  Network View
              </Tab>
              </Tab.List>
              <Tab.Panels>
              <Tab.Panel>
                  {/* Table View Content */}
              </Tab.Panel>
              <Tab.Panel>
                  {/* Network View Content */}
              </Tab.Panel>
              </Tab.Panels>
          </Tab.Group>
        )}

        {currentView === 'published' && 
          <div className='flex flex-col gap-4'>
            {
              mockJoinedData.map((data, index) => (
                <Joined key={index} {...data} />
              ))
            }
          </div>
        }

        {currentView === 'applied' && (
          <Owned {...mockOwnedData} />
        )}

        {currentView === 'register' && (
          <ProductRegistration />
        )}
        
      </div>
    </div>
  );
}

export default Profile;
