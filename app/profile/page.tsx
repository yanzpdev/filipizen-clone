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
    firstName: '',
    lastName: '',
    contactAddress: '',
    contactNum: '',
    contactEmail: ''
  };
  try {
    await connectMongoDB();
    const session = await getServerSession();

    const email: string | any = session?.user?.email;
    const user = await User.findOne({ email });
    const firstName = user.firstName;
    const lastName = user.lastName;
    const contactAddress = user.address;
    const contactNum = user.mobileNum;

    userObject.firstName = firstName;
    userObject.lastName = lastName;
    userObject.contactAddress = contactAddress;
    userObject.contactNum = contactNum;
    userObject.contactEmail = email;
  } 
  
  catch (error) {
    console.error('An error occured:', error);
  }

  return (
    <Suspense fallback={<Loading />}>
      <ProfilePage 
        fName={userObject.firstName} 
        lName={userObject.lastName} 
        contactAddress={userObject.contactAddress} 
        contactNum={userObject.contactNum} 
        contactEmail={userObject.contactEmail}
      />
    </Suspense>
  )
}

export default Profile