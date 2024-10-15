import NextAuth, { AuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { compare } from 'bcrypt';
import prismadb from '@/lib/prismadb';
import { User, CustomSession } from '@/lib/types';

export const authOptions: AuthOptions = {
  providers: [
    Credentials({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'text',
        },
        password: {
          label: 'Password',
          type: 'password'
        }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email and password required');
        }

        const user = await prismadb.user.findUnique({ where: {
          email: credentials.email
        }});

        if (!user || !user.hashedPassword) {
          throw new Error('Email does not exist');
        }

        const isCorrectPassword = await compare(credentials.password, user.hashedPassword);

        if (!isCorrectPassword) {
          throw new Error('Incorrect password');
        }

        return user;
      }
    })
  ],
  pages: {
    signIn: '/auth'
  },
  debug: process.env.NODE_ENV === 'development',
  adapter: PrismaAdapter(prismadb),
  session: { strategy: 'jwt' },
  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET,
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.isPremium = (user as User).isPremium;
        token.admin = (user as User).admin;
        token.email = (user as User).email;
        token.emailVerified = (user as User).emailVerified;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        const user = session.user as User; // Assertion de type pour `session.user`
        user.id = token.id as string ?? null;
        user.isPremium = token.isPremium as boolean ?? false;
        user.admin = token.admin as boolean ?? false;
        user.email = token.email as string ?? '';
        user.emailVerified = token.emailVerified as boolean ?? false;
      }
      return session;
    }
  }
};

export default NextAuth(authOptions);
