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

```
git clone https://github.com/PaleGreenFILE/ECF-API-SPORT
```
Pour installer les dépendance du front:
```
cd clients
npm i --save
```
Pour installer les dépendance du Back:
```
cd funcitons
npm i --save
```

Une fois le projet installé il faut créer un fichier .env déjà  avec vos propres informations.

**Création de la base de donnée :**

Utiliser le fichier sql présent ou créer la vôtre.

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

**Lancer le Front-End  :**

```
cd clients
npm run start
```

Pour la gestion des mails j'ai utilisé personnellement MailerLite principalement pour sa rapidité à mettre en place, sinon vous pouvez utiliser votre mailler habituel, 

## [Se connecter à l'application](https://ecf-2022.web.app/)


Trois Cas de connexion sont possible dans cette application :
 - Un administrateur (admin)
 - Des Partenaires (partenaires)
 - Des Structures (structures)

|email   |mot de passe   |
|---|---|
| admin_fitpark@gmail.com  |  azertyu2 |
| sporting_club@gmail.com  |  azertyu2 |
| crossfit_ninja_avignon@gmail.com  |  azertyu2 |

# Les choix Techniques

## Connexion sécurisé mise en place
Pour cette application j'ai fais le choix de faire une connexion sécurisée en utilisant Bcrypt pour Hash le mot de passe. 
Que vous  pouvez retrouver ici ([BcrypJs](https://www.npmjs.com/package/bcryptjs)).
ou installer le directement en tapant:

```
npm i bcryptjs
```
#Dploiement de l'application

Pour cette application j'ai fais le choix d'utiliser Firebase pour héberger le back-end et le front  aussi  pour sa rapidité de mise en place.
vous pourrez retrouver la documentation ici
([Firebase](https://firebase.google.com/docs)).
```
Créér un compte sur Firebase.com

Créér une nouvelle application

Installer la  CLI de Firebase:

Initialiser votre projet 
```
retrouvez la procédure de déploiement complète sur ([Firebase](https://firebase.google.com/)).

## Ou trouver les documents

Dans cette application vous trouverai un dossier **Documentation** vous pouvez y trouver plusieurs documents utiles ( schéma de la base de donnée, charte graphique, manuel d'utilisation etc...)

# ECF Studi 2022 - Charly Makhlouf

## Lien utiles

Dans cette section je met à disposition tous ce dont je me suis appuyé pour réaliser cette application :

-[[Trello]](https://whimsical.com/ecf-decembre-2022-trello-NfUp8nvFJNPCBk4jGxLFJi)
<div ><img style="border:none" width="800" height="450" src="https://user-images.githubusercontent.com/71704263/191045731-6a0c3965-86de-4cd5-89cf-a9bcef6a25af.png"/> </div>

- [Projet Github](https://github.com/Papoel/ECF-Mediatheque)
