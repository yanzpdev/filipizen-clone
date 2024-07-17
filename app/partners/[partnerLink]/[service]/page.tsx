import Custom404 from '@/app/components/layout/Custom404'
import Header from '@/app/components/layout/Header';
import { getMembersData } from '@/app/utils/CloudPartnerService';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Filipizen - Error',
  description: 'Not Found',
}

interface Member {
  id: number;
  clusterid: string;
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
  };
  channelid: string;
  isonline: string;
}
  
const page = async({params}: any) => {
  const partnerData: Member[] = await getMembersData();
  const clusterId = params.partnerLink.replace(/[^\w|]/g, "").split("_");  
  const partners: Omit<Member, 'clusterid'>[] = partnerData
  .filter((item) => item.group.name === clusterId[0])
  .map(({ 
    id, 
    title, 
    subtype,
    state,
    email,
    name,
    includeservices,
    excludeservices,
    phoneno,
    group,
    channelid,
    isonline,
    clusterid
  }) => ({ 
    id, 
    title, 
    subtype,
    state,
    email,
    name,
    includeservices,
    excludeservices,
    phoneno,
    group,
    channelid,
    isonline,
    clusterid
  }));

  const partner = partners.filter((item) => item.name === clusterId[1]);
  const partnerId = partner[0].id;
  const partnerTitle = partner[0].title;

  return (
    <>
      <Header 
        navbarStyles="w-full px-[50px] pb-[5px] pt-[3px] bg-[#2c3e50] h-[50px] flex justify-between items-center" 
        src={`/assets/partner/${partnerId}.png`}
        height={40}
        width={40}
        title={partnerTitle}
        extraStyle='text-white'
        page='partner'
        headerSelect='services'
        hidePartnerOptions
        data={partner[0]}
      />
      <Custom404 />
    </>
  )
}

export default page