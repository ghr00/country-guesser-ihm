const igs = require('ingescape');

/**
 * Supprime tout les elements du Whiteboard (remarque : ne semble pas fonctionner correctemenet ?)
 */
const clearWhiteboard = () => {
    igs.serviceCall("Whiteboard", "clear", [], "");
}

/**
 * Dessine une image sur le Whiteboard
 * @param {*} data 
 */
const drawImage = (data) => {
    igs.info("draIMAGE:" + data)

    let argsList = [];
    argsList = igs.serviceArgsAddString(argsList, data); // png base64
    argsList = igs.serviceArgsAddDouble(argsList, 50); // x
    argsList = igs.serviceArgsAddDouble(argsList, 50); // y

    igs.serviceCall("Whiteboard", "addImageFromUrl", argsList, "");
};

/**
 * Envoyer un message sur le chat
 * @param {String} message 
 */
const printMessage = (message) => {
    igs.info('printing : ' + message)

    let argsList = [];
    argsList = igs.serviceArgsAddString(argsList, message); //

    igs.serviceCall("Whiteboard", "chat", argsList, "");
}

module.exports = { clearWhiteboard, drawImage, printMessage }