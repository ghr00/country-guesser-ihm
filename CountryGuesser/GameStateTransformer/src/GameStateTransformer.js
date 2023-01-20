//
//  GameStateTransformer.js
//
//  Created by Ingenuity i/o on 2023/01/20.
//  Copyright © 2022 Ingenuity i/o. All rights reserved.
//

const igs = require('ingescape');

class GameStateTransformer {

  constructor() {
    //inputs
    this.gameStateJsonI = "";
    this.statusJsonI = "";

    //add code here if needed

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

