"use client"

import Header from '@/components/Header/Header'
import './globals.css'
// import { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { WebSocketProvider } from '@/context/websocketContext'
import Footer from '@/components/Footer/Footer'
import { Provider } from 'react-redux';
import store from '@/store/store';

const inter = Inter({ subsets: ['latin'] })

// export const metadata: Metadata = {
//   title: 'Create Next App',
//   description: 'Generated by create next app',
// }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <title>Biz Nexus</title>
        <meta name='description' content='Connect with all dApps' />
      </head>
      <body className={inter.className}>
        <Provider store={store}>
          <WebSocketProvider>
            <Header />
            {children}
            <Footer />
        </WebSocketProvider>
        </Provider>
      </body>
    </html>
  )
}
