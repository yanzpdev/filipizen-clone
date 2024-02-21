import { connectMongoDB } from '@/lib/mongodb';
import User from '@/models/user';
import { redirect } from 'next/navigation';
import { getServerSession } from "next-auth/next"

export default async function handleRequest() {
  let url = '';
  try {
    await connectMongoDB();
    const session = await getServerSession();

    const email = session?.user?.email;
    const user = await User.findOne({ email });

    if (user && user.isFirstTimeSigningIn) {
      url='/setupprofile'
    } 
    
    else {
      url='/partners'
    }
  } 
  
  catch (error) {
    console.error('An error occured:', error);
    redirect('/error');
  }
  redirect(url);
}
