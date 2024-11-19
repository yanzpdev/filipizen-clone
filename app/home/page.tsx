import React from 'react';
import { Metadata } from 'next';
import HomeLayout from './HomeLayout';
import localFont from 'next/font/local';

export const metadata: Metadata = {
  title: 'Filipizen - Home',
  description: 'Filipizen Website',
}

const GoogleSans = localFont({ src: '../fonts/GoogleSans-Regular.ttf' });

const page = () => {
  return (
    <main className={`w-full h-full ${GoogleSans.className}`}>
      <HomeLayout />
    </main>
  )
}

export default page