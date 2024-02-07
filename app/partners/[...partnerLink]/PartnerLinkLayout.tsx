import Footer from '@/app/components/layout/Footer';
import Header from '@/app/components/layout/Header';
import { Button } from '@mui/material';
import { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import Link from 'next/link';

const roboto = Roboto({ 
    weight: ['500', '700'], 
    subsets: ["latin"],  
    display: 'swap'
  });

  export const metadata: Metadata = {
    title: 'Filipizen - Partners',
    description: 'Etracs Landing Page',
  }

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
  const str = data.includeservices;
  const services = str.replace(/[^\w|]/g, "").split("|");
  services.sort();
  
  const serviceMapping: ServiceMapping = {
    po: "Payment Order",
    rptis: "Real Property",
    bpls: "Business",
    renewbusiness: ''
  };

  return (
    <div className={`min-h-[100vh] h-screen max-h-[100%] relative ${roboto.className}`}>
    <Header 
      navbarStyles="w-screen px-[50px] pb-[5px] pt-[3px] bg-[#2c3e50] h-[50px] flex justify-between items-center" 
      src={`https://www.filipizen.com/resources/${data.id}.png`}
      height={40}
      width={40}
      title={data.title}
    />
    <div className="mb-[2rem] h-[79.7%]">
      <div className="mx-[80px] px-[32px]">
        <h1 className="mt-[32px] mb-[36px] text-[28px] font-bold leading-none">Select Transaction</h1>
        <div className="container">
          {services.map((service: any) => (
            <div key={service}>
              <h2 className="mt-[20px] mb-[5px] leading-none text-[#27ae60] text-[19.6px] font-bold">{serviceMapping[service]}</h2>
              {service === 'bpls' ?
                <div className='flex flex-col leading-relaxed'>
                  <Link href={`/partners/${data.group.name}_${data.name}/${service}/billing`} className="text-[15.2px] text-[#3f51b5] hover:underline">Business Online Billing and Payment</Link>                  
                  <Link href={`/partners/${data.group.name}_${data.name}/${service}/newbusiness`} className="text-[15.2px] text-[#3f51b5] hover:underline">New Business Application</Link>                  
                  <Link href={`/partners/${data.group.name}_${data.name}/${service}/renewbusiness`} className="text-[15.2px] text-[#3f51b5] hover:underline">Renew Business Application</Link>                  
                </div>
               : 
              service === 'rptis' ?
                <Link href={`/partners/${data.group.name}_${data.name}/${service}/billing`} className="text-[15.2px] text-[#3f51b5] hover:underline">Realty Tax Online Billing and Payment</Link>                  
               :
              service === 'po' ? 
                <Link href={`/partners/${data.group.name}_${data.name}/${service}/billing`} className="text-[15.2px] text-[#3f51b5] hover:underline">Online Payment Order</Link>                  
               :
                null
              }
            </div>
          ))}
        </div>
        <div className='h-[15px]'></div>
        <hr className="my-[8px] border-slate-500"/>
        <Button
         variant='contained'
         className={`text-[14px] font-[500] bg-[#f5f5f5] text-[#731cef] hover:bg-[#eeeaf4] rounded-md ${roboto.className} tracking-widest`}
         style={{
           boxShadow: 'none',
           border: '1px solid #d7d7d7',
         }}
        >
          Search Payments
        </Button>
      </div>
    </div>
    <Footer />
  </div>
  )
}

export default PartnerLinkLayout