```typescript
import { NextApiRequest, NextApiResponse } from 'next';
import prismadb from '@/lib/prismadb';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).end();
  }

  try {
    // Get total count of movies
    const count = await prismadb.movie.count();
    
    // Generate random skip value
    const skip = Math.floor(Math.random() * count);

    // Get random movie
    const movie = await prismadb.movie.findFirst({
      skip,
      include: {
        movieGenres: {
          include: {
            genre: true
          }
        }
      }
    });

    if (!movie) {
      return res.status(404).json({ error: 'No movies found' });
    }

    return res.status(200).json(movie);
  } catch (error) {
    console.error('Random movie error:', error);
    return res.status(500).json({ error: 'Failed to fetch random movie' });
  }
}
```