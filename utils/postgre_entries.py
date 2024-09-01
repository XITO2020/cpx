import os
import random
import uuid
import psycopg2

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

# Générer des données pour les films
genres = ['Action', 'Drama', 'Comedy', 'Horror', 'Sci-Fi', 'Documentary']
languages = ['English', 'French', 'Spanish', 'German', 'Japanese']
authors = ['Author1', 'Author2', 'Author3', 'Author4', 'Author5']

movies = []

for i in range(10000):
    if i < len(videos) and i < len(thumbnails):
        movie = {
            'id': str(uuid.uuid4()),
            'title': f'Movie {i+1}',
            'videoUrl': videos[i],
            'thumbnailUrl': thumbnails[i],
            'genre': random.choice(genres),
            'language': random.choice(languages),
            'author': random.choice(authors),
            'duration': f'{random.randint(60, 180)} minutes',
            'year': random.randint(2000, 2023),
            'rating': round(random.uniform(1, 5), 1),
            'description': f'Description for Movie {i+1}',
            'favoriteLength': random.randint(0, 100),
            'views': random.randint(0, 1000),
            'isTrending': random.choice([True, False]),
            'isPremium': False,
        }
        movies.append(movie)

# Sélectionner 20 films pour les rendre premium
premium_movies = random.sample(movies, 20)
for movie in premium_movies:
    movie['isPremium'] = True

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
        CREATE TABLE IF NOT EXISTS movies (
            id UUID PRIMARY KEY,
            title TEXT,
            videoUrl TEXT,
            genre TEXT,
            language TEXT,
            author TEXT,
            thumbnailUrl TEXT,
            duration TEXT,
            year INT,
            rating FLOAT,
            description TEXT,
            favoriteLength INT,
            views INT,
            isTrending BOOLEAN,
            isPremium BOOLEAN
        )
    ''')

    # Insérer les données
    for movie in movies:
        cur.execute('''
            INSERT INTO movies (id, title, videoUrl, genre, language, author, thumbnailUrl, duration, year, rating, description, favoriteLength, views, isTrending, isPremium)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        ''', (movie['id'], movie['title'], movie['videoUrl'], movie['genre'], movie['language'], movie['author'], movie['thumbnailUrl'], movie['duration'], movie['year'], movie['rating'], movie['description'], movie['favoriteLength'], movie['views'], movie['isTrending'], movie['isPremium']))

    # Valider les modifications
    conn.commit()

    print("Data inserted successfully.")

except Exception as e:
    print("Error:", e)

finally:
    # Fermer la connexion
    if conn:
        cur.close()
        conn.close()
