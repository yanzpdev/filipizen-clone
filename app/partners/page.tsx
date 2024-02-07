import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import { Metadata } from 'next';
import PartnerList from '../components/layout/PartnerList';
import { getMembersData } from '../utils/helpers';

export const metadata: Metadata = {
  title: 'Filipizen - Partners',
  description: 'Etracs Landing Page',
}

const partners = async() => {
  const partnerData = await getMembersData();
  return (
    <div className='h-full overflow-x-hidden relative'>
      <Header 
        navbarStyles='w-screen px-[20px] pt-[5px] pb-[7px] bg-[#ecf0f1] flex justify-between items-center' 
        src='/assets/filipizen.svg'
        height={22.06}
        width={80} 
        title=''
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

export default partners