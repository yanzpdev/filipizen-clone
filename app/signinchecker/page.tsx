import { connectMongoDB } from '@/lib/mongodb';
import User from '@/models/user';
import { redirect } from 'next/navigation';
import { getServerSession } from "next-auth/next"

export default async function handleRequest() {
  let url = '';
  let requestStatus = false;

  try {
    await connectMongoDB();
    requestStatus = true;
  }

  catch(e) {
    console.log('An error ocurred: ', e)
    url = '/error';
  }
  
  const session = await getServerSession();
  const email = session?.user?.email;
  const user = await User.findOne({ email });
  if (requestStatus) {
    if (user && user.isFirstTimeSigningIn) {
      url = '/setupprofile';
    } 
    
    else {
      url = '/partners';
    }
  }
  redirect(url);
}
