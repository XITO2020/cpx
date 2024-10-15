import os
import random
import uuid
import psycopg2
import string

# Chemins vers les dossiers de vidéos
videos_dir = 'public/videos'

# Listes pour stocker les chemins des fichiers et les genres
genres = set()

# Parcourir récursivement les dossiers de vidéos et ajouter les noms des dossiers à la liste des genres
for root, dirs, files in os.walk(videos_dir):
    for dir in dirs:
        genres.add(dir)

print("Genres:", genres)

# Générer des données pour les utilisateurs
def generate_random_string(length):
    letters = string.ascii_letters
    return ''.join(random.choice(letters) for i in range(length))

def generate_random_email():
    domains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com']
    return f"{generate_random_string(8)}@{random.choice(domains)}"

def generate_user():
    return {
        "_id": str(uuid.uuid4()),
        "name": generate_random_string(10),
        "email": generate_random_email(),
        "emailVerified": random.choice([True, False]),
        "hashedPassword": generate_random_string(16),
        "githubId": generate_random_string(10),
        "createdAt": "now()",
        "updatedAt": "now()",
        "favoriteIds": [],
        "isPremium": random.choice([True, False]),
        "premiumDuration": random.randint(30, 365),
        "provider": "none",
        "admin": random.choice([True, False])
    }

def generate_genre(name):
    return {
        "id": str(uuid.uuid4()),
        "name": name,
        "qty": 0
    }

def generate_movie_genre(movie_id, genre_id):
    return {
        "movieId": movie_id,
        "genreId": genre_id
    }

def main():
    users = [generate_user() for _ in range(20)]
    genres_list = [generate_genre(name) for name in genres]

    # Connexion à la base de données
    try:
        conn = psycopg2.connect(
            dbname='conspix',
            user='postgres',
            password='19756',
            host='localhost',
            port='5432'
        )
        cur = conn.cursor()

        # Créer les tables si elles n'existent pas
        cur.execute('''
            CREATE TABLE IF NOT EXISTS "User" (
                "_id" UUID PRIMARY KEY,
                "name" TEXT,
                "email" TEXT UNIQUE,
                "emailVerified" BOOLEAN,
                "hashedPassword" TEXT,
                "githubId" TEXT,
                "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                "favoriteIds" TEXT[],
                "isPremium" BOOLEAN,
                "premiumDuration" INT,
                "provider" TEXT DEFAULT 'none',
                "admin" BOOLEAN
            )
        ''')

        cur.execute('''
            CREATE TABLE IF NOT EXISTS "Genre" (
                "id" UUID PRIMARY KEY,
                "name" TEXT,
                "qty" INT
            )
        ''')

        cur.execute('''
            CREATE TABLE IF NOT EXISTS "MovieGenre" (
                "movieId" UUID,
                "genreId" UUID,
                PRIMARY KEY ("movieId", "genreId"),
                FOREIGN KEY ("movieId") REFERENCES "Movie" ("_id") ON DELETE CASCADE,
                FOREIGN KEY ("genreId") REFERENCES "Genre" ("id") ON DELETE CASCADE
            )
        ''')

        # Insérer les utilisateurs
        for user in users:
            cur.execute('''
                INSERT INTO "User" ("_id", "name", "email", "emailVerified", "hashedPassword", "githubId", "createdAt", "updatedAt", "favoriteIds", "isPremium", "premiumDuration", "provider", "admin")
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
            ''', (user['_id'], user['name'], user['email'], user['emailVerified'], user['hashedPassword'], user['githubId'], user['createdAt'], user['updatedAt'], user['favoriteIds'], user['isPremium'], user['premiumDuration'], user['provider'], user['admin']))

        # Insérer les genres
        for genre in genres_list:
            cur.execute('''
                INSERT INTO "Genre" ("id", "name", "qty")
                VALUES (%s, %s, %s)
            ''', (genre['id'], genre['name'], genre['qty']))

        # Récupérer les IDs des films et des genres pour créer les relations
        cur.execute('SELECT "_id" FROM "Movie"')
        movie_ids = [row[0] for row in cur.fetchall()]

        cur.execute('SELECT "id" FROM "Genre"')
        genre_ids = [row[0] for row in cur.fetchall()]

        # Insérer les relations MovieGenre
        for movie_id in movie_ids:
            for genre_id in genre_ids:
                cur.execute('''
                    INSERT INTO "MovieGenre" ("movieId", "genreId")
                    VALUES (%s, %s)
                ''', (movie_id, genre_id))

        # Valider les modifications
        conn.commit()

        # Vérifier les données insérées
        cur.execute('SELECT COUNT(*) FROM "User"')
        user_count = cur.fetchone()[0]
        print(f"Number of users inserted: {user_count}")

        cur.execute('SELECT COUNT(*) FROM "Genre"')
        genre_count = cur.fetchone()[0]
        print(f"Number of genres inserted: {genre_count}")

        cur.execute('SELECT COUNT(*) FROM "MovieGenre"')
        movie_genre_count = cur.fetchone()[0]
        print(f"Number of movie-genre relations inserted: {movie_genre_count}")

        print("Data inserted successfully.")

    except Exception as e:
        print("Error:", e)

    finally:
        # Fermer la connexion
        if conn:
            cur.close()
            conn.close()

if __name__ == "__main__":
    main()
