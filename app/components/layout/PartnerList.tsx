'use client';
import { ThemeProvider, createTheme } from "@mui/material";
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
  subsets: ["latin"],  
  display: 'swap'
});

export let fontTheme = createTheme({
  typography: {
    fontFamily: roboto.style.fontFamily,
  }
})

const PartnerList = ({partnerData}: {partnerData: any}) => {
  const groupedData: Record<string, Member[]> = {};

  partnerData.forEach((item: Member) => {
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
    <div className={`2xl:columns-5 lg:columns-5 md:columns-3 xs:columns-2 columns-1 mb-[16px] h-full`}>
      <ThemeProvider theme={fontTheme}>
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
                  <Link href={`/partners/${item.group.name}_${item.name}`} className="hover:underline" target="_blank">
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </ThemeProvider>
    </div>
  )
}

export default PartnerList;