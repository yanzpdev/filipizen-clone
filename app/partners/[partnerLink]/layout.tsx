import { getPartnerData } from "@/services/CloudPartnerService";
import React from "react";
import { Metadata } from "next"; 
import Footer from "@/components/ui/Footer";

export async function generateMetadata({ params }: { params: { partnerLink: string } }): Promise<Metadata> {
  const matchString = params.partnerLink.match(/^([^_]+)_(.+)$/);
  
  if (matchString) {
    const [groupName, name] = [matchString[1], matchString[2]];
    const partnerData = await getPartnerData(groupName, name);
    const title = partnerData?.title || `Inactive Partner`;
    const description = `Details for ${title} from Filipizen Web`;

    return {
      title: `Filipizen - ${title}`,
      description,
    };
  }

  return {
    title: "Filipizen - Partners",
    description: "Filipizen Web",
  };
}

export default async function PartnerLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="h-screen w-full flex flex-col items-center justify-between">
      {children}
      <Footer inPartner={true} />
    </main>
  );
}
