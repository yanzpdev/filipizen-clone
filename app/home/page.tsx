import React from 'react';
import { Metadata } from 'next';
import HomeLayout from './HomeLayout';
import localFont from 'next/font/local';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Filipizen - Home',
  description: 'Filipizen Website',
}

const GoogleSans = localFont({ src: '../fonts/GoogleSans-Regular.ttf' });

const page = () => {
  const session = true;

  if (session) {
    return (
      <main className={`w-full h-full ${GoogleSans.className}`}>
        <HomeLayout />
      </main>
    )
  }

  else {
    return (
      <main className={`w-screen h-screen flex items-center justify-center ${GoogleSans.className}`}>
        <div className='flex flex-col items-center justify-center gap-y-5'>
          <Image
            src={`/assets/filipizen.svg`} 
            alt={`Filipizen Logo`} 
            width={250} 
            height={250} 
            priority
            className="w-auto h-[70px]"
          />
          <span>
            Please
            <Link 
              href={'/login'}
              className='font-semibold hover:underline underline-offset-2'
            >
              &nbsp;sign in&nbsp;
            </Link>
            to continue
          </span>
        </div>
        
      </main>
    )
  }
}

export default page