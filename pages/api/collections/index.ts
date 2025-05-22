import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import prismadb from '@/lib/prismadb';
import { authOptions } from '../auth/[...nextauth]';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const session = await getServerSession(req, res, authOptions);
      if (!session?.user?.email) {
        return res.status(401).json({ error: 'Not authenticated' });
      }

      const { name, description, category } = req.body;

      const collection = await prismadb.collection.create({
        data: {
          name,
          description,
          category,
          userId: session.user.id
        }
      });

      return res.status(201).json(collection);
    } catch (error) {
      console.error('Collection creation error:', error);
      return res.status(500).json({ error: 'Failed to create collection' });
    }
  }

  if (req.method === 'GET') {
    try {
      const session = await getServerSession(req, res, authOptions);
      if (!session?.user?.email) {
        return res.status(401).json({ error: 'Not authenticated' });
      }

      const collections = await prismadb.collection.findMany({
        where: { userId: session.user.id },
        include: { videos: true }
      });

      return res.status(200).json(collections);
    } catch (error) {
      console.error('Collections fetch error:', error);
      return res.status(500).json({ error: 'Failed to fetch collections' });
    }
  }

  return res.status(405).end();
}