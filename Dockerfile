# Utiliser l'image Node.js officielle comme base
FROM node:20-slim
# Installer wget et curl
RUN apt-get update && apt-get install -y \
  wget \
  curl \
  && rm -rf /var/lib/apt/lists/*
# Créer et définir le répertoire de travail
WORKDIR /app
# Copier les fichiers package.json et package-lock.json
COPY package*.json ./
# Installer les dépendances
RUN npm install
# Copier le reste des fichiers de l'application
COPY . .
# Exposer le port 3000
EXPOSE 3000
# Commande pour démarrer l'application
CMD ["npm", "start"] 