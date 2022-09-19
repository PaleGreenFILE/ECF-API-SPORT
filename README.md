# ECF-API-SPORT
# Bienvenue sur la application d'administration de FitPark Fitness de Paris

Dans le cadre de mon BAC de développeur Web Fullstack avec **Studi**, j'ai eu pour tâche finale le développement d'une application  incorporant un système d'administration des partenaires et structures de la marque

## Spécification Techniques

### Technologie

   - Express => 5.0
   - NodeJs V16.717.0
  - Framework : React => 18.2.0
  - Base de donnée : PostGreSql (PostGreSql 15.0)

###  Front

- TAILWINDCSS (V3.1.8)
- React-Icons (4.4.0)

### Back

- Express 5.0
- NodeJs V16.717.0
- PostGreSql (PostGreSql 15.0)

# Installation Locale

```bash
git clone https://github.com/PaleGreenFILE/ECF-API-SPORT
```

```bash
npm i --save
```

Une fois le projet installé il faut créer un fichier .env déjà  avec vos propres informations.

**Création de la base de donnée :**

Utiliser le fichier sql présent.

```
CREATE DATABASE nom_base_de_données ; Créer une base de données
USE nom_base_de_données ; Indique la BDD à utiliser et dans laquelle on exécute les requêtes.
CREATE TABLE nom_table ; Créer une table dans la BDD utilisée
```

**Lancer le serveur Back-back end**

```
cd functions
npm run dev
```

** Lancer le Front-End  :**

```
cd clients
npm run start
```

Pour la gestion des mails en local vous pouvez utiliser votre mailler habituel, j'utilise personnellement `mailhog` principalement pour sa rapidité à mettre en place.
Configurer votre DSN comme ceci :
```
MAILER_DSN=smtp://localhost:1025
```
Puis exécuter Mailhog en tapant dans le navigateur:

`localhost:8025`

> [INFO]
> Si vous n'utilisez pas le CLI de Symfony toutes les commandes commençant par **<i>symfony console</i>** peuvent être remplacées dans votre terminal par **<i>php bin/console</i>**.

## [Se connecter à l'application](http://papoel-mediatheque.herokuapp.com/)


Trois Cas de connexion sont possible dans cette application :
 - Un administrateur (admin)
 - Un Libraire (employé)
 - Un Habitant (habitant)

|email   |mot de passe   |
|---|---|
| admin@email.fr  |  password |
| libraire@email.fr  |  password |
| user{x}@email.fr  |  password |

# Les choix Techniques

## Connexion sécurisé mise en place
Pour cette application j'ai fais le choix de faire une connexion sécurisée en double facteur authentification par Email.
Je me suis aidé du bundle symfony [scheb/2fa-bundle](https://symfony.com/bundles/SchebTwoFactorBundle/5.x/installation.html).
Cette fonction nécessite l'utilisation d'un mailler.

## Ou trouver les documents

Dans cette application vous trouverai un dossier **Documentation** vous pouvez y trouver plusieurs documents utiles ( schéma de la base de donnée, charte graphique, manuel d'utilisation etc...)

# ECF Studi 2021 - Pascal Briffard

## Lien utiles

Dans cette section je met à disposition tous ce dont je me suis appuyé pour réaliser cette application :

- [Trello](https://trello.com/b/fFBVPI9c/ecf-mediatheque)
- [Projet Github](https://github.com/Papoel/ECF-Mediatheque)
