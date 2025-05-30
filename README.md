# Flash-Card_RomainSchertenleib

### Partie 1

créée l'application flash card depuis de debut. l'application flash-card et une app qui permet d'apprendre interactivement des questions avec leur reponse.

### Partie 2

Finir des fonctionnaliter de l'app flash-card

puis faire la dockerisation de l'application et pour finir la mettre en production.

## Logiciel requis

l'application utilisée:

`node v22.13.1`

`npm 10.9.2`

et Docker pour avoir : 
- MYSQL
- phpMYAdmin
- Node.js

## Lancer l'application

Cloner le repo

```
git clone https://github.com/romainschert/FlashCards.git
cd ./FlashCards/app-Flash-Card-adonisjs
```

Renommer .env.example en .env

Ajouter les variables d'environements:

```
TZ=UTC
PORT=3333
HOST=localhost
LOG_LEVEL=info
APP_KEY=
NODE_ENV=development
SESSION_DRIVER=cookie
DB_HOST=127.0.0.1
DB_PORT=6034
DB_USER=root
DB_PASSWORD=root
DB_DATABASE=app_adonis

```
il est très important que les variables d'environements soit juste afin que le projet puisse demarer 

``

installer les dépendances:

```
npm install
```

pour finir executer les deux dernière commande pour generer une clé d'application

```
node ace generate:key
npm run dev
```

## dermarrer les containers docker 

Dans la racine du projet, la ou se trouve le fichier docker compose,
ouvrir un terminal et executer cette commande 

```
docker compose up -d
```

une fois cette commande fait il y aura container : 

1) MYSQL
2) PHPmyadmin
3) l'application dockerisée 

## application en mode developement 

aller a la racine du projet et lancer la commande : 

```
npm run dev

```

et l'application sera disponible sur http://localhost:3333/

Schema : 
![alt text](image-2.png)


## Dockerisation 
 description des étapes nécessaires pour dockeriser une application AdonisJS avec une base de données MySQL, les migrations, les seeds, et un accès via le navigateur.

### Prérequis
Docker et Docker Compose installés
Un projet AdonisJS existant (node ace fonctionne)
Une base MySQL utilisée par le projet
Fichier .env configuré
### Étape 1 : Dockerfile
Dockerfile :

```
FROM node:20.11.1-alpine3.19

# Création du répertoire de travail
WORKDIR /app

# Copie des fichiers de configuration
COPY package.json ./

# Copie du code source
COPY . .

RUN rm -rf ./node_modules
RUN rm -rf ./package-lock.json

# Installation des dépendances avec npm directement
RUN npm install

# Copie du script d'entrée avant la construction
COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

# Vérifier que le script existe bien et est exécutable
RUN ls -la /usr/local/bin/docker-entrypoint.sh

# Exposition du port
EXPOSE 3333

# Exécuter le script directement avec le chemin complet
ENTRYPOINT ["/usr/local/bin/docker-entrypoint.sh"]

```
### Etape 2 : script d'entrée

```
#!/bin/sh
set -e

echo "Attente du démarrage de MySQL..."
sleep 10

# Exécuter les migrations
echo "Exécution des migrations..."
node ace migration:run --force

# Exécuter les seeds
echo "Exécution des seeds..."
node ace db:seed

# Build de l'application
echo "Build de l'application..."
npm run build

echo "Copie des ressources..."

# Créer les dossiers de destination (avec -p pour créer les parents)
mkdir -p build/resources/css
mkdir -p build/resources/js

# Copier les fichiers CSS (syntaxe shell/bash)
echo "Copie des fichiers CSS..."

[ -f "./resources/css/app.css" ] && cp "./resources/css/app.css" "./build/resources/css/app.css"
[ -f "./resources/css/decks_created.css" ] && cp "./resources/css/decks_created.css" "./build/resources/css/decks_created.css"
[ -f "./resources/css/flashcard-detail.css" ] && cp "./resources/css/flashcard-detail.css" "./build/resources/css/flashcard-detail.css"
[ -f "./resources/css/flashcards_create.css" ] && cp "./resources/css/flashcards_create.css" "./build/resources/css/flashcards_create.css"
[ -f "./resources/css/flashcards.css" ] && cp "./resources/css/flashcards.css" "./build/resources/css/flashcards.css"
[ -f "./resources/css/home.css" ] && cp "./resources/css/home.css" "./build/resources/css/home.css"
[ -f "./resources/css/login.css" ] && cp "./resources/css/login.css" "./build/resources/css/login.css"
[ -f "./resources/css/register.css" ] && cp "./resources/css/register.css" "./build/resources/css/register.css"
[ -f "./resources/css/decks.css" ] && cp "./resources/css/decks.css" "./build/resources/css/decks.css"

echo "Copie des fichiers JS..."
[ -f "./resources/js/app.js" ] && cp "./resources/js/app.js" "./build/resources/js/app.js"

echo "Installation des dépendances de production..."
npm ci --omit=dev

echo "Démarrage de l'application..."
cd build
exec node bin/server.js

```


