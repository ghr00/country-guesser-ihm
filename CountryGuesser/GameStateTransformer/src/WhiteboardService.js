const igs = require('ingescape');

const drawImage = (data) => {
    igs.info("draIMAGE:" + data)

    let argsList = [];
    argsList = igs.serviceArgsAddData(argsList, data); // png base64
    argsList = igs.serviceArgsAddDouble(argsList, 50); // x
    argsList = igs.serviceArgsAddDouble(argsList, 50); // y
    argsList = igs.serviceArgsAddDouble(argsList, 1010); // width
    argsList = igs.serviceArgsAddDouble(argsList, 666); // height

    igs.serviceCall("Whiteboard", "addImage", argsList, "");
};

module.exports = { drawImage }