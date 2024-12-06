import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const uuid = url.searchParams.get('uuid');  

  console.log(`uuid: ${uuid}`);

  return NextResponse.json({ uuid: uuid });
}
