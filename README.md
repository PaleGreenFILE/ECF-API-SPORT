# ECF-API-SPORT
# Bienvenue sur la Maediatheque de Chapelles-Cureaux

Dans le cadre de mon BTS de développeur Web Fullstack avec **Studi**, j'ai eu pour tâche finale le développement d'une médiathèque incorporant un système de click and collect.

## Spécification Techniques

### Technologie

   - PHP >= 8
   - Composer >= 2
  - Framework : Symfony
  - Base de donnée : Mysql (MariaDB 10.4)

###  Front

- HTML5 (Twig)
- CSS3
- Bootstrap
- Javascript

### Back

- Minimum PHP 8.0
- Symfony (5.3.9)
- mySql

# Installation Locale

```bash
git clone https://github.com/Papoel/ECF-Mediatheque
```

```bash
composer install
```

Une fois le projet installé il faut créer un fichier .env.local ou modifier le .env déjà présent avec vos propres informations.

**Création de la base de donnée :**

```bash
symfony console doctrine:database:create
```

**Jouer la migration**

```bash
symfony console doctrine:migrations:migrate
```

**Exécuter les DataFixtures :**

```bash
symfony console doctrine:fixture:load -n
```

Pour la gestion des mails en local vous pouvez utiliser votre mailler habituel, j'utilise personnellement `mailhog` principalement pour sa rapidité à mettre en place.
Configurer votre DSN comme ceci :
```env
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
