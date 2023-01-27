//
//  GameStateTransformer.js
//
//  Created by Ingenuity i/o on 2023/01/20.
//  Copyright © 2022 Ingenuity i/o. All rights reserved.
//

const igs = require('ingescape');

const { parseSVG } = require('./SVGParser');

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
      input = this.gameStateJsonI;

      result = JSON.parse(input);

      igs.info(result);

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

    } catch(e) {
      igs.error(e);
    }
  }

  /////////////////////////////////////////////////////////////////////
  //inputs

  // game_state_json
  setGameStateJsonI(gameStateJsonI) {
    this.gameStateJsonI = gameStateJsonI;

    //add code here if needed
    //transformInputToGameState() ;

    //result = JSON.parse(gameStateJsonI);

    let argsList = [];
    argsList = igs.serviceArgsAddString(argsList, JSON.stringify( { 'countries'
    : [ { 'name' : 'Morocco' } ] }    ));

    igs.serviceCall("Whiteboard", "chat", argsList, "");
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

