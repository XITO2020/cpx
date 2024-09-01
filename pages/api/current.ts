import { NextApiRequest, NextApiResponse } from 'next'
import serverAuth from '@/lib/serverAuth'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    console.log('Request received at /api/current')

    const { customSession } = await serverAuth(req, res)

    if (!customSession) {
      res.status(401).json({ message: 'Not authenticated' })
      return
    }

    console.log('User found:', customSession.user)

    res.status(200).json(customSession)
  } catch (error: any) {
    console.error('Error in /api/current:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

export default handler
