"use client"

import { useState, useEffect } from 'react';
import { Tab } from '@headlessui/react';
import Image from 'next/image';
import { useWebSocket } from '@/context/websocketContext';
import createMetadataEvent from '@/lib/sig_metamask';
import Link from 'next/link';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

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
  const [walletAddress, setWalletAddress] = useState("")
  const { send } = useWebSocket()
  const router = useRouter(); 
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const checkWalletAddress = searchParams.get('walletAddress')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name as keyof ProfileData]: value }));
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

  const handleConfirm = async () => {
    if(isEditing) { 
      const finalFormData = {
        ...profile,
        role: "organization"
      };
      let metadata = await createMetadataEvent(walletAddress || "", finalFormData);
      if (send) {
        send('EVENT', metadata);
      }
    } 
    setIsEditing(!isEditing)
  };
  
  return (
    <div className="flex">
      {/* Left Side */}
      <div className="w-1/4 p-6">
        {/* Avatar & Message */}
        <div className="flex items-center justify-between mb-4 ">
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
              onClick={handleConfirm}
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
        </div>

        {/* Builders */}
        <div className="opacity-0">
          <h3 className="mb-4">Builders</h3>
          <div className="flex space-x-4">
            {/* Add your builder icons here */}
          </div>
        </div>

        {/* Projects */}
        <div className="opacity-0">
          <h3 className="mb-4">Projects</h3>
          <div className="flex space-x-4">
            {/* Add your project logos here */}
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="w-3/4 p-4">
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
      </div>
    </div>
  );
}

export default Profile;
