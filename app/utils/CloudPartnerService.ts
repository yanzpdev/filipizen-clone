const url = process.env.FILIPIZEN_URL;

const getMembersData = async () => {
  const response = await fetch(`${url}/cloud-server/json/partner/CloudPartnerService.getList`, {
    headers: {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0',
    },
    cache: 'no-store',
  });

  if (!response.ok) {
    console.error('Failed to fetch data. Status:', response.status);
    return [];
  }

  const data = await response.json();
  return data || [];
};

export { getMembersData };

export const getServices = async (clusterid: string, name: string) => {
  const response = await fetch(`${url}/cloud-server/json/partner/CloudPartnerMenuService.getList?groupname=${clusterid}&name=${name}`, {
    headers: {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0',
    },
    cache: 'no-store',
  });

  if (!response.ok) {
    console.error('Failed to fetch data. Status:', response.status);
    return [];
  }

  const data = await response.json();
  return data || [];
};
