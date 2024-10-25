import { NextResponse } from 'next/server';
import connectDB from '@/server/mongo/config';
import { getAllReservations } from '@/server/actions/reservationActions';

export async function GET() {
  await connectDB();
  try {
    const reservations = await getAllReservations('/admin/reservations');
    return NextResponse.json(reservations, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
