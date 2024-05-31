// class CloudPartnerService {
//     url = 'http://192.168.2.11:8070/osiris3/json/dw/RptDataService.';
//     async getTaxableTypes() {
//       try {
//         const response = await fetch(this.url+'getTaxableTypes', {
//           headers: {
//             'Cache-Control': 'no-cache, no-store, must-revalidate',
//             'Pragma': 'no-cache',
//             'Expires': '0',
//           },
//           cache: 'no-store',
//         });
  
//         if (!response.ok) {
//           throw new Error('Failed to fetch data');
//         }
  
//         const data = await response.json();
//         return data;
//       } 
      
//       catch (error) {
//         console.error('Error fetching data:', error);
//         return [];
//       }
//     }
  
//     async getPropertyClassifications() {
//       try {
//         const response = await fetch(this.url+'getPropertyClassifications', {
//           headers: {
//             'Cache-Control': 'no-cache, no-store, must-revalidate',
//             'Pragma': 'no-cache',
//             'Expires': '0',
//           },
//           cache: 'no-store',
//         });
  
//         if (!response.ok) {
//           throw new Error('Failed to fetch data');
//         }
  
//         const data = await response.json();
//         return data;
//       } 
      
//       catch (error) {
//         console.error('Error fetching data:', error);
//         return [];
//       }
//     }
  
//     async getPropertyTypes() {
//       try {
//         const response = await fetch(this.url+'getPropertyTypes', {
//           headers: {
//             'Cache-Control': 'no-cache, no-store, must-revalidate',
//             'Pragma': 'no-cache',
//             'Expires': '0',
//           },
//           cache: 'no-store',
//         });
  
//         if (!response.ok) {
//           throw new Error('Failed to fetch data');
//         }
  
//         const data = await response.json();
//         return data;
//       } 
      
//       catch (error) {
//         console.error('Error fetching data:', error);
//         return [];
//       }
//     }
  
//     async getReportDates() {
//       try {
//         const response = await fetch(this.url+'getReportDates', {
//           headers: {
//             'Cache-Control': 'no-cache, no-store, must-revalidate',
//             'Pragma': 'no-cache',
//             'Expires': '0',
//           },
//           cache: 'no-store',
//         });
  
//         if (!response.ok) {
//           throw new Error('Failed to fetch data');
//         }
  
//         const data = await response.json();
//         return data;
//       } 
      
//       catch (error) {
//         console.error('Error fetching data:', error);
//         return [];
//       }
//     }
  
//   }
  
//   const cloudPartnerService = new CloudPartnerService();
//   export const taxableTypesData = cloudPartnerService.getTaxableTypes();
//   export const propertyTypesData = cloudPartnerService.getPropertyTypes();
//   export const propertyClassificationsData = cloudPartnerService.getPropertyClassifications();
//   export const reportDatesData = cloudPartnerService.getReportDates();
  
//   export const rptData = 
//   { 
//     'Taxable Types': [taxableTypesData],
//     'Property Types': [propertyTypesData],
//     'Property Classifications': [propertyClassificationsData],
//     'Report Dates': [reportDatesData],
//     'Report Data List': 
//     [
//       { propertyTypeId: 2, propertyClassId: 1, taxableTypeId: 1, reportDateId: 2024011, assessedValue: 1234.12, marketValue: 2345.67 }, 
//       { propertyTypeId: 2, propertyClassId: 1, taxableTypeId: 0, reportDateId: 2023021, assessedValue: 1500.00, marketValue: 2000.00 }, 
//       { propertyTypeId: 2, propertyClassId: 2, taxableTypeId: 1, reportDateId: 2023031, assessedValue: 1600.00, marketValue: 2100.00 }, 
//       { propertyTypeId: 2, propertyClassId: 2, taxableTypeId: 0, reportDateId: 2024011, assessedValue: 1700.00, marketValue: 2200.00 } 
//     ]
//   }
  
  
//   const flattenData = (data: any) => {
//     const taxableTypes = data['Taxable Types'];
//     const propertyTypes = data['Property Types'];
//     const propertyClassifications = data['Property Classifications'];
//     const reportDates = data['Report Dates'];
//     const reportDataList = data['Report Data List'];
  
//     return reportDataList.map((report: any) => {
//       const propertyType = propertyTypes.find((type: any) => type.objid === report.propertyTypeId);
//       const propertyClass = propertyClassifications.find((cls: any) => cls.objid === report.propertyClassId);
//       const taxableType = taxableTypes.find((type: any) => type.objid === report.taxableTypeId);
//       const reportDate = reportDates.find((date: any) => date.objid === report.reportDateId);
  
//       return {
//         'Property Type': propertyType?.name,
//         'Property Class': propertyClass?.name,
//         'Taxable Type': taxableType?.name,
//         // 'Report Date': `${reportDate?.year}-${reportDate?.month}`,
//         Quarter: reportDate?.qtr,
//         Month: reportDate?.month,
//         Year: reportDate?.year,
//         'Assessed Value': report.assessedValue,
//         'Market Value': report.marketValue,
//       };
//     });
//   };
  
//   export const flattenedData = flattenData(rptData); //rptData[0] if data is an array