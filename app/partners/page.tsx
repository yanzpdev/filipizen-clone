import Header from '@/components/ui/Header';
import Footer from '@/components/ui/Footer';
import { getMembersData } from '../../services/CloudPartnerService';
import { Partner } from "@/types/types";
import Link from "next/link";
import Panel from '@/components/io/Panel';

const Partners = async() => {
  const partnerData = await getMembersData();
  const groupedData: Record<string, Partner[]> = {};
  
  partnerData.forEach((item: Partner) => {
    const { clusterid } = item;
  
    if (!groupedData[clusterid]) {
      groupedData[clusterid] = [];
    }
    groupedData[clusterid].push(item);
  });
  
  Object.values(groupedData).forEach((group) => {
    group.sort((a, b) => a.title.localeCompare(b.title));
  });
  
  const clusteridMapping: Record<string, string> = {
    sarangani: 'Sarangani',
    aklan: 'Aklan',
    aklanterminal: 'Aklan Terminal',
    albay: 'Albay',
    antique: 'Antique',
    bohol: 'Bohol',
    bukidnon: 'Bukidnon',
    camsur: 'Camarines Sur',
    catanduanes: 'Catanduanes',
    cebu: 'Cebu',
    davor: 'Davao Oriental',
    ddn: 'Davao Del Norte',
    ddo: 'Davao De Oro',
    gensan: 'General Santos',
    guimaras: 'Guimaras',
    ilocosnorte: 'Ilocos Norte',
    lanaodelnorte: 'Lanao Del Norte',
    masbate: 'Masbate',
    misoc: 'Misamis Occidental',
    misor: 'Misamis Oriental',
    negocc: 'Negros Occidental',
    negor: 'Negros Oriental',
    nuevaecija: 'Nueva Ecija',
    nuevavizcaya: 'Nueva Vizcaya',
    palawan: 'Palawan',
    quezon: 'Quezon',
    sorsogon: 'Sorsogon',
    surigaodelnorte: 'Surigao Del Norte',
    zamboanga: 'Zamboanga',
    zdn: 'Zamboanga Del Norte'
  };

  return (
    <Panel className='h-full overflow-x-hidden relative'>
      <Header 
        navbarStyles='w-screen px-[20px] pt-[5px] pb-[7px] bg-[#ecf0f1] flex justify-between items-center' 
        src='/assets/filipizen.svg'
        height={22.06}
        width={80} 
        title=''
      />
      <Panel className='p-[20px] w-fit'></Panel>
      <Panel className='mx-[48px] h-full'>
        <h1 className='text-[#000000d9] text-[1.71rem] font-[700] mb-[16px] leading-none tracking-tight'>
          List of Partners
        </h1>
        <Panel className={`2xl:columns-5 lg:columns-5 md:columns-3 xs:columns-2 columns-1 mb-[16px] h-full`}>
          {Object.keys(groupedData).map((clusterid) => (
            <Panel key={clusterid} style={{ breakInside: "avoid-column" }} className="w-[250px] h-fit">
              <ul className="flex flex-col w-fit">
                {clusteridMapping[clusterid] && (
                  <h1 className="text-xl text-[#27ae60] font-bold mt-[20px] mb-[5px] leading-none tracking-[-0.01em]">
                    {clusteridMapping[clusterid]}
                  </h1>
                )}
                {groupedData[clusterid].map((item: any) => (
                  <li className="text-[#3f51b5] text-[15.2px] leading-6 w-fit" key={item.id}>
                    <Link href={`/partners/${item.group.name}_${item.name}`} className="hover:underline">
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </Panel>
          ))}
        </Panel>
      </Panel>
    
      <Panel className='h-[80px]'></Panel>
      <Panel className='w-full absolute bottom-0'>
        <Footer />
      </Panel>
     
    </Panel>
  )
}
export default Partners;
