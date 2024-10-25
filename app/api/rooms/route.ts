import { NextResponse } from 'next/server';
import connectDB from '@/server/mongo/config';
import { fetchAllRooms } from '@/server/actions/roomActions';

export async function GET() {
  await connectDB();
  try {
    const rooms = await fetchAllRooms();
    return NextResponse.json(rooms, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
