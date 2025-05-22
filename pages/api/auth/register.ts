import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';
import prismadb from '@/lib/prismadb';
import { AuthResponse } from '@/lib/types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<AuthResponse>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success:false, error: 'Method not allowed' });
  }

  try {
    const { email, name, password } = req.body;

    if (!email || !name || !password) {
      return res.status(400).json({ success:false, error: 'Missing required fields' });
    }

    const existingUser = await prismadb.user.findUnique({
      where: { email },
      select: { id: true }
    });

    if (existingUser) {
      return res.status(422).json({ success: false, error:'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    
    const user = await prismadb.user.create({
      data: {
        email,
        name,
        hashedPassword,
        image: '',
        emailVerified: new Date(),
        isPremium: false,
        admin: false,
      },
      select: {
        id: true,
        email: true,
        name: true,
        isPremium: true,
        admin: true,
        emailVerified: true,
      }
    });

    return res.status(201).json({ success: true, user });
  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({ success:false, error:'Internal server error' });
  }
}