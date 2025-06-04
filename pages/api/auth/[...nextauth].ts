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
    async redirect({ url, baseUrl }) {
      console.log("Redirection:", { url, baseUrl });
      return baseUrl + '/profiles';
    },
    async jwt({ token, user }) {
      console.log("JWT callback:", { token, user })
      if (user) {
        token.id = user.id;
        const dbUser = user as any; // Cast to access potential custom fields like admin/isPremium
        if (dbUser.admin === true) {
          token.role = 'ADMIN';
        } else if (dbUser.isPremium === true) {
          token.role = 'PREMIUM';
        } else {
          token.role = 'USER';
        }
        token.email = dbUser.email;
        token.emailVerified = dbUser.emailVerified; // Assuming this is already Date or null from dbUser

        // Populate additional fields
        token.name = dbUser.name;
        token.image = dbUser.image;
        token.createdAt = dbUser.createdAt?.toISOString(); // Convert Date to ISO string
        token.isPremium = dbUser.isPremium;
        token.isAdmin = dbUser.admin; // Assuming dbUser.admin is the correct field name
        token.tabzBalance = dbUser.tabzBalance;
      }
      return token;
    },
    async session({ session, token }) {
      console.log("session callback: ", {session, token})
      if (token && session?.user) {
        const sessionUser = session.user as any; // Cast to add custom fields

        // Existing assignments
        sessionUser.id = token.id as string;
        sessionUser.role = token.role as string;
        sessionUser.email = token.email as string;
        sessionUser.emailVerified = token.emailVerified; // Assuming this is Date or null from token

        // Add new fields from token to session.user
        sessionUser.name = token.name as string | null;
        sessionUser.image = token.image as string | null;
        sessionUser.createdAt = token.createdAt as string | null; // Expect string from token
        sessionUser.isPremium = token.isPremium as boolean | null;
        sessionUser.isAdmin = token.isAdmin as boolean | null; // Corresponds to token.isAdmin
        sessionUser.tabzBalance = token.tabzBalance as number | null;
      }
      return session;
    }
  }
};

export default NextAuth(authOptions);
