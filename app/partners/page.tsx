import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import { Metadata } from 'next';
import PartnerList from '../components/layout/PartnerList';
import { getMembersData } from '../utils/helpers';
import { connectMongoDB } from '@/lib/mongodb';
import { getServerSession } from 'next-auth';
import { NextAuthOptions } from 'next-auth'; 
import User from '@/models/user';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Filipizen - Partners',
  description: 'Etracs Landing Page',
}

const partners = async() => {
  const partnerData = await getMembersData();
  await connectMongoDB();
  const session = await getServerSession();
  const email = session?.user?.email;
  const user = await User.findOne({ email });
  const fullName = user?.firstName + " " + user?.lastName

  if (user && user.isFirstTimeSigningIn) {
    redirect('/setupprofile');
  }

  else {
    return (
      <div className='h-full overflow-x-hidden relative'>
        <Header 
          navbarStyles='w-screen px-[20px] pt-[5px] pb-[7px] bg-[#ecf0f1] flex justify-between items-center' 
          src='/assets/filipizen.svg'
          height={22.06}
          width={80} 
          title=''
          userName={fullName}
        />
        <div className='p-[20px] w-fit'></div>
        <div className='mx-[48px] h-full'>
          <h1 
            className='text-[#000000d9] text-[1.71rem] font-[700] mb-[16px] leading-none tracking-tight'
          >
            List of Partners
          </h1>
          <PartnerList partnerData={partnerData} />
        </div>
      
        <div className='h-[80px]'></div>
        <Footer />
      </div>
    )
  }

  
}

export default partners