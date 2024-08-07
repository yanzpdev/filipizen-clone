'use client';
import Footer from '@/app/components/layout/Footer';
import Header from '@/app/components/layout/Header';
import ContentWrapper from '@/app/components/ui/ContentWrapper';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Roboto } from 'next/font/google';
import Link from 'next/link';
import { useEffect, useState } from 'react';

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

interface ServiceProps {
  seqno: number;
  title: string;
  objid: string;
  services: { name: string; title: string }[];
}

interface ServiceListProps {
  serviceList: ServiceProps[];
}

  
const PartnerLinkLayout: React.FC<{ data: PartnerProps, serviceList: ServiceListProps[] }> = ({ data, serviceList }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  
  return (
    <>
      {isClient &&
      <>
        <ContentWrapper className={`min-h-[95.3vh] h-full relative`}>
          <Header 
            navbarStyles="w-full px-[50px] pb-[5px] pt-[3px] bg-[#2c3e50] h-[50px] flex justify-between items-center" 
            src={`https://www.filipizen.com/resources/${data.id}.png`}
            height={40}
            width={40}
            title={data.title}
            extraStyle='text-white'
            page='partner'
            data={data}
            headerSelect='services'
          />
          <ThemeProvider theme={fontTheme}>
            <ContentWrapper className="mb-[2rem] min-h-[79.7%]">
              <ContentWrapper className="mx-[80px] px-[32px] h-full"> 
                <h1 className="mt-[32px] mb-[16px] text-[28px] font-bold leading-none">Select Transaction</h1>
                <ContentWrapper className="columns-2 w-fit gap-x-5 h-full min-h-[500px]">
                {!serviceList ?
                    <h2 className={`pt-[20px] pb-[5px] leading-none text-slate-800 text-[19.6px] font-semibold`}>No transactions available yet.</h2>
                  :
                    <>
                      {serviceList.map((service: any, index: number) => (
                        <ContentWrapper 
                          key={index} 
                          className={`col-span-1 ${
                            index % 2 === 0 ? 'row-start-1' : 'row-start-2'
                          } break-inside-avoid`}
                        >
                          <h2 className={`pt-[20px] pb-[5px] leading-none text-[#27ae60] text-[19.6px] font-bold order-[${index}]`}>{service.title}</h2>
                          {service.services.map((subservice: any, index: number) => 
                            <ContentWrapper 
                              key={index}
                              className='flex flex-col leading-relaxed w-fit text-[15.2px] text-[#3f51b5]'
                            >
                              <Link 
                                href={`${data.group.name}_${data.name}/${service.objid}/${subservice.name}`} 
                                target='_blank' 
                                className="hover:underline"
                              >
                                {subservice.title}
                              </Link>
                            </ContentWrapper>
                          )}
                        </ContentWrapper>
                      ))}
                    </>
                  }
                </ContentWrapper>
                <ContentWrapper className='h-[15px]'></ContentWrapper>
                {/* <hr className="my-[8px] border-slate-500"/>
                <ContentWrapper className='h-[10px]' /> */}
              </ContentWrapper>
            </ContentWrapper>
          </ThemeProvider>
        </ContentWrapper>
        <Footer inPartner={true}/>
      </>
      }
    </>
  )
}

export default PartnerLinkLayout;