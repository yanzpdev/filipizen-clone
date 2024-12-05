const url = process.env.FILIPIZEN_URL
const getMembersData = async () => {

  // console.log(`${url}/cloud-server/json/partner/CloudPartnerService.getList`);
  try {
    const response = await fetch(`${url}/cloud-server/json/partner/CloudPartnerService.getList`, {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
      cache: 'no-store'
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
};

export { getMembersData };

export const getServices = async (clusterid: string, name: string) => {
  try {
    const response = await fetch(`${url}/cloud-server/json/partner/CloudPartnerMenuService.getList?groupname=${clusterid}&name=${name}`, {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
      cache: 'no-store'
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
};
