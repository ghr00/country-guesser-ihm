
var loadsvg = require('load-svg')

const igs = require('ingescape');

const { DOMParser, XMLSerializer } = require('@xmldom/xmldom')

const loadSVG = (filepath) => {
    loadsvg(filepath, function (err, svg) {
        console.log(svg);
    });
}

const parseSVG = (svgData) => {
    let parser = new DOMParser();

    igs.info("type: " + svgData.slice(-1))
    let doc = parser.parseFromString(svgData, "image/svg+xml")

    const serialized = new XMLSerializer().serializeToString(doc)

    //igs.info("doc: " + serialized);

    if(doc) {
        //igs.info(JSON.stringify(doc));

        let element = doc.getElementById("CO");
        let height = element.getAttribute("title");

        if(height) {
            igs.info("yes title:" + height);

        } else {
            igs.info("no title");

        }

        let countries = doc.getElementsByTagName("path");

        igs.info('countries: ' + typeof(countries.length));
        
        return doc;
    } else {
        igs.error("cannot parseSVG: " + JSON.stringify(doc));
        return {};
    }
}

const changeElement = (node, element) => {
    
}


module.exports = { loadSVG, parseSVG }