### Étape 3 : docker-compose.yml

```

version: '3.3'

services:
  db:
    image: mysql:8.0.30
    container_name: db_flashcards
    environment:
      MYSQL_ROOT_PASSWORD: root
      MYSQL_USER: db_user
      MYSQL_PASSWORD: db_user_pass
    restart: always
    ports:
      - '6033:3306'
    volumes:
      - dbdata:/var/lib/mysql
      - ./scripts:/scripts

  phpmyadmin:
    image: phpmyadmin:5.2.0
    container_name: db_flashcards_pma
    links:
      - db
    environment:
      PMA_HOST: db
      PMA_PORT: 3306
      PMA_ARBITRARY: 1
    restart: always
    ports:
      - 8081:80

  adonis:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: adonis_app
    restart: always
    volumes:
      - .:/app
      - /app/node_modules
    ports:
      - '3333:3333'
    environment:
      TZ: UTC
      PORT: 3333
      HOST: 0.0.0.0
      LOG_LEVEL: info
      APP_KEY:
      NODE_ENV: development
      SESSION_DRIVER: cookie
      DB_CONNECTION: mysql
      DB_HOST: db
      DB_PORT: 3306
      DB_USER: db_user
      DB_PASSWORD: db_user_pass
      DB_DATABASE: db_flashcards
    depends_on:
      - db

volumes:
  dbdata:


```
### recreate_dockers.sh
si pendant la dockerisation vous rencontre des problemes et que vous les corrigers pour recrée le container il y a le

 script recreate_dockers.sh
 
### Schema 

![alt text](image-1.png)

# Deploiement 

## Render 

pour pouvoir mettre en production son projet il faut pour commancer crée un compte sur render.

pendant la creation du compte il est demander de donner l'acces a render sur un repo git. la il faut mettre le repo de l'app a mettre en production.

1) Clicker sur add new 
2) choisir Web service 
3) choisir le bon repo git 

#### Settings

 1) mettre un nom 
 2) mettre la branche main 
 3) root Directory : app-Flash-Card-adonisjs
 4) Dockerfile Path : app-Flash-Card-adonisjs/  ./Dockerfile
 5) choisir l'instance Free

6) pour les variables d'environement regarder la suite du Readme
  
 6) Docker Build Context Directory : app-Flash-Card-adonisjs/ .

#### variable d'environement 

```
TZ=UTC
PORT=3333
HOST=localhost
LOG_LEVEL=info
APP_KEY=
NODE_ENV=development
SESSION_DRIVER=cookie
DB_HOST= (propre a la database)
DB_PORT= (propre a la database)
DB_USER=root
DB_PASSWORD= (propre a la database)
DB_DATABASE=db_adonis
```

### Database 

1) add new Postgres 

#### settings 

Name : postgres-Flash-card 

dbname : db_adonis

user : root

Plan option : free

1) recuperer les infos de la database en cliquant dessus et mettre ses infos dans les variable d'environement 

### lancement de la production 

retourner sur la production et lancer Manual Deploy sur le dernier commit 

et voila votre application et deploiée 


## erreur renconter 

le deploiement marche. mais il y a une erreur qui revient en boucle malger les tentative pour la corriger ( tentative visible sur github ) 

erreur : {"level":50,"time":1748431461460,"pid":41,"hostname":"srv-d0djqqidbo4c738kmbj0-hibernate-5b645545f9-dv8kw","request_id":"pw0og40a1v494bsdjnu0r3yh","err":{"type":"EdgeError","message":"Cannot resolve \"/app/build/resources/views/partials/header.edge\". Make sure the file exists","stack":"Error: Cannot resolve \"/app/build/resources/views/partials/header.edge\". Make sure the file exists\n    at anonymous (/app/build/resources/views/home.edge:13:0)\n    at Template.reThrow (file:///app/node_modules/edge.js/build/chunk-DA7IVQFT.js:625:11)\n    at eval (eval at #wrapToFunction (file:///app/node_modules/edge.js/build/index.js:1298:14), <anonymous>:204:10)","line":13,"col":0,"filename":"/app/build/resources/views/home.edge","code":"E_RUNTIME_EXCEPTION","status":500},"x-request-id":"pw0og40a1v494bsdjnu0r3yh","msg":"Cannot resolve \"/app/build/resources/views/partials/header.edge\". Make sure the file exists"}


## schema 

