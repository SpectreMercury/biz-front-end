"use client"

import { useState, useEffect } from 'react';
import { Tab } from '@headlessui/react';
import Image from 'next/image';
import { Language, Twitter } from '@material-ui/icons';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import Joined from '@/components/Requirements/Joined/Joined';
import Owned from '@/components/Requirements/Owned/Owned';
import ProductRegistration from '@/components/Registeration/Registeration';
import { OwnedProps } from '@/interface/requirements';
import { getMyNeeds } from '@/api/requirements';
import { useDispatch, useSelector } from 'react-redux';
import { setAddress } from '@/store/walletSlice';
import { RootState } from '@/store/store';
import { getProfile } from '@/api/profile';
import { FormDataInterface, UserProfile } from '@/interface/profile';

interface ProfileData {
  name: string;
  about: string;
  avatarUrl: string;
}

const Profile: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile>({
    userName: 'John Doe',
    avatar: '/assets/img/avatar-demo.png',
    userEmail: '',
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

  const getProfileData = async () => {
    if (walletAddress) {
      let rlt = await getProfile(walletAddress)
      setProfile(rlt)
    }
  }

  const isOwner = () => {
    if (checkWalletAddress) {
      return checkWalletAddress === walletAddress;
    }
    return true; // 如果没有checkWalletAddress，那么默认是自己的页面
  };

  const handleFormDataSubmit = () => {
    // 资料修改成功后的操作
    setCurrentView('published');
  };

  const fetchRequirementsData = async () => {
    if (!walletAddress) return;

    let type;
    switch (currentView) {
      case 'partners':
        type = 1; // Assuming 'partners' corresponds to type 1, adjust as needed
        break;
      case 'published':
        type = 1; // Adjust the type according to your needs
        break;
      case 'applied':
        type = 2; // Adjust the type according to your needs
        break;
      // If 'register' view does not correspond to a needs type, you might not need to handle it here
      default:
        console.log('Invalid view selected');
        return;
    }

    try {
      const needs = await getMyNeeds(walletAddress, type);
      switch (currentView) {
          case 'published':
            setOwnedData(needs); // Update state for published view
            break;
          case 'applied':
            setAppliedData(needs); // Update state for applied view
            break;
          default:
            console.log('Invalid view selected');
            return;
        }
      } catch (error) {
        console.error(`Failed to fetch needs for view ${currentView}:`, error);
      }
  };

  const handleFormDataChange = (newFormData:FormDataInterface) => {
    setProfile(prevProfile => ({
        ...prevProfile,
        name: newFormData.userName,
        about: newFormData.description,
        avatarUrl: newFormData.logo,
        website: newFormData.website,
        twitter: newFormData.twitter,
    }));
};


  useEffect(() => {
    fetchRequirementsData()
  }, [currentView])

  useEffect(() => {
    getProfileData()
  }, [])

  return (
    <div className="flex">
      {/* Left Side */}
      <div className="w-1/5 p-6 border border-grey-100 rounded-lg self-start mt-4 ml-4">
        {/* Avatar & Message */}
        <div className="flex items-center justify-between mb-4">
          <div className="relative rounded-full overflow-hidden hover:cursor-pointer">
            <Image src={profile.avatar} width={44} height={44} alt={'avatar'} />
           
          </div>
        </div>

        {/* Name */}
        <div className="flex items-center mb-4">
          
          <span className="flex-grow text-xl">{profile.userName}</span>
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
              value={profile.desc}
              onChange={handleInputChange}
              rows={6}
              className="w-full border p-2"
            ></textarea>
          ) : (
            <p className="text-sm text-textPrimary">{profile.desc}</p>
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
              <button 
                className={`text-xs ${currentView == 'published' ? 'text-primary': 'text-textSecondary'} block w-full text-left`}
                onClick={() => setCurrentView('published')}
                >我发布的合作需求</button>
              <button 
                className={`text-xs ${currentView == 'applied' ? 'text-primary': 'text-textSecondary'} block w-full text-left`}
                onClick={() => setCurrentView('applied')}
              >我申请的合作需求</button>
              <button 
                className={`text-xs ${currentView == 'partners' ? 'text-primary': 'text-textSecondary'} block w-full text-left`}
                onClick={() => setCurrentView('partners')}
              >我的合作伙伴</button>
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
            <ProductRegistration onFormDataChange={handleFormDataChange}
              onSubmitSuccess={handleFormDataSubmit}/>
          </div>
        }
        
      </div>
    </div>
  );
}

export default Profile;
