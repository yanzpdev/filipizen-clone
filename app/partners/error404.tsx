import React from 'react'
import Custom404 from '../components/layout/Custom404'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Filipizen - Error",
  description: "Generated by create next app",
}

const error404 = () => {
  return <Custom404 />
}

export default error404