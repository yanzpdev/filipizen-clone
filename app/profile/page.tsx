import { Metadata } from "next"
import { Suspense } from "react"
import Loading from "./loading"
import { getServerSession } from "next-auth"
import ProfilePage from "../components/layout/ProfilePage"

export const metadata: Metadata = {
    title: 'Profile',
    description: 'Etracs Landing Page',
  }
  
const Profile = async() => {
  let data = null;
  try {
    let res = await getServerSession();
    data = res
  }

  catch (error: any) {
    console.log('Error: ', error)
  }

  return (
    <Suspense fallback={<Loading />}>
      <ProfilePage />
    </Suspense>
  )
}

export default Profile