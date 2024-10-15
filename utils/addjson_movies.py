import json
import uuid

# Lire le fichier JSON
with open('Movie.json', 'r') as file:
    movies = json.load(file)

# Définir les valeurs par défaut pour les champs manquants
default_values = {
    'id': '',
    'title': '',
    'videoUrl': '',
    'genre': '',
    'language': '',
    'author': '',
    'thumbnailUrl': '',
    'duration': '',
    'year': 0,
    'rating': 0.0,
    'description': '',
    'favoriteLength': 0,
    'views': 0,
    'isTrending': False,
    'isPremium': False,
    'verificationLevel':0,
}

# Ajouter les champs manquants avec les valeurs par défaut et retirer le champ premiumDuration
for movie in movies:
    for key, value in default_values.items():
        if key not in movie:
            movie[key] = value
        if key == 'id':
            movie['id'] = str(uuid.uuid4())
    if 'premiumDuration' in movie:
        del movie['premiumDuration']

# Enregistrer les données mises à jour dans un nouveau fichier JSON
with open('Movie_updated.json', 'w') as file:
    json.dump(movies, file, default=str, indent=4)

print("Data updated and saved to Movie_updated.json successfully.")
