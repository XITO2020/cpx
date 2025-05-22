import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { CustomSession } from '@/lib/types';
import prismadb from '@/lib/prismadb';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

export async function serverAuth(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<{ currentUser: CustomSession['user'] }> {
  try {
    const session = await getServerSession(req, res, authOptions);

    if (!session?.user?.email) {
      throw new Error('Unauthorized');
    }

    const currentUser = await prismadb.user.findUnique({
      where: { email: session.user.email },
      select: {
        id: true,
        email: true,
        name: true,
        isPremium: true,
        admin: true,
        emailVerified: true,
        image: true,
      }
    });

    if (!currentUser) {
      throw new Error('User not found');
    }

    return { currentUser };
  } catch (error) {
    console.error('ServerAuth error:', error);
    throw new Error('Authentication failed');
  }
}