'use client';
import { Raleway, Roboto } from 'next/font/google';
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
}

const HomeComponent: React.FC<LoginComponentProps> = ({ memberData }) => {
  return (
    <ThemeProvider theme={fontTheme}>
      <LandingPage memberData={memberData} />
    </ThemeProvider>
  )
}

export default HomeComponent;
