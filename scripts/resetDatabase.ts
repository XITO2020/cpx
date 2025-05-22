import prismadb from '@/lib/prismadb';

async function resetDatabase() {
  try {
    console.log('Starting database reset...');

    // Update all movies
    const moviesResult = await prismadb.movie.updateMany({
      data: {
        isPremium: false,
        isTrending: true
      }
    });

    // Update all users
    const usersResult = await prismadb.user.updateMany({
      data: {
        githubId: null,
        favoriteIds: [],
        isPremium: false,
        admin: false,
        premiumDuration: 0
      }
    });

    // Clear all sessions
    await prismadb.session.deleteMany({});

    // Clear all accounts
    await prismadb.account.deleteMany({});

    // Clear all comments
    await prismadb.comment.deleteMany({});

    console.log(`Reset complete:
      - Movies updated: ${moviesResult.count}
      - Users updated: ${usersResult.count}
      - Sessions, accounts, and comments cleared
    `);
  } catch (error) {
    console.error('Database reset failed:', error);
    throw error;
  }
}

// Only run if called directly (not imported)
if (require.main === module) {
  resetDatabase()
    .catch(console.error)
    .finally(async () => {
      await prismadb.$disconnect();
    });
}