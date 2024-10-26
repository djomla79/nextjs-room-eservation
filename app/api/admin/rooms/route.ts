import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/server/mongo/config';
import {
  getAllAdminRooms,
  saveRoom,
  editRoom,
  deleteRoom,
} from '@/server/actions/adminActions';

export async function GET() {
  await connectDB();
  try {
    const rooms = await getAllAdminRooms();
    return NextResponse.json(rooms, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  await connectDB();
  try {
    const { id, ...data } = await request.json();
    await editRoom(id, data);
    return NextResponse.json({ status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  await connectDB();
  try {
    const room = await request.json();
    await saveRoom(room);
    return NextResponse.json({ status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  await connectDB();
  try {
    const id = await request.json();
    await deleteRoom(id);
    return NextResponse.json({
      message: 'Room is successfully deleted.',
      status: 200,
    });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
