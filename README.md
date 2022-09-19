# ECF-API-SPORT
# Bienvenue sur l'application d'administration de FitPark Fitness de Paris.

Dans le cadre de mon BAC de développeur Web Fullstack avec **Studi**, j'ai eu pour tâche finale le développement d'une application  incorporant un système d'administration des partenaires et structures de la marque FITPARK FITNESS

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
Pour installer les dépendances du front:
```
cd clients
npm i --save
```
Pour installer les dépendances du Back:
```
cd funcitons
npm i --save
```

Une fois le projet installé il faut créer un fichier .env avec vos propres informations.

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

**Lancer le Front-End :**

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

- [Firebase](https://firebase.google.com/docs).

```
Créér un compte sur Firebase.com

Créér une nouvelle application

Installer la  CLI de Firebase:

Initialiser votre projet 
```

retrouvez la procédure de déploiement complète sur [Firebase](https://firebase.google.com/).

## Ou trouver les documents

Dans cette application vous trouverai un dossier **Documentation** vous pouvez y trouver plusieurs documents utiles ( schéma de la base de donnée, charte graphique, manuel d'utilisation etc...) en format .pdf ou via les liens ci-desous.

## Lien utiles

Dans cette section je met à disposition tous ce dont je me suis appuyé pour réaliser cette application :

- [Trello](https://whimsical.com/ecf-decembre-2022-trello-NfUp8nvFJNPCBk4jGxLFJi/)
- [Wireframe Desktop](https://whimsical.com/wireframe-web-ecf-2022-WampAVigaVCERKX5Qy4xQ2)
- [Manuel d'utilisation](https://whimsical.com/documentation-ecf-2022-2QJGZVikAvSVZanN8gjUzW)
- [Charte Graphique](https://whimsical.com/charte-graphique-3XQTm5QPZWo2JMStX7xyvv)
- [Cas D'utilisation](https://whimsical.com/uml-cas-d-utilisation-2qQkj9G9NxcAWDjvmBbyNT)
- [MCD](https://whimsical.com/mcd-ecf-2022-HTz2Z4W4TLfep7VCcbpWDR)
- [Projet Github](https://github.com/PaleGreenFILE/ECF-API-SPORT)


<div style="display: flex">
   </br>
   <img align"center" width="400" height="250" src="https://user-images.githubusercontent.com/71704263/191049143-9b20cd89-cdd2-4d94-9f8c-9eeb4a2b0348.png"/>
   <img align"center" width="400" height="250" src="https://user-images.githubusercontent.com/71704263/191050661-f64afff1-712b-4ca8-a62a-efc1551ae866.png"/>
   </br>
   </br>
   <img align"center" width="400" height="250" src="https://user-images.githubusercontent.com/71704263/191055546-6faeda30-603e-4e34-b51d-af257fcd922d.png"/>
   </br>
   </br>
   <img align"center" width="400" height="250" src="https://user-images.githubusercontent.com/71704263/191055730-ed35267d-62c1-4b64-80d3-f12d3b42d475.png"/>
   </br>
</div>





# ECF Studi 2022 - Charly Makhlouf
