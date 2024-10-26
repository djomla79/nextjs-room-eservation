'use server';

import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/server/mongo/config';
import {
  saveReservation,
  getAllReservations,
} from '@/server/actions/reservationActions';
import withMiddlewares from '@/server/middleware/middlewares';
import customMiddleware from '@/server/middleware/customMiddleware';

const reservationPost = async (request: NextRequest) => {
  await connectDB();
  try {
    const userId = request.userId;
    const body = await request.json();
    const reservation = {
      ...body,
      user: userId,
    };
    await saveReservation(reservation);
    return NextResponse.json({ status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
};

export const POST = withMiddlewares(customMiddleware, reservationPost);

export async function GET() {
  await connectDB();
  try {
    const reservations = await getAllReservations('/reservations');
    return NextResponse.json(reservations, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
