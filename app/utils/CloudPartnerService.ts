const url = process.env.FILIPIZEN_URL
const getMembersData = async () => {
  try {
    const response = await fetch(`${url}/cloud-server/json/partner/CloudPartnerService.getList`);
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
    const response = await fetch(`${url}/cloud-server/json/partner/CloudPartnerMenuService.getList?groupname=${clusterid}&name=${name}`);
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
