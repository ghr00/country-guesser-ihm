
const igs = require('ingescape');

const sharp = require('sharp');

const fs = require('fs');

const converter = require('base64-arraybuffer')

/**
 * Convertit un SVG en PNG qui sera eventuellement affiché sur le Whiteboard (pour le faire, appeler drawImage de WhiteboardService.js)
 * @returns PNG as base64 array buffer
 */
const convertWorldMapToPng64 = () => {
    const filename = "./public/new_world.svg"

    return sharp(filename)
                //.resize({ height: 480, width:240 })
                .toFormat('png')
                .toBuffer()
                .then( (data) => {
                    const output = "data:image/png;base64," + data.toString('base64');

                    igs.info("convertWorldMapToPng: " + output)
                
                    fs.writeFileSync("./public/output64.txt", output)
                
                    return output;
                })


}

module.exports = { convertWorldMapToPng64 }