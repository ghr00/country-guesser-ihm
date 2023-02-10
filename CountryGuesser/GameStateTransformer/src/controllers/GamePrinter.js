
const { printMessage } = require('../services/WhiteboardService')

/**
 * Ecrit le classement des joueurs sur le chat du Whiteboard
 * @param {LadderElement[]} ladder 
 */
const printLadder = (ladder) => {

    if(ladder) {
        printMessage("--- Ladder ---")
        for (let i = 0; i < ladder.length; i++) {
            const element = ladder[i];
            
            printMessage('#' + (i+1) + " || " + element.name + " || " + element.score);
        }
        printMessage("-------------------------")
    } else {
        printMessage("No ladder.");
    }
}

module.exports = { printLadder }