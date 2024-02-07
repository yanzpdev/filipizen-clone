import { NextRequest, NextResponse } from "next/server"
import { signupFormSchema } from "@/lib/validations/signupform";
import { MongoClient } from 'mongodb';
import { redirect } from "next/navigation";
import customUser from "@/models/customUser";
import { connectMongoDB } from "@/lib/mongodb";

// const saltRounds = 10;
// const mongoURI: string = process.env.MONGODB_URI || '';
// const dbName = 'google_auth_test';
// const collectionName = 'users';

export async function POST(request: NextRequest) {
  try {
    // Parse data in server-side for security
    const { email, name, address, mobilenum } = signupFormSchema.parse(await request.json());  

    // const client = new MongoClient(mongoURI);

    // await client.connect();  

    // // Search for a user with the provided email
    // const db = client.db(dbName);

    await connectMongoDB();
    const user = await customUser.findOne({ email });  

    if (!user) {
      const res = await fetch(`${process.env.NEXTAUTH_URL}/api/custom_auth_user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          address,
          mobilenum
        }),
      });

      if (res.ok) {
        return user;
      }
      console.log("Succesfully Registered!");
    //   await client.close();
      return new NextResponse("Succesfully Registered!");
      // redirect('/home');
    } 
    
    else {
      console.log("There is already an existing user with this email.");
    //   await client.close();
      return new NextResponse("There is already an existing user with this email.", { status: 404 });
    }
  } 
  
  catch (err: any) {
    console.error(err.message);
    return new NextResponse("An error occurred.", { status: 500 });
  }
}
