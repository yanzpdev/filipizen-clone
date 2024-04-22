'use client';
import { Raleway, Roboto } from 'next/font/google';
import {useSession } from 'next-auth/react'; 
import SetUpProfilePage from './SetUpProfilePage';
import LandingPage from './LandingPage';
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material';

interface Partner {
  id: number;
  title: string;
  subtype: string;
  group: { title: string };
  clusterid: string;
}

const roboto = Roboto({ 
  weight: ["400", '500', '700'], 
  subsets: ["latin"],
  display: 'swap'  
});

export let fontTheme = createTheme({
  typography: {
    fontFamily: roboto.style.fontFamily,
  }
})


interface LoginComponentProps {
  memberData: Partner[];
  userEmail: string;
  name: string;
  isFirstTimeSigningIn: boolean;
}

const HomeComponent: React.FC<LoginComponentProps> = ({ memberData, userEmail, name, isFirstTimeSigningIn }) => {
  const {data: session } = useSession();

  if (session?.user) {
    if (isFirstTimeSigningIn) {
      return (
        <SetUpProfilePage 
          userEmail={userEmail}
          fullName={name}
          memberData={memberData}
        />
      )
    }

    else {
      return (
        <ThemeProvider theme={fontTheme}>
          <LandingPage memberData={memberData} userEmail={userEmail} fullName={name} isFirstTimeSigningIn={isFirstTimeSigningIn} />
        </ThemeProvider>
      )
    }
  }

  else {
    return (
      <ThemeProvider theme={fontTheme}>
        <LandingPage memberData={memberData} userEmail={userEmail} fullName={name} isFirstTimeSigningIn={isFirstTimeSigningIn} />
      </ThemeProvider>
    )
  }
}

export default HomeComponent;
