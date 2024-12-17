"use client";
import React from 'react'
import { useSearchParams } from 'next/navigation'
import Custom404V2 from '@/components/ui/Custom404V2';

const InactivePage = () => {
  const searchParams = useSearchParams()

  const name = searchParams.get("name"); 

  return <Custom404V2 name={name || ''} />
}

export default InactivePage