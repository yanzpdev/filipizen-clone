import { connectMongoDB } from "@/lib/mongodb";
import EditUser from "@/models/edituser";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export async function POST(req: any) {
  const {fullName, email, address, lgu, mobileNum, isFirstTimeSigningIn} = await req.json();
  await connectMongoDB();
  await EditUser.findOneAndUpdate({email}, { fullName, email, address, lgu, mobileNum, isFirstTimeSigningIn });
  return NextResponse.json({ message: 'Updated succesfully!' }, { status: 201 });
}