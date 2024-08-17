import os

path = "videos/"
valid_extensions = ['.mp4', '.m4v', '.mkv', '3gp', 'mpeg', '.avi', '.mov', 'webm']

# os.walk parcourt chaque dossier et sous-dossier
for dirpath, dirnames, filenames in os.walk(path):
    for file in filenames:
        filepath = os.path.join(dirpath, file)
        
        # Obtenez l'extension du fichier
        extension = os.path.splitext(filepath)[1]
        
        # Si l'extension du fichier n'est pas dans valid_extensions, supprimez-le
        if extension not in valid_extensions:
            try:
                os.remove(filepath)
                print(f"Fichier {filepath} supprimé")
            except Exception as e:
                print(f"Erreur lors de la suppression du fichier {filepath}. Raison : {e}")

print("Nettoyage terminé!")
