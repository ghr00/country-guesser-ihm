//
//  GameStateTransformer.js
//
//  Created by Ingenuity i/o on 2023/01/20.
//  Copyright © 2022 Ingenuity i/o. All rights reserved.
//

const igs = require('ingescape');

const { GameState } = require('./GameState');

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

  transformInputToGameState() {
    try {
      input = this.getGameStateJsonI();

      result = JSON.parse(input);

      if(result.countries) {
        this.countries = result.countries;
      } else {
        console.error("countries not found");
      }

      if(result.ladder) {
        this.ladder = result.ladder;
      } else {
        console.error("ladder not found");
      }

    } catch(e) {
      console.error(e);
    }
  }

  /////////////////////////////////////////////////////////////////////
  //inputs

  // game_state_json
  setGameStateJsonI(gameStateJsonI) {
    this.gameStateJsonI = gameStateJsonI;

    //add code here if needed

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

