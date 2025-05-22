import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import prismadb from '@/lib/prismadb';
import { authOptions } from '../../../../auth/[...nextauth]';
import { QUIZ_CONFIG } from '@/lib/constants';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  try {
    const session = await getServerSession(req, res, authOptions);
    if (!session?.user?.email || !session.user.isPremium) {
      return res.status(403).json({ error: 'Premium subscription required' });
    }

    const { stationId } = req.query;
    const { answers } = req.body;

    const quiz = await prismadb.quiz.findUnique({
      where: { stationId: stationId as string },
      include: { questions: true }
    });

    if (!quiz) {
      return res.status(404).json({ error: 'Quiz not found' });
    }

    // Check answers
    const correctAnswers = answers.filter((answer: number, index: number) => 
      answer === quiz.questions[index].correctAnswer
    ).length;

    if (correctAnswers >= QUIZ_CONFIG.MIN_CORRECT_FOR_REWARD) {
      // Generate NFT reward
      const nft = await prismadb.nft.create({
        data: {
          userId: session.user.id,
          tokenId: `STATION-${stationId}-${Date.now()}`,
          metadata: {
            name: `Station ${stationId} Completion NFT`,
            description: 'Awarded for completing station quiz',
            image: `/nft/station-${stationId}.png`
          }
        }
      });

      // Mark quiz as completed
      await prismadb.quiz.update({
        where: { id: quiz.id },
        data: {
          completed: true,
          nftRewarded: true
        }
      });

      return res.status(200).json({
        success: true,
        correctAnswers,
        reward: nft
      });
    }

    return res.status(200).json({
      success: false,
      correctAnswers,
      message: 'Not enough correct answers for reward'
    });
  } catch (error) {
    console.error('Quiz submission error:', error);
    return res.status(500).json({ error: 'Failed to submit quiz' });
  }
}