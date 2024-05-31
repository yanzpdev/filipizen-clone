const getMembersData = async () => {
  try {
                               // http://192.168.2.20:90/cloud-server/json/partner/CloudPartnerService.getList for local server
    const response = await fetch('http://107.21.113.74:90/cloud-server/json/partner/CloudPartnerService.getList');
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
};

export { getMembersData };

export const getServices = async (clusterid: string, name: string) => {
  try {
    const response = await fetch('http://107.21.113.74:90/cloud-server/json/partner/CloudPartnerMenuService.getList?groupname=' + clusterid + '&name=' + name);
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
};
