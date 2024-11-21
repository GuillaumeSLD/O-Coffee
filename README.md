# Projet O'Coffee

O'Coffee est un projet de site web fictif réalisé dans un cadre étudiant.

## La stack

- NodeJS
- ExpressJS
- EJS 
- Bootstrap
- PostgreSQL

### Installation du projet

1. Installer les dépendances :
   ```npm
   npm install
   ```
2. Copier et renommer le fichier .env.example puis renseigner la variable PG_URL avec les informations relatives à votre base de données.
3. Si ce n'est pas déjà fait, installer PostgreSQL et exécuter psql
4. Créer un nouvel utilisateur avec un mot de passe :
   ```psql
   CREATE USER nomDuLutilisateur WITH PASSWORD 'motDePasse';
   ```
5. Créer la base de données du projet :
   ```psql
   CREATE USER nomDuLutilisateur WITH PASSWORD 'motDePasse';
   ```
   puis se déconnecter avec la combinaison de touches `Ctrl` + `D`
6. Tester la connexion à la base données avec :
    ```psql
   psql -U nomDeLutilisateur -d nomDeLaBase
   ```
7. Exécuter le script create_db.sql :
   ```psql
   psql -U numUtilisateur -d nomBaseDeDonnees -f create_db.sql
   ```
8. Lancer le serveur :
   ```npm
   npm run dev
   ```

Note : des scripts sont disponibles pour construire le CSS du projet.

1. Pour exécuter le build :
   ```npm
    npm run build-css
    ```
2. Pour lancer le build à chaque modification du fichier src/custom.scss :
   ```npm
    npm run build-css
    ```