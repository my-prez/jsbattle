#Alpes-JUG JS Battle

##Mode développement (dans IDE)

Lancer Redis en mode par défaut :`redis-server`

        httpPort = 8080
        clusterConnectionPort = 8081 // pas encore complètement compris (mais du coup je lance +sieurs vert.x)
        redisPort = 6379
        staticAssets = "public";
        defaultPage = "index.html";
        

##Mode "stand-alone"

###Compiler

    mvn compile assembly:single

###Installer

- copier (en provenance du répertoire `target`) `alpesjugjsbattle-0.0.0-standalone.jar` dans un répertoire
- dans le même répertoire créer le répertoire pour les fichiers statiques (du nom que vous voulez)

###Redis

Créer un fichier de configuration `maconf.conf` :

    port 6666
    save 1 1
    dbfilename k33g.rdb

###Un p'tit shell pour la route

Créer un script `monapp.sh` *(à rendre exécutable : `chmode +x`)*:

    #!/bin/sh
    #
    java -jar alpesjugjsbattle-0.0.0-standalone.jar localhost <CLUSTER_PORT> <HTTP_PORT> localhost <REDIS_PORT> <VOTRE_REPERTOIRE_DE_FICHIERS_STATIQUES> <VOTRE_PAGE_WEB_PAR_DEFAUT>

Par exemple :

    #!/bin/sh
    #
    java -jar alpesjugjsbattle-0.0.0-standalone.jar localhost 9091 9090 localhost 6666 public index.html

###Lancer la bête

    redis-server maconf.conf

puis

    ./monapp.sh


##Remarques :

Pour les queries ajax (API), voir le fichier `sample.js`