//
//  GameStateTransformer.js
//
//  Created by Ingenuity i/o on 2023/01/20.
//  Copyright © 2022 Ingenuity i/o. All rights reserved.
//

const igs = require('ingescape');

const { parseSVG } = require('./controllers/SVGParser');

const { updateWorldMap } = require('./controllers/WorldMapController');

const fs = require('fs');

const {  XMLSerializer } = require('@xmldom/xmldom')

const { clearWhiteboard, drawImage } = require('./services/WhiteboardService');

const { convertWorldMapToPng64 } = require('./view/SVGToPNG');

const { printLadder }  = require('./controllers/GamePrinter')

function readFile(filePath) {
  try {
    const data = fs.readFileSync(filePath);

    igs.info("len:"+Buffer.byteLength(data))
    igs.info('len_str:' + data.toString('utf8').length)
    return data.toString('utf8');
  } catch (error) {
    console.error(`Got an error trying to read the file: ${error.message}`);
  }
}

class GameStateTransformer {

  constructor() {
    //inputs
    this.gameStateJsonI = "";
    this.statusJsonI = "";

    //outputs
    this.countries = null;
    this.ladder = null;

    //add code here if needed

  }

  transformInputToGameState(data) {
    try {
      let result = JSON.parse(data);

      if(result.countries) {
        this.countries = result.countries;
      } else {
        igs.error("countries not found");
      }

      if(result.ladder) {
        this.ladder = result.ladder;
      } else {
        igs.error("ladder not found");
      }

      return result;
    } catch(e) {
      igs.error("exception transformInputToGameState: " + JSON.stringify(e));

      return null;
    }
  }

  transformGameStateToSVG(gameState) {
    const mapFilePath = "./public/world.svg";

    let svgFileData = readFile(mapFilePath);

    let worldMap = parseSVG(svgFileData);

    let newWorldMap = updateWorldMap(worldMap, gameState);

    return newWorldMap;
  }

  /////////////////////////////////////////////////////////////////////
  //inputs

  // game_state_json
  setGameStateJsonI(gameStateJsonI) {
    this.gameStateJsonI = gameStateJsonI;

    /* Implementation des transformations de modéles (voir transformations_statechart.png dans la racine du projet) */
    
    // A chaque fois que le gameState change, regenerer la carte du monde et l'envoyer au Whiteboard
    let gameState = this.transformInputToGameState(gameStateJsonI);

    // On transforme l'etat du jeu en SVG
    let gameMap =  this.transformGameStateToSVG(gameState) 

    // On transforme le SVG en String
    const serialized = new XMLSerializer().serializeToString(gameMap)

    // On supprime l'ancienne carte du monde, si elle existe
    if (fs.existsSync("./public/new_world.svg"))
      fs.unlinkSync("./public/new_world.svg")

    // Puis on enregistre dans la nouvelle map dans le dossier ./public
    fs.writeFile("./public/new_world.svg", serialized, () => 
      // Puis on convertir la map en PNG (base64)
      convertWorldMapToPng64().then( (img) => {
        // On supprime l'ancienne carte du monde du Whiteboard
        clearWhiteboard();

        // On dessine la carte du monde sur le Whiteboard
        drawImage(img);

        // On écrit le classement des joueurs sur le Whiteboard (chat)
        printLadder(gameState.ladder);
      })
    );
  }

  getGameStateJsonI() {
    return this.gameStateJsonI;
  }

  // status_json
  setStatusJsonI(statusJsonI) {
    this.statusJsonI = statusJsonI;

    //add code here if needed

  }
  getStatusJsonI() {
    return this.statusJsonI;
  }
};

module.exports = {GameStateTransformer:GameStateTransformer};

