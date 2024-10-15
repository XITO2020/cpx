import os
import csv
import uuid

# Chemin vers le dossier contenant les vidéos
videos_dir = 'public/videos'

# Liste pour stocker les données des genres
genres = []

# Parcourir tous les dossiers dans le dossier des vidéos
for genre_name in os.listdir(videos_dir):
    genre_path = os.path.join(videos_dir, genre_name)
    if os.path.isdir(genre_path):
        # Compter le nombre de fichiers vidéo dans le dossier
        video_count = 0
        for filename in os.listdir(genre_path):
            if filename.endswith(('.mp4', '.avi', '.flv', '.mov', '.mpeg')):
                video_count += 1
        # Ajouter les données du genre à la liste
        genres.append({
            'id': str(uuid.uuid4()),
            'name': genre_name,
            'movie_count': video_count
        })

# Écrire les données dans un fichier CSV
with open('utils/genres.csv', 'w', newline='') as file:
    writer = csv.DictWriter(file, fieldnames=['id', 'name', 'movie_count'])
    writer.writeheader()
    writer.writerows(genres)

print("Data transformed to CSV successfully.")
