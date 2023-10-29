'use client'
import React, { useState } from "react";
import { Menu } from "@headlessui/react";
import Link from "next/link";
import Image from 'next/image'
import { useDispatch, useSelector } from 'react-redux';
import { setAddress } from '@/store/walletSlice';
import { RootState } from '@/store/store';

const Header = () => {
  const commonClasses = "px-4 py-2 text-sm border rounded-full border-primary text-primary hover:bg-primary hover:text-white transition";
  const dispatch = useDispatch();
  const walletAddress = useSelector((state: RootState) => state.wallet.address);


  const connectWallet = async () => {
    if (typeof ethereum !== 'undefined') {
        try {
            // 请求用户授权
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            // accounts数组中的第一个是当前选择的地址
            const userAddress = accounts[0];
            dispatch(setAddress(userAddress));
        } catch (error) {
            console.error("User denied account access");
        }
    } else {
        console.error("Ethereum object doesn't exist!");
    }
  };

  const disconnectWallet = () => {
    dispatch(setAddress(null));
  };

  const shortAddress = (address: string | null) => {
    if (address) {
      return `${address.substring(0, 4)}...${address.substring(address.length - 4)}`;
    }
    return null;
  };

  return (
    <header className="p-4 flex justify-between items-center text-textPrimary border-b border-border">
      <div className="flex items-center space-x-2">
        <Link href={'/'}>
          <Image src={'/assets/svg/logo.svg'} alt={'logo'} width={150} height={28} />
        </Link>
        {/* <div className="flex !ml-8 gap-8">
          <Link className="text-base font-semibold text-textPrimary hover:text-primary transition" href="/square">
            Square
          </Link>
          <Link className="text-base font-semibold text-textPrimary hover:text-primary transition" href="/partners">
            Partners
          </Link>
        </div> */}
      </div>
      <div>
        {/* {walletAddress && (
          <Link href={'/PostRequirements'}>
            <button className="px-4 py-2 mr-4 text-sm border rounded-full border-primary bg-primary text-white hover:bg-white hover:text-primary transition">
              Post Needs
            </button>
          </Link>
        )} */}
        {walletAddress ? (
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <Menu.Button className={commonClasses}>
                {shortAddress(walletAddress)}
              </Menu.Button>
            </div>

            <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
              <div className="py-1">
                <Menu.Item>
                  {({ active }) => (
                      <Link href="/profile" className={`block px-4 py-2 text-sm  ${active ? "bg-gray-100 text-gray-900" : "text-gray-700"} hover:cursor-default`}>
                        Profile
                      </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <div
                      onClick={disconnectWallet}
                      className={`${
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                      } block px-4 py-2 text-sm`}
                    >
                      Disconnect
                    </div>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Menu>
        ) : (
          <button onClick={connectWallet} className={commonClasses}>
            Connect Wallet
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;

