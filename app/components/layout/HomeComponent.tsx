'use client';
import { Raleway, Roboto } from 'next/font/google';
import {useSession } from 'next-auth/react'; 
import SetUpProfilePage from './SetUpProfilePage';
import LandingPage from './LandingPage';

interface Partner {
  id: number;
  title: string;
  subtype: string;
  group: { title: string };
}

const roboto = Roboto({ 
  weight: ["400", '500', '700'], 
  subsets: ["latin"],
  display: 'swap'  
});


interface LoginComponentProps {
  memberData: Partner[];
  userEmail: string;
  name: string;
  isFirstTimeSigningIn: boolean;
}

const LoginComponent: React.FC<LoginComponentProps> = ({ memberData, userEmail, name, isFirstTimeSigningIn }) => {
  const {data: session } = useSession();

  if (session?.user) {
    if (isFirstTimeSigningIn) {
      return (
        <SetUpProfilePage 
          userEmail={userEmail}
          name={name}
        />
      )
    }

    else {
      return (
        <LandingPage memberData={memberData} userEmail={userEmail} name={name} isFirstTimeSigningIn={isFirstTimeSigningIn} />
      )
    }
  }

  else {
    return (
      <LandingPage memberData={memberData} userEmail={userEmail} name={name} isFirstTimeSigningIn={isFirstTimeSigningIn} />
    )
  }
}

export default LoginComponent;
