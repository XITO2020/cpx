import json
import csv

# Lire le fichier JSON mis à jour
with open('Movie_updated.json', 'r') as file:
    movies = json.load(file)

# Écrire les données dans un fichier CSV
with open('movies.csv', 'w', newline='') as file:
    writer = csv.writer(file)
    # Écrire l'en-tête
    writer.writerow([
        'id', 'title', 'videoUrl', 'genre', 'language', 'author', 'thumbnailUrl',
        'duration', 'year', 'rating', 'description', 'favoriteLength', 'views',
        'isTrending', 'isPremium'
    ])
    # Écrire les données
    for movie in movies:
        writer.writerow([
            movie.get('id', ''), movie.get('title', ''), movie.get('videoUrl', ''),
            movie.get('genre', ''), movie.get('language', ''), movie.get('author', ''),
            movie.get('thumbnailUrl', ''), movie.get('duration', ''), movie.get('year', ''),
            movie.get('rating', ''), movie.get('description', ''), movie.get('favoriteLength', ''),
            movie.get('views', ''), movie.get('isTrending', ''), movie.get('isPremium', '')
        ])

print("Data transformed to CSV successfully.")
