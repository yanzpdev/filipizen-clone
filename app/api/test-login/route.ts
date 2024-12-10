import { NextRequest, NextResponse } from 'next/server';
import io from "socket.io-client";  

let socket: any;
let url = process.env.URL;
let serverUrl = process.env.SERVER_URL;

export async function POST(req: NextRequest) {
  const res = await fetch (`${url}/api/generate-uuid`);
  const uuid = await res.json();

  try {
    const body = await req.json();
    const challenge = body.payload.challenge;

    console.log(challenge);

    socket = io(serverUrl);

    socket.on('connect', () => {
      console.log(`join to server ${challenge}`)
      // socket.join(challenge);
      const data = { challenge: challenge, message: uuid }
      socket.emit("notification", data);
      console.log("Data: ", data);
      // socket.disconnect();
    });

    return NextResponse.json({ status: "success", challenge });
  } 
  
  catch (error: any) {
    console.error("Error handling request:", error);
    return NextResponse.json({ status: "error", message: error.message });
  }
}
