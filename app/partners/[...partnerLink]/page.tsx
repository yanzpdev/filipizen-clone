import { Metadata } from 'next';
import PartnerLinkLayout from './PartnerLinkLayout';
import { getMembersData } from '@/app/utils/helpers';

export const metadata: Metadata = {
  title: 'Filipizen - Partners',
  description: 'Etracs Landing Page',
}

interface PageProps {
  params: {partnerLink: string};
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
  } 
  channelid: string;
  isonline: string;

}

const page:React.FC<PageProps> = async({params}) => {
  const partnerData: Member[] = await getMembersData();
  const clusterId = params.partnerLink[0].replace(/[^\w|]/g, "").split("_")

  const partner: Omit<Member, 'clusterid'>[] = partnerData
  .filter((item) => item.clusterid === clusterId[0])
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
    isonline
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
    isonline
  }));

  return (
    <div className='h-screen'>
      {partner.map((item) => (
        <div key={item.id}>
          {item.name === clusterId[1] &&
            <PartnerLinkLayout data={item} />
          } 
        </div>
      ))}
    </div>
  )
}

export default page

