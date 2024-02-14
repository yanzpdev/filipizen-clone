import { connectMongoDB } from "@/lib/mongodb";
import EditUser from "@/models/edituser";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export async function POST(req: any) {
  const {firstName, lastName, email, address, mobileNum, isFirstTimeSigningIn} = await req.json();
  await connectMongoDB();
  await EditUser.findOneAndUpdate({email}, { firstName, lastName, email, address, mobileNum, isFirstTimeSigningIn });
  return NextResponse.json({ message: 'Updated succesfully!' }, { status: 201 });
}