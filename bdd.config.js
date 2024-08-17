const MongoClient = require('mongodb').MongoClient;

async function updateAllMoviesToFalse() {
  const uri = 'mongodb://127.0.0.1:27017/conspix'; // Remplacez par l'URI de votre base de données MongoDB
  const client = new MongoClient(uri);

  try {
    await client.connect();
    
    const db = client.db();
    const moviesCollection = db.collection('movie'); 
    
    // Mise à jour de tous les documents dans la collection pour définir isPremium à false
    const moviesResult = await moviesCollection.updateMany({}, { $set: { isPremium: false , isTrending:true}});
    
    const usersCollection = db.collection('user');
    const userResult = await usersCollection.updateMany({}, {$set: {githubId:"", favoriteIds: [] ,sessions:[""], account :[""], comments:[] , premiumDuration: 0 , admin: false, linkedArticles: []}});

    if (moviesResult.modifiedCount !== undefined && userResult.modifiedCount !== undefined) {
        const result = moviesResult.modifiedCount + userResult.modifiedCount;
        console.log(`Nombre de documents mis à jour : ${result}`);
      } else {
        console.log("Erreur lors de la mise à jour des documents.");
      }
  } finally {
    client.close();
  }
}

updateAllMoviesToFalse().catch(console.error);
