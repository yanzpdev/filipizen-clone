// 'use client';
// import React from 'react';
// import './styles/pivot.css';
// import { 
//   PivotViewComponent, 
//   FieldList, 
//   CalculatedField, 
//   Inject, 
//   ValueSortSettings 
// } from '@syncfusion/ej2-react-pivotview';
// import { useState, useEffect } from 'react';
// import { registerLicense } from '@syncfusion/ej2-base';
// import { FilterType } from '@syncfusion/ej2-pivotview';
// import ContentWrapper from '@/app/components/ui/ContentWrapper';
// import Link from 'next/link';
// import Image from 'next/image';

// registerLicense('ORg4AjUWIQA/Gnt2UFhhQlJBfV5AQmBIYVp/TGpJfl96cVxMZVVBJAtUQF1hTX5UdExjWn5fc3dWRGFU');
// const PIVOT_TABLE_CONFIG_KEY = 'pivotTableConfig'; 

// const PivotTableComponent = ({data}: any) => {
//   const [height, setHeight] = useState<number>();
//   const [pivotRows, setPivotRows] = useState<any>([{name: 'Property Class', caption: 'Property Class'}, {name: 'Property Type', caption: 'Property Type'}]);
//   const [pivotCols, setPivotCols] = useState<any>([{name: 'Year', caption: 'Year'}]);
//   const [pivotValues, setPivotValues] = useState<any>([{name: 'Total Count', caption: 'Total Count'}, {name: 'Market Value', caption: 'Market Value'}]);
//   const [pivotFilters, setPivotFilters] = useState<any>([]);
//   const currentYear = new Date().getFullYear();

//   const yearsToShow = Array.from({length: 3}, (_, i) => (currentYear - i).toString());
//   const gridSettings = {
//     allowSelection: true,
//   }

//   const pivotdata = data;

//   const dataSourceSettings = {
//     dataSource: pivotdata,
//     expandAll: false,
//     rows: pivotRows,
//     columns: pivotCols,
//     enableSorting: false,
//     values: pivotValues,
//     filters: pivotFilters,
//     gridSettings: gridSettings,
//     filterSettings: [
//       { name: 'Year', type: 'Include' as FilterType, items: yearsToShow },
//     ],
//     // sortSettings: [
//     //   {name: 'Year', mode: 'Ascending'},
//     // ],
    
//     formatSettings: [
//       {name: 'Assessed Value', format: '#,##0.00'}, 
//       {name: 'Market Value', format: '#,##0.00'}
//     ],
//     // calculatedFieldSettings: [{
//     //   name: 'Total Count',
//     //   formula: 'Assessed Value + Market Value'
//     // }]
//   };

//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       var height = window.innerHeight - 50;
//       setHeight(height);
//     }

//     const storedConfig = localStorage.getItem(PIVOT_TABLE_CONFIG_KEY);
//     if (storedConfig) {
//       const { rows, columns, values, filters } = JSON.parse(storedConfig);
//       setPivotRows(rows);
//       setPivotCols(columns);
//       setPivotValues(values);
//       setPivotFilters(filters);
//     }
//   }, []);

//   const handleFieldListChange = (args: any) => {
//     const newConfig = {
//       rows: args.dataSourceSettings.rows || [],
//       columns: args.dataSourceSettings.columns || [],
//       values: args.dataSourceSettings.values || [],
//       filters: args.dataSourceSettings.filters || []
//     };
    
//     setPivotRows(newConfig.rows);
//     setPivotCols(newConfig.columns);
//     setPivotValues(newConfig.values);
//     setPivotFilters(newConfig.filters);
    
//     localStorage.setItem(PIVOT_TABLE_CONFIG_KEY, JSON.stringify(newConfig));
//   };

//   return (
//     <>
//       {/* <ContentWrapper className='flex items-end gap-2 text-xs mb-5'>
//         Powered by 
//         <Link href='https://www.syncfusion.com'>
//           <Image 
//             src={`/assets/syncfusion.svg`}
//             alt={`Syncfusion`}
//             width={100}
//             height={100}
//             className='h-7 w-auto'
//           />
//         </Link>
//       </ContentWrapper> */}
//       <PivotViewComponent
//         height={`${height}px`}
//         width="100%"
//         dataSourceSettings={dataSourceSettings}
//         showFieldList={true}
//         allowCalculatedField={true}
//         fieldListRefreshed={handleFieldListChange}
//       >
//         <Inject services={[FieldList, CalculatedField]} />
//       </PivotViewComponent>
//     </>
//   )
// }

// export default PivotTableComponent