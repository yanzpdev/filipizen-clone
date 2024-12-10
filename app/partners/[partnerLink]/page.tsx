import Custom404 from "@/app/components/layout/Custom404";
import { getMembersData, getServices } from "@/app/utils/CloudPartnerService";
import PartnerLinkLayout from "./PartnerLinkLayout";

interface PageProps {
  params: { partnerLink: string; service: string };
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

export const generateMetadata = async ({ params }: any) => {
  const partnerData: Member[] = await getMembersData();
  const clusterId = params.partnerLink.replace(/[^\w|]/g, "").split("_");
  const acceptedUrlParams: string[] = [];

  const partner: Omit<Member, 'clusterid'>[] = partnerData
    .filter((item) => item.group.name === clusterId[0])
    .map(({ id, title, subtype, state, email, name, includeservices, excludeservices, phoneno, group, channelid, isonline }) => ({
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
    }));

  partnerData.map((partner) => {
    acceptedUrlParams.push(partner.group.name + "_" + partner.name);
  });

  if (acceptedUrlParams.includes(params.partnerLink)) {
    let title = "";
    partner.map((partner) => {
      if (partner.name === clusterId[1]) {
        title = partner.title;
      }
    });
    return {
      title: `Filipizen - ${title}`,
      description: `Filipizen information - ${title} `,
    };
  }

  return {
    title: "Filipizen - Error",
    description: "The page you are looking for does not exist.",
  };
};

const Page: React.FC<PageProps> = async ({ params }) => {
  const partnerData: Member[] = await getMembersData();
  const clusterId = params.partnerLink.replace(/[^\w|]/g, "").split("_");
  const acceptedUrlParams: string[] = [];

  const partner: Omit<Member, "clusterid">[] = partnerData
    .filter((item) => item.group.name === clusterId[0]) // change back to item.clusterid when error occurs
    .map(({ id, title, subtype, state, email, name, includeservices, excludeservices, phoneno, group, channelid, isonline }) => ({
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
    }));

  const services = await getServices(clusterId[0], clusterId[1]);

  var lguId = null;

  partnerData.map((partner) => {
    acceptedUrlParams.push(partner.group.name + "_" + partner.name);
    lguId = partner.id;
  });


  // const test = acceptedUrlParams.filter((item) => item === params.partnerLink);

  if (acceptedUrlParams.includes(params.partnerLink)) {
    return (
      <div className="h-screen">
        {partner.map((item) => (
          <div key={item.id}>
            {item.name === clusterId[1] &&
              <PartnerLinkLayout data={item} serviceList={services} />
            }
          </div>
          // <div key={item.id}>{item.name === clusterId[1] && <PartnerLinkLayout data={item} serviceList={services} />}</div>
        ))}
      </div>
    );
  }

  return <Custom404 />;
};

export default Page;
