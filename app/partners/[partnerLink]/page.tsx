import Custom404 from '@/app/components/layout/Custom404'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Filipizen - Error",
  description: "Generated by create next app",
}

const page = () => {
  return (
    <Custom404 />
  )
}

export default page

