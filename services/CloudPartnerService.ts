const filipizenUrl = process.env.FILIPIZEN_URL;
const osirisUrl = process.env.OSIRIS_URL;

export const getMembersData = async () => {
  const response = await fetch(`${filipizenUrl}/cloud-server/json/partner/CloudPartnerService.getList`, {
    headers: {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0',
    },
    cache: 'no-store',
  });

  if (!response.ok) {
    console.error('Failed to fetch members data. Status:', response.status);
    return [];
  }

  const data = await response.json();
  return data || [];
};

export const getPartnerData = async (clusterid: string, name: string) => {
  const response = await fetch(`${filipizenUrl}/cloud-server/json/partner/CloudPartnerService.findByGroupAndName?groupname=${clusterid}&name=${name}`, {
    headers: {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0',
    },
    cache: 'no-store',
  });

  if (!response.ok) {
    console.error('Failed to fetch partner data. Status:', response.status);
    return [];
  }

  const data = await response.json();
  return data || [];
};

export const getServices = async (clusterid: string, name: string) => {
  const response = await fetch(`${filipizenUrl}/cloud-server/json/partner/CloudPartnerMenuService.getList?groupname=${clusterid}&name=${name}`, {
    headers: {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0',
    },
    cache: 'no-store',
  });

  if (!response.ok) {
    console.error('Failed to fetch service data. Status:', response.status);
    return [];
  }

  const data = await response.json();
  return data || [];
};

export const getTaxableTypes = async () => {
  const response = await fetch(`${osirisUrl}/osiris3/json/dw/RptDataService.getTaxableTypes`, {
    headers: {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0',
    },
    cache: 'no-store',
  });

  if (!response.ok) {
    console.error('Failed to fetch taxable types data. Status:', response.status);
    return [];
  }

  const data = await response.json();
  return data || [];
};

export const getPropertyClassifications = async () => {
  const response = await fetch(`${osirisUrl}/osiris3/json/dw/RptDataService.getPropertyClassifications`, {
    headers: {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0',
    },
    cache: 'no-store',
  });

  if (!response.ok) {
    console.error('Failed to fetch taxable types data. Status:', response.status);
    return [];
  }

  const data = await response.json();
  return data || [];
};

export const getPropertyTypes = async () => {
  const response = await fetch(`${osirisUrl}/osiris3/json/dw/RptDataService.getPropertyTypes`, {
    headers: {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0',
    },
    cache: 'no-store',
  });

  if (!response.ok) {
    console.error('Failed to fetch taxable types data. Status:', response.status);
    return [];
  }

  const data = await response.json();
  return data || [];
};

export const getReportDates = async () => {
  const response = await fetch(`${osirisUrl}/osiris3/json/dw/RptDataService.getReportDates`, {
    headers: {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0',
    },
    cache: 'no-store',
  });

  if (!response.ok) {
    console.error('Failed to fetch taxable types data. Status:', response.status);
    return [];
  }

  const data = await response.json();
  return data || [];
};

export const getReportData = async () => {
  const response = await fetch(`${osirisUrl}/osiris3/json/dw/RptDataService.getReportData`, {
    headers: {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0',
    },
    cache: 'no-store',
  });

  if (!response.ok) {
    console.error('Failed to fetch taxable types data. Status:', response.status);
    return [];
  }

  const data = await response.json();
  return data || [];
};