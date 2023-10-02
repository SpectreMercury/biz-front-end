"use client"

import { useState } from 'react';
import BackgroundAnimation from '../BackgroundCanvas/BackgroundCanvas';
import { Post } from '@/api/requests'

function PreRelease() {
    const [email, setEmail] = useState('');

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        Post({
            url: '/user/email/registration', // 注意这里的URL变化
            data: {
              email: email,
              walletAddress: "123@qq.com"
            }
        });
    };
    
    return (
        <section className="w-full h-full relative space-y-8 p-20 flex flex-grow flex-col items-center justify-center">
            <BackgroundAnimation />
            <div className="w-80 text-4xl font-bold text-primary-500">
                Welcome to Biz
            </div>

            <div className="w-90 text-lg text-gray-700">
                <p>Our mission is to connect all web3 dapps and make connection easier</p>
            </div>

            <div className="w-80 space-y-4">
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    className="w-full p-2 border border-gray-300 rounded"
                />
                <button onClick={handleSubmit} className="w-full p-2 bg-primary text-white rounded hover:bg-primary-700 transition duration-150">
                    Subscribe
                </button>
            </div>
        </section>
    );
}

export default PreRelease;
