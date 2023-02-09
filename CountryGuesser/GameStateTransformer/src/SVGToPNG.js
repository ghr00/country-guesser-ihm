
const igs = require('ingescape');

const sharp = require('sharp');

const fs = require('fs');

const converter = require('base64-arraybuffer')

/**
 * 
 * @returns PNG as base64 array buffer
 */
const convertWorldMapToPng64 = async () => {
    const filename = "./public/new_world.svg"

    const data = await sharp(filename)
                .toFormat('png')
                .toBuffer();

    const output = data.toString('base64');

    igs.info("convertWorldMapToPng: " + output)

    fs.writeFileSync("./public/output64.txt", output)

    return _base64ToArrayBuffer(output);
}

/* Source: https://stackoverflow.com/questions/21797299/convert-base64-string-to-arraybuffer */
const _base64ToArrayBuffer = (base64) => {
    return converter.decode(base64);
}

module.exports = { convertWorldMapToPng64 }