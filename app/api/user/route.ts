import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function POST(req: any) {
    const {userId, accProvider, name, email} = await req.json();
    await connectMongoDB();
    await User.create({ userId, accProvider, name, email });
    return NextResponse.json({ message: 'User Registered' }, { status: 201 });
}