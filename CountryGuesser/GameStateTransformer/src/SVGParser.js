
var loadsvg = require('load-svg')

const loadSVG = (filepath) => {
    loadsvg(filepath, function (err, svg) {
        console.log(svg);
    });
}

const parseSVG = (svgData) => {
    let parser = new DOMParser();

    return parser.parseFromString(svgData, "image/svg+xml");
}

const changeElement = (node, element) => {
    
}


module.exports = { loadSVG, parseSVG }