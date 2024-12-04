'use client';
import { useState } from 'react';
import Footer from '@/app/components/layout/Footer';
import Header from '@/app/components/layout/Header';
import ContentWrapper from '@/app/components/ui/ContentWrapper';
// import ChartDataComponent from '@/app/components/ui/ChartDataComponent';
// import PivotTableComponent from '@/app/components/ui/PivotTableComponent';

interface PartnerProps {
  id: number;
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

const PartnerLinkLayout: React.FC<{ data: PartnerProps, pivotData: any }> = ({ data, pivotData }) => {
  return (
    <ContentWrapper className="min-h-[100vh] h-full relative w-full overflow-x-hidden">
      <Header 
        navbarStyles="w-screen px-[50px] pb-[5px] pt-[3px] bg-[#2c3e50] h-[50px] flex justify-between items-center" 
        src={`https://www.filipizen.com/resources/${data.id}.png`}
        height={40}
        width={40}
        title={data.title}
        extraStyle="text-white"
        page="partner"
        data={data}
        headerSelect="data"
      />
      <ContentWrapper className="mb-[2rem] min-h-[79.7%]">
        <ContentWrapper className="mx-[80px] px-[32px]"> 
          <ContentWrapper className="w-full h-full">
            <ContentWrapper className="my-10">
              {/* <PivotTableComponent data={pivotData} /> */}
              {/* <ChartDataComponent pivotData={pivotData} /> */}
            </ContentWrapper>
          </ContentWrapper>
          <ContentWrapper className="h-[10px]" />
        </ContentWrapper>
      </ContentWrapper>
      <ContentWrapper className="w-full absolute bottom-0">
        <Footer />
      </ContentWrapper>
    </ContentWrapper>
  );
}

export default PartnerLinkLayout;
