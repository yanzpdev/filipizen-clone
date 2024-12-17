import { 
  getPropertyClassifications, 
  getPropertyTypes, 
  getReportData, 
  getReportDates, 
  getTaxableTypes 
} from "@/services/CloudPartnerService";

const rptData = async () => {
  const taxableTypesData = await getTaxableTypes();
  const propertyTypesData = await getPropertyTypes();
  const propertyClassificationsData = await getPropertyClassifications();
  const reportDatesData = await getReportDates();
  const reportsData = await getReportData();

  const data = {
    'Taxable Types': taxableTypesData,
    'Property Types': propertyTypesData,
    'Property Classifications': propertyClassificationsData,
    'Report Dates': reportDatesData,
    'Report Data List': reportsData
  }
  return data;
}

export const flattenedData = async () => {
  const data = await rptData();
  const taxableTypes = data['Taxable Types'];
  const propertyTypes = data['Property Types'];
  const propertyClassifications = data['Property Classifications'];
  const reportDates = data['Report Dates'];
  const reportDataList = data['Report Data List'];
  const sortedReportDataList = reportDataList.sort((a: any, b: any) => a.reportdate.year - b.reportdate.year);

  return sortedReportDataList.map((report: any) => {
    // const propertyType = propertyTypes.find((type: any) => type.objid === report.propertyTypeId);
    // const propertyClass = propertyClassifications.find((cls: any) => cls.objid === report.propertyClassId);
    // const taxableType = taxableTypes.find((type: any) => type.objid === report.taxableTypeId);
    // const reportDate = reportDates.find((date: any) => date.objid === report.reportDateId);
    const data = {      
      'Property Type': report.propertytype.name,
      'Property Class': report.propertyclass.name,
      'Taxable Type': report.taxabletype.name,
      'Quarter': 'QTR ' + report.reportdate.qtr,
      'Month': report.reportdate.monthname,
      'Year': report.reportdate.year,
      'Assessed Value': report.totalav,
      'Market Value': report.totalmv,
      'Total Count': report.totalcount
     }
     return data;
  });
}
