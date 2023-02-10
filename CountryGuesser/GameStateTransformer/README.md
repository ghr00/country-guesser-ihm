# GameStateTransformer

## Prerequisites

* NodeJS (https://nodejs.org/en/download/)

## Install dependencies
```bash
npm install
```

Si le package "ingescape" ne s'installe pas, il faut entrer manuellement la commande suivante :

```bash
npm install ingescape
```

## Run
```bash
node index.js --verbose --device "nom_du_reseau"
```

Ou bien, lancer le script ```run.bat```.

## Known bugs

Il arrive que le Whiteboard ne clean pas correctement les anciennes images, ou bien charge une image trés ancienne (depuis sa cache si elle existe ?), on ne sait pas si ce bug vient de notre code ou bien de l'implementation du Whiteboard. Pour s'assurer que l'état du jeu généré est correct, il faut aller au dossier ./public/new_world.svg et accéder à l'image ou bien générer un PNG à partir de output.txt (code en base64).

On a pas réussi à faire marcher le projet NodeJS sur Linux, pour tester le projet on a utilisé Hamachi pour créer un réseau LAN virtuel et on a pu tester le jeu ainsi, chaque agent est hebergé dans un PC à distance connecté à deux autres PC par Hamachi.