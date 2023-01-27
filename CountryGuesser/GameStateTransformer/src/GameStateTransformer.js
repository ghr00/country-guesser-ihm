//
//  GameStateTransformer.js
//
//  Created by Ingenuity i/o on 2023/01/20.
//  Copyright © 2022 Ingenuity i/o. All rights reserved.
//

const igs = require('ingescape');

const { parseSVG } = require('./SVGParser');

const { GameState } = require('./GameState');


const fs = require('fs').promises;

async function readFile(filePath) {
  try {
    const data = await fs.readFile(filePath);
    console.log(data.toString());

    return data.toString();
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

      igs.info(JSON.stringify(result.countries));

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

  async transformGameStateToSVG(gameState) {
    
    const mapFilePath = "./public/world.svg";

    let svgFileData = await readFile(mapFilePath);

    let worldMap = await parseSVG(svgFileData);

    igs.info(JSON.stringify(worldMap));
  }

  /////////////////////////////////////////////////////////////////////
  //inputs

  // game_state_json
  setGameStateJsonI(gameStateJsonI) {
    this.gameStateJsonI = gameStateJsonI;

    let gameState = this.transformInputToGameState(this.getGameStateJsonI());

    this.transformGameStateToSVG(gameState) 
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

