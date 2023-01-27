
var loadsvg = require('load-svg')

const igs = require('ingescape');

const { DOMParser } = require('xmldom')

const loadSVG = (filepath) => {
    loadsvg(filepath, function (err, svg) {
        console.log(svg);
    });
}

const parseSVG = async (svgData) => {
    let parser = new DOMParser();

    try {
        let doc = await parser.parseFromString(svgData, "image/svg+xml")
        
        if(doc) {
            igs.info(JSON.stringify(doc));

            return await doc.documentElement.getElementById('CO');
        } else {
            return {};
        }
    } catch(e) {
        igs.error(JSON.stringify(e));
        return e;
    }
}

const changeElement = (node, element) => {
    
}


module.exports = { loadSVG, parseSVG }