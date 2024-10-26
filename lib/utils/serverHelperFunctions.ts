'use server';

import bcrypt from 'bcrypt';
import { cookies } from 'next/headers';

export const comparePassword = async (
  credentialsPassword: string,
  userPassword: string
) => {
  return await bcrypt.compare(credentialsPassword, userPassword);
};

export const getCookieHeaders = () => {
  const nextCookies = cookies();
  const cookie = nextCookies.get('next-auth.session-token');

  return {
    headers: {
      Cookie: `${cookie?.name}=${cookie?.value}`,
    },
  };
};
