import { NextRequest, NextResponse } from 'next/server';
import io from "socket.io-client";  

let socket: any;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const challenge = body.payload.challenge;

    console.log(challenge);

    socket = io('http://localhost:5000');

    socket.on('connect', () => {
      console.log(`join to server ${challenge}`)
      // socket.emit('join', challenge);

      const data = { challenge: challenge, message: "testxxxxxx" }
      console.log("Data: ", data);
      socket.emit("notification", data);
      socket.disconnect();
    });

    return NextResponse.json({ status: "success", challenge });
  } 
  
  catch (error: any) {
    console.error("Error handling request:", error);
    return NextResponse.json({ status: "error", message: error.message });
  }
}
