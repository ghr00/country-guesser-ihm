
var loadsvg = require('load-svg')

const igs = require('ingescape');

const { DOMParser } = require('@xmldom/xmldom')

/**
 * Charger un SVG dans la mémoire à partir d'un fichier
 * @param {String} filepath 
 */
const loadSVG = (filepath) => {
    loadsvg(filepath, function (err, svg) {
        console.log(svg);
    });
}

/**
 * Transforme un SVG (chargé en mémoire) en une structure de donnée JSON qui peut être manipulé comme un DOM XML
 * @param {*} svgData
 * @returns 
 */
const parseSVG = (svgData) => {
    let parser = new DOMParser();

    igs.info("type: " + svgData.slice(-1))
    let doc = parser.parseFromString(svgData, "image/svg+xml")

    if(doc) {
        return doc;
    } else {
        igs.error("cannot parseSVG: " + JSON.stringify(doc));
        return {};
    }
}

module.exports = { loadSVG, parseSVG }