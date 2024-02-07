import { connectMongoDB } from "@/lib/mongodb";
import customUser from "@/models/customUser";
import { NextResponse } from "next/server";

export async function POST(req: any) {
    const {name, email, address, mobilenum } = await req.json();
    await connectMongoDB();
    await customUser.create({ name, email, address, mobilenum });
    return NextResponse.json({ message: 'User Registered' }, { status: 201 });
}