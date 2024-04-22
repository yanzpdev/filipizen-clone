import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function POST(req: any) {
  const {userId, accProvider, name, firstName, lastName, email, address, subtype, lguString, lguID, mobileNum, isFirstTimeSigningIn} = await req.json();
  await connectMongoDB();
  await User.create({ userId, accProvider, name, firstName, lastName, email, address, subtype, lguString, lguID, mobileNum, isFirstTimeSigningIn });
  return NextResponse.json({ message: 'User Registered' }, { status: 201 });
}