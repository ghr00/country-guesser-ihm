const Country = require("./Country")

const igs = require('ingescape');

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

const updateWorldMap = (doc, worldMap) => {

    igs.info('updateWorldMap worldMap.countries.length: ' + worldMap.countries.length);
    
    for (let i = 0; i < worldMap.countries.length; i++) {
        igs.info("worldMap.countries[i].name:" + worldMap.countries[i].name)
        const element = doc.getElementById(getCountry(doc, worldMap.countries[i].name).id)
            
        element.setAttribute("fill", "#AB7C94")
        
    }
    
    return doc;
}

module.exports = {
    getCountry, updateWorldMap
}