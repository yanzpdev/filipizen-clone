import { NextRequest, NextResponse } from 'next/server';
import io from "socket.io-client";  

let socket: any;
let serverUrl = 'http://localhost:5000';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const challenge = body.payload.challenge;

    socket = io(serverUrl);

    socket.on('connect', () => {
      socket.emit('join', challenge);
      socket.emit("send-message", challenge, "test message");

      socket.disconnect();
    });

    return NextResponse.json({ status: "success", challenge });
  } 
  
  catch (error: any) {
    console.error("Error handling request:", error);
    return NextResponse.json({ status: "error", message: error.message });
  }
}
