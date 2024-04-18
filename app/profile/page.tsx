import { Metadata } from "next"
import { Suspense } from "react"
import Loading from "./loading"
import { getServerSession } from "next-auth"
import ProfilePage from "../components/layout/ProfilePage"
import { connectMongoDB } from "@/lib/mongodb"
import User from "@/models/user"
import Header from "../components/layout/Header"

export const metadata: Metadata = {
    title: 'Profile',
    description: 'Etracs Landing Page',
  }
  
const Profile = async() => {
  let userObject = {
    contactName: '',
    contactAddress: '',
    contactLgu: '',
    contactNum: '',
    contactEmail: ''
  };
  try {
    await connectMongoDB();
    const session = await getServerSession();

    const email: string | any = session?.user?.email;
    const user = await User.findOne({ email });
    const contactName = user.name;
    const contactAddress = user.address;
    const contactLgu = user.lgu;
    const contactNum = user.mobileNum;

    userObject.contactName = contactName;
    userObject.contactAddress = contactAddress;
    userObject.contactLgu = contactLgu;
    userObject.contactNum = contactNum;
    userObject.contactEmail = email;

    console.log(user.createdAt);

  } 
  
  catch (error) {
    console.error('An error occured:', error);
  }

  return (
    <Suspense fallback={<Loading />}>
      <ProfilePage 
        name={userObject.contactName} 
        contactAddress={userObject.contactAddress} 
        contactLgu={userObject.contactLgu} 
        contactNum={userObject.contactNum} 
        contactEmail={userObject.contactEmail}
      />
    </Suspense>
  )
}

export default Profile