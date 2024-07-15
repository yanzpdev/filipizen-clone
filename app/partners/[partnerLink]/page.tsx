import { Metadata } from 'next';
import PartnerLinkLayout from './PartnerLinkLayout';
import { getMembersData, getServices } from '@/app/utils/CloudPartnerService';
import Custom404 from '@/app/components/layout/Custom404';

export const metadata: Metadata = {
  title: 'Filipizen - Partners - Service',
  description: 'Filipizen Website',
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
  const clusterId = params.partnerLink.replace(/[^\w|]/g, "").split("_")
  const acceptedUrlParams: string[] = [];

  const partner: Omit<Member, 'clusterid'>[] = partnerData
  .filter((item) => item.group.name === clusterId[0]) // change back to item.clusterid when error occurs
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

  const services = await getServices(clusterId[0], clusterId[1]);

  partnerData.map((partner) => {
    acceptedUrlParams.push(partner.group.name + "_" + partner.name);
  })

  // console.log(acceptedUrlParams.filter((item) => item === params.partnerLink));
  // console.log(partner);

  if (acceptedUrlParams.includes(params.partnerLink)) {
    return (
      <div className='h-screen'>
        {partner.map((item) => (
          <div key={item.id}>
            {item.name === clusterId[1] &&
              <PartnerLinkLayout data={item} serviceList={services} />
            } 
          </div>
        ))}
      </div>
    )
  }

  else {
    return <Custom404 />
  }
}

export default page

