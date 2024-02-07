const getMembersData = async () => {
    try {
      const response = await fetch('https://filipizen.com/cloud-server/json/partner/CloudPartnerService.getList');
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