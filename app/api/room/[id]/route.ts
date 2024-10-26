import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/server/mongo/config';
import { getRoomById } from '@/server/actions/roomActions';

export async function GET(
  req: Request,
  { params: { id } }: { params: { id: string } }
) {
  await connectDB();
  try {
    const room = await getRoomById(id);
    return NextResponse.json(room, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
