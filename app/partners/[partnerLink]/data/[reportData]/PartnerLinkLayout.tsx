'use client';
import Footer from '@/app/components/layout/Footer';
import Header from '@/app/components/layout/Header';
import ContentWrapper from '@/app/components/ui/ContentWrapper';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Roboto } from 'next/font/google';
import { useState, useEffect } from 'react';

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


interface PartnerProps {
  id: number;
  title: string;
  subtype: string;
  state: string;
  email: string;
  name: string;
  includeservices: string;
  excludeservices: string;
  phoneno: string;
  group: {
    name: string;
    objid: string;
    title: string;
  } 
  channelid: string;
  isonline: string;
}



const PartnerLinkLayout: React.FC<{ data: PartnerProps, pivotdata: any }> = ({ data, pivotdata }) => {
  const [dataType, setDataType] = useState('Amount');
  const chartdata = [
    ["City", dataType],
    ["GCash", 8175000, 8008000],
    ["Maya", 3792000, 3694000],
    ["LBP", 2695000, 2896000],
  ];
  
  const options = {
    title: "Population of Largest U.S. Cities",
    chartArea: { width: "50%" },
    hAxis: {
      title: "Total Population",
      minValue: 0,
    },
    vAxis: {
      title: "City",
    },
  };
  
  return (
    <ContentWrapper className={`min-h-[100vh] h-full relative w-full overflow-x-hidden`}>
      <Header 
        navbarStyles="w-screen px-[50px] pb-[5px] pt-[3px] bg-[#2c3e50] h-[50px] flex justify-between items-center" 
        src={`https://www.filipizen.com/resources/${data.id}.png`}
        height={40}
        width={40}
        title={data.title}
        extraStyle='text-white'
        page='partner'
        data={data}
        headerSelect='data'
      />
      <ContentWrapper className="mb-[2rem] min-h-[79.7%]">
        <ContentWrapper className="mx-[80px] px-[32px]"> 
          <ContentWrapper className="w-full h-full">
            <ContentWrapper className='mt-16'>
              No data available.
            </ContentWrapper>
          </ContentWrapper>
          <ContentWrapper className='h-[10px]' />
        </ContentWrapper>
      </ContentWrapper>
      <ContentWrapper className='w-full absolute bottom-0'>
        <Footer />
      </ContentWrapper>
    </ContentWrapper>
  )
}

export default PartnerLinkLayout;