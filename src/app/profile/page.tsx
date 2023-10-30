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
import { OwnedProps } from '@/interface/requirements';
import { getMyNeeds } from '@/api/requirements';
import { useDispatch, useSelector } from 'react-redux';
import { setAddress } from '@/store/walletSlice';
import { RootState } from '@/store/store';

interface ProfileData {
  name: string;
  about: string;
  avatarUrl: string;
}

const Profile: React.FC = () => {
  const [profile, setProfile] = useState<ProfileData>({
    name: 'John Doe',
    about: 'Hello, I am John.',
    avatarUrl: '/assets/img/avatar-demo.png'
  });
  const [isEditing, setIsEditing] = useState(false);
  const walletAddress = useSelector((state: RootState) => state.wallet.address);
  const [currentView, setCurrentView] = useState<'partners' | 'published' | 'applied' | 'register'>('published');
  const router = useRouter(); 
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const checkWalletAddress = searchParams.get('walletAddress')
  const [ownedData, setOwnedData] = useState<OwnedProps[]>([]);
  const [appliedData, setAppliedData] = useState<OwnedProps[]>([]);
  const [joinedData, setJoinedData] = useState<OwnedProps[]>([]);

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

  const fetchRequirementsData = async () => {
    if(!walletAddress) return
    try {
      const owned = await getMyNeeds(walletAddress, 1);
      const applied = await getMyNeeds(walletAddress, 2);
      const joined = await getMyNeeds(walletAddress, 3);

      setOwnedData(owned);
      setAppliedData(applied);
      setJoinedData(joined);
    } catch (error) {
      console.error('Failed to fetch my needs:', error);
    }
  }

  useEffect(() => {
    fetchRequirementsData()
  }, [currentView])

  return (
    <div className="flex">
      {/* Left Side */}
      <div className="w-1/5 p-6 border border-grey-100 rounded-lg self-start mt-4 ml-4">
        {/* Avatar & Message */}
        <div className="flex items-center justify-between mb-4">
          <div className="relative rounded-full overflow-hidden hover:cursor-pointer">
            <img src="/assets/img/avatar-demo.png" alt="User Avatar" className="w-36 h-36 rounded-full" />
           
          </div>
        </div>

        {/* Name */}
        <div className="flex items-center mb-4">
          
          <span className="flex-grow text-xl">{profile.name}</span>
          {!checkWalletAddress && (
            <button
              className="ml-2 border rounded-md pt-1 pb-1 pl-3 pr-3"
              onClick={()=> {
                console.log(1)
                setCurrentView('register')
              }}
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

        {/* {currentView === 'published' && 
          <div className='flex flex-col gap-4'>
            {
              ownedData.map((data, index) => (
                <Joined key={index} {...data} />
              ))
            }
          </div>
        } */}

        {currentView === 'published' && 
          <div className='flex flex-col gap-4'>
            {
              ownedData.map((data, index) => (
                <Owned key={index} {...data} />
              ))
            }
          </div>
        }

        {currentView === 'applied' && 
          <div className='flex flex-col gap-4'>
            {
              appliedData.map((data, index) => (
                <Owned key={index} {...data} />
              ))
            }
          </div>
        }

        {currentView === 'register' && 
          <div className='flex flex-col gap-4'>
            <ProductRegistration />
          </div>
        }
        
      </div>
    </div>
  );
}

export default Profile;
