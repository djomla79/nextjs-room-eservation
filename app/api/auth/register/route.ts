'use server';

import connectDB from '@/server/mongo/config';
import {
  getUserProfileByEmail,
  registerUser,
} from '@/server/actions/userActions';
import { type NextRequest, NextResponse } from 'next/server';

export const POST = async (request: NextRequest) => {
  await connectDB();

  const user = await request.json();
  const existingUser = await getUserProfileByEmail(user.email);

  if (existingUser) {
    return NextResponse.json('User is already registered!', { status: 400 });
  }

  try {
    await registerUser(user);
    return NextResponse.json('User is successfully registered', {
      status: 200,
    });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
};
