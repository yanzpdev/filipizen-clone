'use client';
import ButtonComponent from '@/app/components/ui/ButtonComponent';
import ContentWrapper from '@/app/components/ui/ContentWrapper';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { flattenedData } from './data';
import Link from 'next/link';
import React from 'react';

const Reports = ({prevLink, pivotdata}: any) => {
  const [display, setDisplay] = useState('reports');
  const [chartType, setChartType] = useState('BarChart');
  const [dataType, setDataType] = useState('Amount');
  const [dataTypeInfo, setDataTypeInfo] = useState([]);
  const [page, setPage] = useState<number>(1);
  const router = useRouter();
  const [selectedDimensions, setSelectedDimensions] = useState<string[]>(['Report Dates']);
  const currentYear = new Date().getFullYear();
  const yearsToShow = Array.from({length: 5}, (_, i) => (currentYear - i).toString());

  const filteredData = pivotdata.filter((item: any) => {
    return item.Year !== undefined && yearsToShow.includes(item.Year.toString());
  });

  const totalMarketValueByYear: { [key: string]: any } = filteredData.reduce((acc: any, item: any) => {
    if (item.Year !== undefined && item['Market Value'] !== undefined && item['Assessed Value'] !== undefined) {
        const year = item.Year.toString();
        if (!acc[year]) {
            acc[year] = { MarketValue: 0, AssessedValue: 0 };
        }
        acc[year].MarketValue += item['Market Value'];
        acc[year].AssessedValue += item['Assessed Value'];
    }
    return acc;
  }, {} as { [key: string]: any });

  const result = Object.entries(totalMarketValueByYear).map(([year, totalValues]) => {
    return [year, totalValues.MarketValue, totalValues.AssessedValue];
  });
  const transformedResult = result.map((item) => [item[0], item[1], item[2]]);

  const chartdata = [
    ["Year", "Market Value", "Assessed Value"],
    ...transformedResult.reverse()
  ];
  
  const options = {
    title: "Tax Collected from the Last 5 Years",
    chartArea: { width: "50%" },
    hAxis: {
      title: "Total Population",
      minValue: 0,
    },
    vAxis: {
      title: "Year",
    },
  };

  // const handleCheckboxChange = (dimension: string) => {
  //   setSelectedDimensions(prevSelected => {
  //     if (prevSelected.includes(dimension)) {
  //       return prevSelected.filter(item => item !== dimension);
  //     } 
      
  //     else {
  //       return [...prevSelected, dimension];
  //     }
  //   });
  // };


  return (
    <ContentWrapper className='h-full w-full py-5'>
      <>
        <ContentWrapper className='flex items-center justify-start gap-3 pb-5 '>
          <ButtonComponent
            variant='text' 
            className={`normal-case text-base font-semibold hover:bg-transparent hover:underline underline-offset-4 text-slate-800 ${display === 'reports' && 'underline'}`}
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
            className={`normal-case text-base font-semibold hover:bg-transparent hover:underline underline-offset-4 text-slate-800 ${display === 'charts' && 'underline'}`}
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
        <div className='w-full'>
          
        </div>
      </>
      <ContentWrapper className='h-[15px]' />
      <hr className="my-[8px] border-slate-500"/>
      <ContentWrapper className='flex gap-5'>
        <ButtonComponent
          variant='contained'
          className={`text-[14px] font-[500] bg-[#f5f5f5] text-[#731cef] hover:bg-[#eeeaf4] rounded-md tracking-widest`}
          style={{
            boxShadow: 'none',
            border: '1px solid #d7d7d7',
          }} 
          onClick={() => router.push(prevLink)}
        >
          Back
        </ButtonComponent>
        {/* <Link
          href={'/'}
          className={`text-[14px] px-5 py-1 font-[500] bg-[#f5f5f5] text-[#731cef] hover:bg-[#eeeaf4] rounded-md tracking-widest`}
          style={{
            boxShadow: 'none',
            border: '1px solid #d7d7d7',
          }} 
        >
          Back
        </Link> */}
      </ContentWrapper>
      {/* {page === 1 ?
        <>
          <ContentWrapper className='w-full h-full mt-7'>
            <ContentWrapper className='h-[500px] grid grid-cols-10 gap-2'>
              <div className='col-span-2 border border-gray-500 rounded-md p-3'>
                <h1 className='mb-2 font-semibold'>Select Dimensions</h1>
                  {dimensions.map((dimension, index) => (
                    <span key={index} className='flex items-center gap-1'>
                      <input 
                        type='checkbox'
                        name={dimension}
                        id={dimension}
                        checked={dimension === 'Report Dates' || selectedDimensions.includes(dimension)}
                        disabled={dimension === 'Report Dates'}
                        onChange={() => handleCheckboxChange(dimension)}
                      />
                      <label htmlFor={dimension}>{dimension}</label>
                    </span>
                  ))} 
                <h1 className='mt-5 mb-2 font-semibold'>Select Measures</h1>
                <>
                  <span className='flex items-center gap-1'>                  
                    <input type='checkbox' name='taxable-types' id='taxable-types'/>
                    <label htmlFor="taxable-types">Assessed Value</label>
                  </span>
                  <span className='flex items-center gap-1'>                  
                    <input type='checkbox' name='property-types' id='property-types'/>
                    <label htmlFor="property-types">Market Value</label>
                  </span>
                </>
              </div>
              <div className='border p-3 col-span-8 border-gray-500 rounded-md'>
                {selectedDimensions.map((dimension, index) => (
                  <div key={index}>{dimension}</div>
                ))}
              </div>
            </ContentWrapper>
          </ContentWrapper>
        </>
      :
        <>
          <ContentWrapper className='flex items-center justify-start gap-7 my-7'>
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
          <div className='w-full'>
            {display === 'reports' && (
              <div>
                <PivotTable data={pivotdata} />
              </div>
            )}
            {display === 'charts' && (
              <div className='grid grid-cols-10 border w-full bg-white'>
                <div className='flex flex-col gap-2 col-span-1 p-5 bg-white border-r'>
                  <ButtonComponent 
                    variant='text' 
                    className={`w-10 normal-case text-base mx-auto font-semibold ${chartType === 'BarChart' ? 'bg-black text-white' : 'bg-slate-200 text-slate-800 hover:bg-black hover:text-white'}  underline-offset-4 `}
                    disableFocusRipple
                    onClick={() => setChartType('BarChart')}
                    disableElevation
                    disableRipple
                    disableTouchRipple
                    sx={{
                      padding: '0',
                    }}
                  >
                    Bar
                  </ButtonComponent>
                  <ButtonComponent 
                    variant='text' 
                    className={`w-10 normal-case text-base mx-auto font-semibold ${chartType === 'PieChart' ? 'bg-black text-white' : 'bg-slate-200 text-slate-800 hover:bg-black hover:text-white'}  underline-offset-4 `}
                    disableFocusRipple
                    onClick={() => setChartType('PieChart')}
                    disableElevation
                    disableRipple
                    disableTouchRipple
                    sx={{
                      padding: '0',
                    }}
                  >
                    Pie
                  </ButtonComponent>
                  <ButtonComponent 
                    variant='text' 
                    className={`w-10 normal-case text-base mx-auto font-semibold ${chartType === 'LineChart' ? 'bg-black text-white' : 'bg-slate-200 text-slate-800 hover:bg-black hover:text-white'}  underline-offset-4 `}
                    disableFocusRipple
                    onClick={() => setChartType('LineChart')}
                    disableElevation
                    disableRipple
                    disableTouchRipple
                    sx={{
                      padding: '0',
                    }}
                  >
                    Line
                  </ButtonComponent>
                </div>
                <div className='col-span-9 flex flex-col gap-y-5'>
                  <ChartComponent chartType={chartType} chartData={chartdata} chartOptions={options} />
                </div>   
              </div>
            )}
          </div>
        </>
      }   
    </ContentWrapper>
    <ContentWrapper className='h-[15px]' />
    <hr className="my-[8px] border-slate-500"/>
    <ContentWrapper className='flex gap-5'>
      <ButtonComponent
        variant='contained'
        className={`text-[14px] font-[500] bg-[#f5f5f5] text-[#731cef] hover:bg-[#eeeaf4] rounded-md tracking-widest`}
        style={{
          boxShadow: 'none',
          border: '1px solid #d7d7d7',
        }} 
        onClick={page === 2 ? () => setPage(1) : () => router.push(prevLink)}
      >
        Back
      </ButtonComponent>
      {page !== 2 &&
        <ButtonComponent
          variant='contained'
          className={`text-[14px] font-[500] bg-[#f5f5f5] text-[#731cef] hover:bg-[#eeeaf4] rounded-md tracking-widest`}
          style={{
            boxShadow: 'none',
            border: '1px solid #d7d7d7',
          }} 
          onClick={() => setPage(2)}
        >
          Next
        </ButtonComponent>
      } */}
      
    </ContentWrapper>
  )
}

export default Reports