'use client';
import Footer from '@/app/components/layout/Footer';
import Header from '@/app/components/layout/Header';
import ButtonComponent from '@/app/components/ui/ButtonComponent';
import ContentWrapper from '@/app/components/ui/ContentWrapper';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useSession } from 'next-auth/react';
import { Roboto } from 'next/font/google';
import { useState, useEffect } from 'react';
import { Chart } from "react-google-charts";
import PivotTable from './PivotTable';


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

interface ServiceMapping {
  [key: string]: string;
}

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

const PartnerLinkLayout: React.FC<{ data: PartnerProps }> = ({ data }) => {
  const chartdata = [
    ["City", "2010 Population", "2000 Population"],
    ["New York City, NY", 8175000, 8008000],
    ["Los Angeles, CA", 3792000, 3694000],
    ["Chicago, IL", 2695000, 2896000],
    ["Houston, TX", 2099000, 1953000],
    ["Philadelphia, PA", 1526000, 1517000],
  ];
  
  const options = {
    title: "Population of Largest U.S. Cities",
    chartArea: { width: "50%" },
    hAxis: {
      title: "Total Population",
      minValue: 0,
    },
    vAxis: {
      title: "City",
    },
  };
  
  const {data: session, status} = useSession();
  const [display, setDisplay] = useState('reports');



  return (
    <ContentWrapper className={`min-h-[100vh] max-h-[100%] relative w-screen`}>
      <Header 
        navbarStyles="w-screen px-[50px] pb-[5px] pt-[3px] bg-[#2c3e50] h-[50px] flex justify-between items-center" 
        src={`https://www.filipizen.com/resources/${data.id}.png`}
        height={40}
        width={40}
        title={data.title}
        extraStyle='text-white'
        page='partner'
        userName={session?.user?.name}
        data={data}
        headerSelect='data'
      />
      <ContentWrapper className='h-full w-screen'>
        <ContentWrapper className='flex items-center justify-start gap-7 px-[50px] my-7'>
          <ButtonComponent
            variant='text' 
            className={`normal-case text-xl font-semibold hover:bg-transparent hover:underline underline-offset-4 text-slate-800 ${display === 'reports' && 'underline'}`}
            onClick={() => setDisplay('reports')}
            disableFocusRipple
            disableElevation
            disableRipple
            disableTouchRipple
            sx={{
              padding: '0',
            }}
          >
            Reports
          </ButtonComponent>
          <ButtonComponent 
            variant='text' 
            className={`normal-case text-xl font-semibold hover:bg-transparent hover:underline underline-offset-4 text-slate-800 ${display === 'charts' && 'underline'}`}
            disableFocusRipple
            onClick={() => setDisplay('charts')}
            disableElevation
            disableRipple
            disableTouchRipple
            sx={{
              padding: '0',
            }}
          >
            Charts
          </ButtonComponent>
        </ContentWrapper>
        <div className='w-screen'>
          {display === 'reports' && (
            <div>
              <PivotTable />
            </div>
          )}
          {display === 'charts' && (
            <div className='grid grid-cols-10 '>
              <div className='flex flex-col gap-2 col-span-2 bg-red-500'>

              </div>
              <div className='col-span-8'>
                <Chart
                  chartType="BarChart"
                  width="99.9%"
                  height="400px"
                  data={chartdata}
                  options={options}
                />
              </div>   
            </div>
          )}
        </div>   
      </ContentWrapper>
      <ContentWrapper className='w-full absolute bottom-0'>
        <Footer />
      </ContentWrapper>
    </ContentWrapper>
  )
}

export default PartnerLinkLayout;