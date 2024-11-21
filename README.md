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

2. Si ce n'est pas déjà fait, installer PostgreSQL et exécuter psql
3. Créer un nouvel utilisateur avec un mot de passe :
   ```psql
   CREATE USER nomDuLutilisateur WITH PASSWORD 'motDePasse';
   ```
4. Créer la base de données du projet :
   ```psql
   CREATE USER nomDuLutilisateur WITH PASSWORD 'motDePasse';
   ```
   puis se déconnecter avec la combinaison de touches `Ctrl` + `D`
5. Tester la connexion à la base données avec :
    ```psql
   psql -U nomDeLutilisateur -d nomDeLaBase
   ```
6. Exécuter le script create_db.sql :
   ```psql
   psql -U numUtilisateur -d nomBaseDeDonnees -f create_db.sql
   ```
7. Lancer le serveur :
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