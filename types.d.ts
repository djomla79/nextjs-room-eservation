import { Session, User } from 'next-auth';
import { JWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      role: string;
      email: string;
      username: string;
    };
  }
  interface User {
    id: string;
    role: string;
    email: string;
    username: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    role: string;
    email: string;
    username: string;
  }
}

declare module 'next/server' {
  interface NextRequest {
    userId: string;
  }
}
