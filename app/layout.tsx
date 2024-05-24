import { Inter } from "next/font/google";
import "./globals.css";
import SessionProvider from './components/SessionProvider'
import { registerLicense } from '@syncfusion/ej2-base';

const inter = Inter({ subsets: ["latin"], display: 'swap' });
registerLicense('Ngo9BigBOggjHTQxAR8/V1NBaF1cXmhPYVJwWmFZfVpgdV9CZlZRRGYuP1ZhSXxXdkBiXn9fdHJVR2hVVkY=');

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <SessionProvider>
        <body className={inter.className}>{children}</body>
      </SessionProvider>
    </html>
  );
}
