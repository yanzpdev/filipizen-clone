import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import { Metadata } from 'next';
import PartnerList from '../components/layout/PartnerList';
import { getMembersData } from '../utils/CloudPartnerService';
import ContentWrapper from '../components/ui/ContentWrapper';

export const metadata: Metadata = {
  title: 'Filipizen - Partners',
  description: 'Filipizen Web',
}

const partners = async() => {
  const partnerData = await getMembersData();

    return (
      <ContentWrapper className='h-full overflow-x-hidden relative'>
        <Header 
          navbarStyles='w-screen px-[20px] pt-[5px] pb-[7px] bg-[#ecf0f1] flex justify-between items-center' 
          src='/assets/filipizen.svg'
          height={22.06}
          width={80} 
          title=''
        />
        <ContentWrapper className='p-[20px] w-fit'></ContentWrapper>
        <ContentWrapper className='mx-[48px] h-full'>
          <h1 
            className='text-[#000000d9] text-[1.71rem] font-[700] mb-[16px] leading-none tracking-tight'
          >
            List of Partners
          </h1>
          <PartnerList partnerData={partnerData} />
        </ContentWrapper>
      
        <ContentWrapper className='h-[80px]'></ContentWrapper>
        <div className='w-full absolute bottom-0'>
          <Footer />
        </div>
       
      </ContentWrapper>
    )
  }
export default partners
