class CloudPartnerService {
  url = 'http://192.168.2.11:8070/osiris3/json/dw/RptDataService.';
  async getTaxableTypes() {
    try {
      const response = await fetch(this.url+'getTaxableTypes', {
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0',
        },
        cache: 'no-store',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await response.json();
      return data;
    } 
    
    catch (error) {
      console.error('Error fetching data:', error);
      return [];
    }
  }

  async getPropertyClassifications() {
    try {
      const response = await fetch(this.url+'getPropertyClassifications', {
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0',
        },
        cache: 'no-store',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await response.json();
      return data;
    } 
    
    catch (error) {
      console.error('Error fetching data:', error);
      return [];
    }
  }

  async getPropertyTypes() {
    try {
      const response = await fetch(this.url+'getPropertyTypes', {
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0',
        },
        cache: 'no-store',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await response.json();
      return data;
    } 
    
    catch (error) {
      console.error('Error fetching data:', error);
      return [];
    }
  }

  async getReportDates() {
    try {
      const response = await fetch(this.url+'getReportDates', {
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0',
        },
        cache: 'no-store',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await response.json();
      return data;
    } 
    
    catch (error) {
      console.error('Error fetching data:', error);
      return [];
    }
  }
  async getReportData() {
    try {
      const response = await fetch(this.url+'getReportData', {
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0',
        },
        cache: 'no-store',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await response.json();
      return data;
    } 
    
    catch (error) {
      console.error('Error fetching data:', error);
      return [];
    }
  }
}

const cloudPartnerService = new CloudPartnerService();

const rptData = async () => {
  const taxableTypesData = await cloudPartnerService.getTaxableTypes();
  const propertyTypesData = await cloudPartnerService.getPropertyTypes();
  const propertyClassificationsData = await cloudPartnerService.getPropertyClassifications();
  const reportDatesData = await cloudPartnerService.getReportDates();
  const reportsData = await cloudPartnerService.getReportData();

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

  return reportDataList.map((report: any) => {
    // const propertyType = propertyTypes.find((type: any) => type.objid === report.propertyTypeId);
    // const propertyClass = propertyClassifications.find((cls: any) => cls.objid === report.propertyClassId);
    // const taxableType = taxableTypes.find((type: any) => type.objid === report.taxableTypeId);
    // const reportDate = reportDates.find((date: any) => date.objid === report.reportDateId);

    return {
      'Property Type': report.propertytype.name,
      'Property Class': report.propertyclass.name,
      'Taxable Type': report.taxabletype.name,
      // 'Report Date': `${reportDate?.year}-${reportDate?.month}`,
      'Quarter': 'QTR ' + report.reportdate.qtr,
      'Month': report.reportdate.monthname,
      'Year': report.reportdate.year,
      'Assessed Value': report.totalav,
      'Market Value': report.totalmv,
    };
  });
}
