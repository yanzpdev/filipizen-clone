import React from "react"
import { Metadata } from "next"
import localFont from 'next/font/local';

export const metadata: Metadata = {
  title: 'Filipizen - Home',
  description: 'Filipizen Website',
}

const GoogleSans = localFont({ src: '../../fonts/GoogleSans-Regular.ttf' });

export default function HomeLayout({children}: {children:React.ReactNode}) {
  return (
    <main className={GoogleSans.className}>
      {children}
    </main>
  );
}