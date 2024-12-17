import NotAvailable from '@/components/ui/NotAvailable';
import Panel from '@/components/io/Panel';
import { getPartnerData } from '@/services/CloudPartnerService';
import { redirect } from 'next/navigation';
import React from 'react'

const PartnerLinkRptDataPage = async({ params }: { params: { partnerLink: string } }) => {
  const matchString = params.partnerLink.match(/^([^_]+)_(.+)$/);
  let groupName = '';
  let name = '';

  if (matchString) {
    [groupName, name] = [matchString[1], matchString[2]];
  }

  const partner = await getPartnerData(groupName, name);

  if (partner.status === 404) {
    redirect(`/partners/inactive?groupname=${groupName}&name=${name}`);
  }

  return (
    <Panel className='min-h-[93.2vh] '>
      <NotAvailable />
    </Panel>
  )
}

export default PartnerLinkRptDataPage;