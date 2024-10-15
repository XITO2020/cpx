import psycopg2
import random

# Connexion à la base de données
conn = psycopg2.connect(
    dbname='conspix',
    user='postgres',
    password='19756',
    host='localhost',
    port='5432'
)
cur = conn.cursor()

# Récupérer les IDs des films et des genres
cur.execute('SELECT "_id" FROM "Movie"')
movie_ids = [row[0] for row in cur.fetchall()]

cur.execute('SELECT "_id" FROM "Genre"')
genre_ids = [row[0] for row in cur.fetchall()]

# Insérer les relations MovieGenre
for movie_id in movie_ids:
    # Choisir un nombre aléatoire de genres pour chaque film (par exemple, entre 1 et 5)
    num_genres = random.randint(1, 5)
    selected_genres = random.sample(genre_ids, num_genres)

    for genre_id in selected_genres:
        cur.execute('''
            INSERT INTO "MovieGenre" ("movieId", "genreId")
            VALUES (%s, %s)
        ''', (movie_id, genre_id))

# Valider les modifications
conn.commit()

# Vérifier les données insérées
cur.execute('SELECT COUNT(*) FROM "MovieGenre"')
movie_genre_count = cur.fetchone()[0]
print(f"Number of movie-genre relations inserted: {movie_genre_count}")

print("Data inserted successfully.")

# Fermer la connexion
cur.close()
conn.close()
