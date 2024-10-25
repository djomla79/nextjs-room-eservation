import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/server/mongo/config';
import { findUserById } from '@/server/actions/userActions';

export async function GET(
  req: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  await connectDB();
  try {
    const user = await findUserById(id);
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
