import os
import random
import uuid
import psycopg2
import string

# Chemins vers les dossiers de thumbnails et de vidéos
thumbnails_dir = 'public/thumbnails'
videos_dir = 'public/videos'

# Listes pour stocker les chemins des fichiers
thumbnails = []
videos = []

# Parcourir récursivement les dossiers de thumbnails et ajouter les chemins des fichiers à la liste
for root, dirs, files in os.walk(thumbnails_dir):
    for file in files:
        thumbnails.append(os.path.join(root, file))

# Parcourir récursivement les dossiers de vidéos et ajouter les chemins des fichiers à la liste
for root, dirs, files in os.walk(videos_dir):
    for file in files:
        videos.append(os.path.join(root, file))

print("Thumbnails:", thumbnails)
print("Videos:", videos)

# Vérifier si les dossiers contiennent des fichiers
if not thumbnails:
    raise ValueError("No thumbnails found in the specified directory.")
if not videos:
    raise ValueError("No videos found in the specified directory.")

# Générer des données pour les films
languages = ['English', 'French']
authors = ['Orland Opal', 'Colonel 24Cara', 'Memegneto', 'JojoMundo', 'Naimé Tabasco', 'Monsieur Variable', 'Guenon de Métal', 'Paranostra', 'AvcNews', 'tabascocity']

def generate_random_string(length):
    letters = string.ascii_letters
    return ''.join(random.choice(letters) for i in range(length))

def generate_random_float(min_value, max_value):
    return round(random.uniform(min_value, max_value), 2)

def generate_random_int(min_value, max_value):
    return random.randint(min_value, max_value)

def generate_random_boolean():
    return random.choice([True, False])

def generate_movie(index):
    return {
        "_id": str(uuid.uuid4()),
        "title": f'Movie {index + 1}',
        "description": f'Description for Movie {index + 1}',
        "thumbnailUrl": thumbnails[index % len(thumbnails)],
        "videoUrl": videos[index % len(videos)],
        "language": random.choice(languages),
        "author": random.choice(authors),
        "duration": f'{generate_random_int(60, 180)} minutes',
        "verificationLevel": 7,
        "year": generate_random_int(2000, 2023),
        "rating": generate_random_float(1.0, 5.0),
        "favoriteLength": generate_random_int(0, 100),
        "views": generate_random_int(0, 1000),
        "outfileArticle": "https://www.thefp.com/",
        "isTrending": generate_random_boolean(),
        "isPremium": False,
        "premiumDuration": generate_random_int(30, 365)
    }

def main():
    movies = []

    for i in range(3000):
        movie = generate_movie(i)
        movies.append(movie)

    # Sélectionner 20 films pour les rendre trendy
    trendy_movies = random.sample(movies, 20)
    for movie in trendy_movies:
        movie['isTrending'] = True

    print("Movies:", movies)

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

        # Créer la table si elle n'existe pas
        cur.execute('''
            CREATE TABLE IF NOT EXISTS "Movie" (
                "_id" UUID PRIMARY KEY,
                "title" TEXT,
                "description" TEXT,
                "thumbnailUrl" TEXT,
                "videoUrl" TEXT,
                "language" TEXT,
                "author" TEXT,
                "duration" TEXT,
                "verificationLevel" INT,
                "year" INT,
                "rating" FLOAT,
                "favoriteLength" INT,
                "views" INT,
                "outfileArticle" TEXT,
                "isTrending" BOOLEAN,
                "isPremium" BOOLEAN,
                "premiumDuration" INT
            )
        ''')

        # Insérer les données
        for movie in movies:
            cur.execute('''
                INSERT INTO "Movie" ("_id", "title", "description", "thumbnailUrl", "videoUrl", "language", "author", "duration", "verificationLevel", "year", "rating", "favoriteLength", "views", "outfileArticle", "isTrending", "isPremium", "premiumDuration")
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
            ''', (movie['_id'], movie['title'], movie['description'], movie['thumbnailUrl'], movie['videoUrl'], movie['language'], movie['author'], movie['duration'], movie['verificationLevel'], movie['year'], movie['rating'], movie['favoriteLength'], movie['views'], movie['outfileArticle'], movie['isTrending'], movie['isPremium'], movie['premiumDuration']))

        # Valider les modifications
        conn.commit()

        # Vérifier les données insérées
        cur.execute('SELECT COUNT(*) FROM "Movie"')
        count = cur.fetchone()[0]
        print(f"Number of movies inserted: {count}")

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
