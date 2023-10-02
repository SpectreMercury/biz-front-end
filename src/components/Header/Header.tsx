'use client'

import React, { useState } from "react";
import { Menu } from "@headlessui/react";
import Link from "next/link";
import Logo from '../../assets/img/logo.png'
import Image from "next/image";
const Header = () => {
  const commonClasses = "px-4 py-2 text-sm border rounded-full border-primary text-primary hover:bg-primary hover:text-white transition";
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  const connectWallet = () => {
    // 这里添加钱包连接逻辑
    setWalletAddress("0x1234567890abcdef1234567890abcdef12345678");
  };

  const disconnectWallet = () => {
    setWalletAddress(null);
  };

  const shortAddress = (address: string | null) => {
    if (address) {
      return `${address.substring(0, 4)}...${address.substring(address.length - 4)}`;
    }
    return null;
  };

  return (
    <header className="w-screen p-4 flex justify-between items-center text-textPrimary border-b border-border">
      <div className="flex items-center space-x-2">
        <Image src={Logo} alt="Logo" className="h-8 w-auto" />
        {/*<span className="text-lg font-semibold">Logo Text</span>*/}
      </div>
      <div>
        {walletAddress ? (
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <Menu.Button className={commonClasses}>
                {shortAddress(walletAddress)}
              </Menu.Button>
            </div>

            <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                <Menu.Item>
                  {({ active }) => (
                      <Link href="/profile" className={`block px-4 py-2 text-sm  ${active ? "bg-gray-100 text-gray-900" : "text-gray-700"}`}>
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

