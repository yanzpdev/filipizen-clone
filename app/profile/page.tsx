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
    contactEmail: '',
    contactSubtype: '',
    contactLguID: ''
  };
  try {
    await connectMongoDB();
    const session = await getServerSession();
    const email: string | any = session?.user?.email;
    const user = await User.findOne({ email });
    const contactName = user.name;
    const contactAddress = user.address;
    const contactLgu = user.lguString;
    const contactNum = user.mobileNum;
    const contactSubtype = user.subtype;
    const contactLguID = user.lguID;

    userObject.contactName = contactName;
    userObject.contactAddress = contactAddress;
    userObject.contactLgu = contactLgu;
    userObject.contactNum = contactNum;
    userObject.contactEmail = email;
    userObject.contactSubtype = contactSubtype;
    userObject.contactLguID = contactLguID;
  } 

  
  catch (error) {
    console.error('An error occured:', error);
  }
  
  return (
    <Suspense fallback={<Loading />}>
      <ProfilePage 
        fullName={userObject.contactName} 
        contactAddress={userObject.contactAddress} 
        contactLgu={userObject.contactLgu} 
        contactNum={userObject.contactNum} 
        contactEmail={userObject.contactEmail}
        contactSubtype={userObject.contactSubtype}
        contactLguID={userObject.contactLguID}
      />
    </Suspense>
  )
}

export default Profile