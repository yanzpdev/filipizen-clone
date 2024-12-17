import { getPartnerData, getServices } from "@/services/CloudPartnerService";
import Panel from "@/components/io/Panel";
import Header from "@/components/ui/Header";
import Link from "next/link";
import { redirect } from "next/navigation";

const PartnerLinkPage = async({ params }: { params: { partnerLink: string } }) => {
  const matchString = params.partnerLink.match(/^([^_]+)_(.+)$/);
  let groupName = '';
  let name = '';

  if (matchString) {
    [groupName, name] = [matchString[1], matchString[2]];
  }

  const partner = await getPartnerData(groupName, name);
  const serviceList = await getServices(groupName, name);

  if (partner.status === "ERROR") {
    redirect(`/partners/inactive?groupname=${groupName}&name=${name}`);
  }

  return (
    <Panel className={`min-h-[95.3vh] h-full relative`}>
      <Header 
        navbarStyles="w-full px-[50px] pb-[5px] pt-[3px] bg-[#2c3e50] h-[50px] flex justify-between items-center" 
        src={`/assets/partner/${partner.id}.png`} 
        height={40} 
        width={40} 
        title={partner.title} 
        page="partner" 
        data={partner} 
        headerSelect="services" 
      />
      <Panel className="mb-[2rem] min-h-[79.7%]">
        <Panel className="mx-[80px] px-[32px] h-full">
          <h1 className="mt-[32px] mb-[16px] text-[28px] font-bold leading-none">Select Transaction</h1>
          <Panel className="columns-2 w-fit gap-x-5 h-full min-h-[500px]">
            {!serviceList ? (
              <h2 className={`pt-[20px] pb-[5px] leading-none text-slate-800 text-[19.6px] font-semibold`}>No transactions available yet.</h2>
            ) : (
              <>
                {serviceList.map((service: any, index: number) => (
                  <Panel
                    key={index}
                    className={`w-full break-inside-avoid ${service.objid === "void" && "invisible"}`} // ${ index % 2 === 0 ? 'row-start-1' : 'row-start-2' }
                  >
                    <h2 className={`pt-[20px] pb-[5px] leading-none text-[#27ae60] text-[19.6px] font-bold order-[${index}]`}>{service.title}</h2>
                    {service.services.map((subservice: any, subIndex: number) => (
                      <Panel key={subIndex} className="flex flex-col leading-relaxed w-fit text-[15.2px] text-[#3f51b5]">
                        <Link
                          prefetch={false}
                          href={`${subservice.pathname ? `${subservice.pathname}/${partner.group.name}_${partner.name}/${subservice.parent.objid}/${subservice.name}` : `/partners/${partner.group.name}_${partner.name}/${subservice.parent.objid}/${subservice.name}`}${subservice.pathname ? '/' : ''}`}
                          className="hover:underline"
                        >
                          {subservice.title}
                        </Link>
                      </Panel>
                    ))}
                  </Panel>
                ))}
              </>
            )}
          </Panel>
          <Panel className="h-[15px]"></Panel>
        </Panel>
      </Panel>
    </Panel>
  )
};

export default PartnerLinkPage;
