'use client';
import Footer from '@/app/components/layout/Footer';
import Header from '@/app/components/layout/Header';
import ButtonComponent from '@/app/components/ui/ButtonComponent';
import ContentWrapper from '@/app/components/ui/ContentWrapper';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useSession } from 'next-auth/react';
import { Roboto } from 'next/font/google';
import Link from 'next/link';

const roboto = Roboto({ 
  weight: ["400", '500', '700'], 
  subsets: ["latin"]  
});

export let fontTheme = createTheme({
  typography: {
    fontFamily: roboto.style.fontFamily,
  }
})

interface ServiceMapping {
  [key: string]: string;
}

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
  const {data: session, status} = useSession();
  const str = data.includeservices;
  const services = str.split("|");
  
  const serviceMapping: ServiceMapping = {
    "po.*": "Payment Order",
    "bpls.*": "Business",
    "rptis.*": "Real Property", 
  };

  return (
    <ContentWrapper className={`min-h-[100vh] h-screen max-h-[100%] relative`}>
      <Header 
        navbarStyles="w-screen px-[50px] pb-[5px] pt-[3px] bg-[#2c3e50] h-[50px] flex justify-between items-center" 
        src={`https://www.filipizen.com/resources/${data.id}.png`}
        height={40}
        width={40}
        title={data.title}
        extraStyle='text-white'
        page=''
        userName={session?.user?.name}
      />
      <ThemeProvider theme={fontTheme}>
        <ContentWrapper className="mb-[2rem] h-[79.7%]">
          <ContentWrapper className="mx-[80px] px-[32px]">
            <h1 className="mt-[32px] mb-[36px] text-[28px] font-bold leading-none">Select Transaction</h1>
            <ContentWrapper className="container">
              {services.map((service: any) => (
                <ContentWrapper key={service}>
                  <h2 className="mt-[20px] mb-[5px] leading-none text-[#27ae60] text-[19.6px] font-bold">{serviceMapping[service]}</h2>
                  {service === 'bpls.*' ?
                    <ContentWrapper className='flex flex-col leading-relaxed w-fit text-[15.2px] text-[#3f51b5]'>
                      <Link href={`http://localhost:3001/${data.group.name}_${data.name}/${service}/billing`} target='_blank' className="hover:underline">Business Online Billing and Payment</Link>                  
                      <Link href={`http://localhost:3001/${data.group.name}_${data.name}/${service}/newbusiness`} target='_blank' className="hover:underline">New Business Application</Link>                                       
                      <Link href={`http://localhost:3001/${data.group.name}_${data.name}/${service}/renewbusiness`} target='_blank' className="hover:underline">Renew Business Application</Link>                  
                    </ContentWrapper>
                   : 
                  service === 'rptis.*' ?
                    <Link href={`http://localhost:3001/${data.group.name}_${data.name}/${service}/billing`} target='_blank' className="text-[15.2px] text-[#3f51b5] hover:underline">Realty Tax Online Billing and Payment</Link>                  
                   :
                  service === 'po.*' ? 
                    <Link href={`http://localhost:3001/${data.group.name}_${data.name}/${service}/billing`} target='_blank' className="text-[15.2px] text-[#3f51b5] hover:underline">Online Payment Order</Link>                  
                   :
                    null
                  }
                </ContentWrapper>
              ))}
            </ContentWrapper>
            <ContentWrapper className='h-[15px]'></ContentWrapper>
            <hr className="my-[8px] border-slate-500"/>
            <ButtonComponent
              variant='contained'
              className={`text-[14px] font-[500] bg-[#f5f5f5] text-[#731cef] hover:bg-[#eeeaf4] rounded-md tracking-widest`}
              style={{
                boxShadow: 'none',
                border: '1px solid #d7d7d7',
              }} 
            >
              Search Payments
            </ButtonComponent>
            <ContentWrapper className='h-[10px]'></ContentWrapper>
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