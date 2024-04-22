import { connectMongoDB } from "@/lib/mongodb";
import EditUser from "@/models/edituser";
import { NextResponse } from "next/server";

export async function POST(req: any) {
  const {name, email, address, lguString, lguID, mobileNum, subtype, isFirstTimeSigningIn} = await req.json();
  await connectMongoDB();
  await EditUser.findOneAndUpdate({email}, { name, email, address, lguString, lguID, subtype, mobileNum, isFirstTimeSigningIn });
  // console.log("Name: ", fullName);
  // console.log("LGU: ", lguString);
  // console.log("Subtype: ", subtype);
  // console.log("Number: ", mobileNum);
  return NextResponse.json({ message: 'Updated succesfully!' }, { status: 201 });
}