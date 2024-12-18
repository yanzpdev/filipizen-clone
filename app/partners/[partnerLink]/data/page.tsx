import Panel from '@/components/io/Panel';
import Header from '@/components/ui/Header';
import { getPartnerData } from '@/services/CloudPartnerService';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react'

const PartnerLinkDataPage = async({ params }: { params: { partnerLink: string } }) => {
  const matchString = params.partnerLink.match(/^([^_]+)_(.+)$/);
  let groupName = '';
  let name = '';

  if (matchString) {
    [groupName, name] = [matchString[1], matchString[2]];
  }

  const partner = await getPartnerData(groupName, name);

  if (partner.status === "ERROR") {
    redirect(`/partners/inactive?groupname=${groupName}&name=${name}`);
  }

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
    <Panel className={`h-full w-full relative`}>
      <Header 
        className="w-full px-5 lg:px-[50px] pb-[5px] pt-[3px] bg-[#2c3e50] h-[50px] flex justify-between items-center" 
        src={`/assets/partner/${partner.id}.png`} 
        height={40} 
        width={40} 
        title={partner.title} 
        page="partner" 
        data={partner} 
        headerSelect="data" 
      />
      <Panel className="mb-[2rem] min-h-[79.7%]">
        <Panel className="mx-[20px] lg:mx-[80px] lg:px-[32px] h-full">
          <h1 className="mt-[32px] mb-[16px] lg:text-[28px] font-bold leading-none">Select Transaction</h1>
          <Panel className="flex flex-col w-fit gap-x-5 h-full">
            {items ?
              <>
                {items.map((item, index) => (
                  <Panel 
                    key={index} 
                    className={`col-span-1 ${
                      index % 2 === 0 ? 'row-start-1' : 'row-start-2'
                    } break-inside-avoid`}
                  >
                    <h2 className={`pt-[20px] pb-[5px] leading-none text-[#27ae60] lg:text-[19.6px] font-bold `}>{item.name}</h2>
                      <Panel className='flex flex-col leading-relaxed w-fit text-sm lg:text-[15.2px] text-[#3f51b5]'>
                        {item.menu.map((menuItem, index) => 
                        <Link 
                          prefetch={false}
                          key={index}
                          href={`data/rptdata`} 
                          className="hover:underline"
                        >
                          {menuItem.name}
                        </Link>
                        )}  
                      </Panel>
                  </Panel>
                ))} 
              </>
            :
              <h2 className={`pt-[20px] pb-[5px] leading-none text-slate-800 text-[19.6px] font-semibold`}>No data available yet.</h2>
            }
          </Panel>
          <Panel className="h-[15px]" />
        </Panel>
      </Panel>
    </Panel>
  )
}

export default PartnerLinkDataPage;