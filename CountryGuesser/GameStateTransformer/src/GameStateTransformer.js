//
//  GameStateTransformer.js
//
//  Created by Ingenuity i/o on 2023/01/20.
//  Copyright © 2022 Ingenuity i/o. All rights reserved.
//

const igs = require('ingescape');

const { parseSVG } = require('./SVGParser');

const { GameState } = require('./GameState');

const { getCountry, updateWorldMap } = require('./WorldMap');

const fs = require('fs');

const { DOMParser, XMLSerializer } = require('@xmldom/xmldom')

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

      igs.info("countries:" + JSON.stringify(result.countries));

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
      igs.error("exceptio");

      return null;
    }
  }

  transformGameStateToSVG(gameState) {
    
    //if(this.isValidGameState(gameState))
    const mapFilePath = "./public/world.svg";

    let svgFileData = readFile(mapFilePath);

    igs.info('len_svg=' + svgFileData.slice(-1));

    let worldMap = parseSVG(svgFileData);

    let countries = worldMap.getElementsByTagName("path");

    igs.info('worldMap countries: ' +countries.length);

    let newWorldMap = updateWorldMap(worldMap, gameState);

    igs.info('newWordMap:' + newWorldMap.getElementsByTagName("path").length);

    return newWorldMap;
  }

  /////////////////////////////////////////////////////////////////////
  //inputs

  // game_state_json
  setGameStateJsonI(gameStateJsonI) {
    this.gameStateJsonI = gameStateJsonI;

    
    let gameState = this.transformInputToGameState(gameStateJsonI);

    let gameMap =  this.transformGameStateToSVG(gameState) 

    igs.info('getCountry ' + typeof(getCountry))
    let countries = gameMap.getElementsByTagName("path");

    igs.info('worldMaP2 countries: ' +countries.length);

    for (let i = 0; i < countries.length; i++) {
      const element = countries.item(i)
      
      if(element.getAttribute("title").localeCompare("Colombia") === 0) {
          igs.info('colombia found : ' + element.getAttribute("fill"))
      }
    }


    let colombia = getCountry(gameMap, "Colombia");

    igs.info('colombia:' + JSON.stringify(colombia) );

    const serialized = new XMLSerializer().serializeToString(gameMap)

    igs.info(serialized)
    fs.writeFileSync("./public/new_world.svg", serialized)
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

