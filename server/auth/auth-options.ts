import { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import connectDB from '../mongo/config';
import { getUserWithPasswordByEmail } from '../actions/userActions';
import { comparePassword } from '@/lib/utils/serverHelperFunctions';

const authOptions: AuthOptions = {
  pages: {
    signIn: '/auth/login',
  },
  session: {
    strategy: 'jwt',
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'text',
          placeholder: 'Email',
        },
        password: {
          label: 'Password',
          type: 'password',
        },
      },
      async authorize(credentials) {
        connectDB();

        const emailCredentials = credentials?.email;
        const passwordCredentials = credentials?.password;

        if (!emailCredentials)
          throw new Error('Please, provide correct email.');

        if (!passwordCredentials)
          throw new Error('Please, provide correct password.');

        const user = await getUserWithPasswordByEmail(emailCredentials!);

        if (!user) throw new Error('User with provided email not found!');

        const isPasswordMatched = await comparePassword(
          passwordCredentials,
          user.password
        );

        if (!isPasswordMatched) throw new Error('Password does not match!');

        const {
          _doc: { password, ...userWithoutPassword },
        } = user;

        return userWithoutPassword;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token = {
          id: user.id,
          role: user.role,
          email: user.email,
          username: user.username,
        };
      }
      if (trigger === 'update' && session?.id) {
        token.id = session.id;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        id: token.id,
        role: token.role,
        email: token.email,
        username: token.username,
      };
      return session;
    },
  },
};

export { authOptions };
