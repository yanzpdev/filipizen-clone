import { NextRequest, NextResponse } from 'next/server';
import io from "socket.io-client";  

let socket: any;
let serverUrl = process.env.NEXT_PUBLIC_SOCKETIO_HOST;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const challenge = body.challenge;
    const url = `${serverUrl}/send`;
    const payload = {
      "channelid": challenge,
       "message": "authenticated",
    };

   const response = fetch(url, {
      method: 'POST', // Specifies the HTTP method
      headers: {
        'Content-Type': 'application/json', // Sets content type to JSON
      },
      body: JSON.stringify(payload), // Convert JavaScript object to JSON string
    })

    // const response = await fetch(url, {
    // method: "POST",
    // body: JSON.stringify(payload),
    // });

    // socket = io(serverUrl);

    // socket.on('connect', () => {
    //   socket.emit('join', challenge);
    //   socket.emit("send-message", challenge, "test message");

    //   socket.disconnect();
    // });

    return NextResponse.json({ status: "success", payload });
  } 
  
  catch (error: any) {
    console.error("Error handling request:", error);
    return NextResponse.json({ status: "error", message: error.message });
  }
}
