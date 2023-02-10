const Country = require("../models/Country")

const igs = require('ingescape');
const { LadderElement } = require("../models/Ladder");

/**
 * Recherche un pays (ses bordures) dans le SVG en utilisant l'API DOM XML
 * @param {*} doc 
 * @param {String} name 
 * @returns Le pays trouvé, null si aucun pays n'est trouvé
 */
const getCountry = (doc, name) => {
    igs.info('getCountry#getCountry:' + typeof(doc.getElementsByTagName));

    let countries = doc.getElementsByTagName("path");

    igs.info('getCountry#getCountry countries: ' +countries.length);

        for (let i = 0; i < countries.length; i++) {
            const element = countries.item(i)
            
            igs.info("Compare " + (element.getAttribute("title")) + " with " + name )
            if(element.getAttribute("title").localeCompare(name) === 0) {
                igs.info('colombia found : ' + element.getAttribute("id"))
                return new Country( element.getAttribute("id"), name, null);
            }

        }

    igs.info('getCountry : no element found')
    return null;
}

/**
 * Retourne la couleur du joueur (qui est la couleur des pays qu'il a deviné sur la carte du monde) à partir du nom du joueur
 * @param {String} player 
 * @param {GameState} gameState 
 * @returns Couleur au format Hex, null si le joueur n'existe pas.
 */
const getPlayerColor = (player, gameState) => {
    
    let { ladder } = gameState;
    for (let i = 0; i < ladder.length; i++) {
        const element = ladder[i];
        
        if(element.name === player) {
            return element.color;
        }
    }

    return null;
}

/**
 * Colore chaque pays de la carte du monde selon la couleur du joueur qui a deviné le pays.
 * @param {*} doc 
 * @param {GameState} gameState 
 * @returns 
 */
const updateWorldMap = (doc, gameState) => {
    
    for (let i = 0; i < gameState.countries.length; i++) {
        if( gameState.countries[i].guesser ) {
            const element = doc.getElementById(getCountry(doc, gameState.countries[i].name).id)
                
            const color = getPlayerColor(gameState.countries[i].guesser, gameState);

            element.setAttribute("fill", color ? color : "#AB7C94");
        }
    }
    
    return doc;
}

module.exports = {
    getCountry, updateWorldMap
}