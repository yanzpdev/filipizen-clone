import { Roboto } from "next/font/google";
import Link from "next/link";

interface Member {
  id: number;
  clusterid: string;
  title: string;
  subtype: string;
  state: string;
}
const roboto = Roboto({ 
  weight: ["400", '500', '700'], 
  subsets: ["latin"]  
});

const PartnerList = ({partnerData}: {partnerData: any}) => {
    const groupedData: Record<string, Member[]> = {};
  
    // Grouping partnerData by clusterid
    partnerData.forEach((item: Member) => {
      const { clusterid } = item;
    
      if (!groupedData[clusterid]) {
        groupedData[clusterid] = [];
      }
      groupedData[clusterid].push(item);
    });
  
    // Sorting each group alphabetically by title
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
    <div className={`columns-5 mb-[16px] h-full ${roboto.className}`}>
      {Object.keys(groupedData).map((clusterid) => (
        <div key={clusterid} style={{ breakInside: "avoid-column" }} className="w-[250px] h-fit">
          <ul className="flex flex-col w-fit">
            {clusteridMapping[clusterid] && (
              <h1 className="text-xl text-[#27ae60] font-bold mt-[20px] mb-[5px] leading-none tracking-[-0.01em]">
                {clusteridMapping[clusterid]}
              </h1>
            )}
            {groupedData[clusterid].map((item: any) => (
              <li className="text-[#3f51b5] text-[15.2px] leading-6 w-fit" key={item.id}>
                <Link href={`/partners/${clusterid}_${item.name}`} className="hover:underline">
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

export default PartnerList