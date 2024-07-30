'use client';
import React from 'react';
import Footer from '@/app/components/layout/Footer';
import Header from '@/app/components/layout/Header';
import ButtonComponent from '@/app/components/ui/ButtonComponent';
import ContentWrapper from '@/app/components/ui/ContentWrapper';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Roboto } from 'next/font/google';
import { useState, useEffect } from 'react';
import Link from 'next/link';

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

const PartnerLinkLayout: React.FC<{ data: PartnerProps }> = ({ data }) => {
  const [display, setDisplay] = useState('reports');
  const [chartType, setChartType] = useState('BarChart');
  const [dataType, setDataType] = useState('Amount');
  const [dataTypeInfo, setDataTypeInfo] = useState([]);

  const chartdata = [
    ["City", dataType],
    ["GCash", 8175000, 8008000],
    ["Maya", 3792000, 3694000],
    ["LBP", 2695000, 2896000],
  ];

  const items = [
    {
      name: 'Datasets', 
      menu: 
      [
        {name: 'Real Property'},
        {name: 'Business Data'}
      ]
    },
    {
      name: 'Reports', 
      menu: 
      [
        {name: 'Quarterly Report of Real Property Assessment (QRRPA)'},
        {name: 'Assessment Roll'},
        {name: 'Statement of Receipt Sources'},
        {name: 'City Municipality Competitive Index (CMCI)'},
        {name: 'PSIC Report'},
        {name: 'LIFT Report'}
      ]
    }
  ];
  
  return (
    <ContentWrapper className={`min-h-[100vh] max-h-[100%] relative w-screen`}>
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
      <ThemeProvider theme={fontTheme}>
        <ContentWrapper className="mb-[2rem] min-h-[79.7%]">
          <ContentWrapper className="mx-[80px] px-[32px] h-full">
          <h1 className="mt-[32px] mb-[16px] text-[28px] font-bold leading-none">Datasets</h1>
          <ContentWrapper className="flex flex-col w-fit gap-x-5 h-full">
          {items ?
            <>
              {items.map((item, index) => (
                <ContentWrapper 
                  key={index} 
                  className={`col-span-1 ${
                    index % 2 === 0 ? 'row-start-1' : 'row-start-2'
                  } break-inside-avoid`}
                >
                  <h2 className={`pt-[20px] pb-[5px] leading-none text-[#27ae60] text-[19.6px] font-bold `}>{item.name}</h2>
                    <ContentWrapper className='flex flex-col leading-relaxed w-fit text-[15.2px] text-[#3f51b5]'>
                      {item.menu.map((menuItem, index) => 
                      <Link 
                        key={index}
                        href={`data/rptdata`} 
                        className="hover:underline"
                      >
                        {menuItem.name}
                      </Link>
                      )}
                    </ContentWrapper>
                </ContentWrapper>
              ))} 
            </>
          :
            <h2 className={`pt-[20px] pb-[5px] leading-none text-slate-800 text-[19.6px] font-semibold`}>No data available yet.</h2>
          }

            </ContentWrapper>
            <ContentWrapper className='h-[15px]'></ContentWrapper>
            {/* <hr className="my-[8px] border-slate-500"/>
            <ContentWrapper className='h-[10px]' /> */}
          </ContentWrapper>
        </ContentWrapper>
      </ThemeProvider>
      <ContentWrapper className='w-full absolute bottom-0'>
        <Footer />
      </ContentWrapper>
    </ContentWrapper>
  )
}

export default PartnerLinkLayout;