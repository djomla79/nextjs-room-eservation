import { NextRequest } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/auth-options';
import { Middleware } from './middlewares';
import { UserSession } from '@/lib/types/userTypes';

const customMiddleware: Middleware = async (req: NextRequest, next) => {
  const session = await getServerSession(authOptions);
  const user = session?.user as UserSession;
  req.userId = user.id;

  next();
};

export default customMiddleware;
