"use client"

import React, { useState } from 'react';
import BackgroundAnimation from '../BackgroundCanvas/BackgroundCanvas';
import { Post } from '@/api/requests';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import GlobalAlert from '../BizAlert/BizAlert';

type ApiResponse = {
  code: number;
  message: string;
  // ...其他可能的字段
};

function PreRelease() {
    const [email, setEmail] = useState<string>('');
    const [responseMessage, setResponseMessage] = useState<string>('');
    const [alertMessage, setAlertMessage] = useState<string | null>(null);
    const walletAddress = useSelector((state: RootState) => state.wallet.address);

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        try {
            const response: ApiResponse = await Post({
                url: 'http://124.223.105.57:8883/user/email/registration', 
                data: {
                  email: email,
                  walletAddress: walletAddress
                }
            });

            if (response && response.code === 200) {
                setResponseMessage('Thank you for your attention. We will notify you by email as soon as the product launches.');
            } else {
                setAlertMessage('The server is having a hiccup. Please try again later.');
            }
        } catch (error) {
            setAlertMessage('The server is having a hiccup. Please try again later.');
        }
    };
    
    return (
        <section className="w-full h-full relative space-y-8 p-20 flex flex-grow flex-col items-center justify-center">
            <BackgroundAnimation />
            <div className="w-80 text-4xl font-bold text-primary-500">
                Welcome to Biz
            </div>

            <div className="w-90 text-lg text-gray-700">
                <p>{responseMessage || 'Our mission is to connect all web3 dapps and make connection easier'}</p>
            </div>

            <div className="w-80 space-y-4">
                {responseMessage ? (
                    <p className="font-bold underline">{email}</p>
                ) : (
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Your email address"
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                )}
                {!responseMessage && (
                    <button onClick={handleSubmit} className="w-full p-2 bg-primary text-white rounded hover:bg-primary-700 transition duration-150">
                        Subscribe
                    </button>
                )}
            </div>

            {alertMessage && <GlobalAlert message={[alertMessage]} type="error" />}
        </section>
    );
}

export default PreRelease;
