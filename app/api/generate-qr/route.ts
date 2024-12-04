import { NextResponse } from 'next/server';
import QRCode from 'qrcode';
import { v4 as uuidv4 } from 'uuid';

export async function GET() {
  const uuid = uuidv4();
  
  // Generate QR Code with a payload containing the UUID
  const qrImage = await QRCode.toDataURL(uuid); // This will return a Data URL of the QR image
  
  // Set the expiration time for 5 minutes
  const expirationTime = Date.now() + 5 * 60 * 1000; // 5 minutes from now
  
  // Return the UUID and the QR image along with expiration time
  return NextResponse.json({
    uuid,
    qrImage,
    expirationTime,
  });
}
