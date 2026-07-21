const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const projectRoot = path.resolve(__dirname, '..');
const sourcePath = path.join(
    projectRoot,
    'public/assets/mason-gift-assets/tile_pack/Map/sample_map.tmx'
);
const outputPath = path.join(
    projectRoot,
    'public/assets/mason-gift-assets/tile_pack/Map/sample_map.json'
);

const source = fs.readFileSync(sourcePath, 'utf8');
const mapTag = source.match(/<map\s+([^>]+)>/)[1];
const readAttribute = (attributes, name) => {
    const match = attributes.match(new RegExp(`${name}="([^"]+)"`));
    return match ? match[1] : undefined;
};

const width = Number(readAttribute(mapTag, 'width'));
const height = Number(readAttribute(mapTag, 'height'));
const tileWidth = Number(readAttribute(mapTag, 'tilewidth'));
const tileHeight = Number(readAttribute(mapTag, 'tileheight'));
const layers = [];
const layerPattern = /<layer\s+([^>]+)>\s*<data[^>]*>\s*([^<]+)\s*<\/data>\s*<\/layer>/g;

let layerMatch;
let layerId = 1;

while ((layerMatch = layerPattern.exec(source)) !== null) {
    const attributes = layerMatch[1];
    const compressed = Buffer.from(layerMatch[2].replace(/\s/g, ''), 'base64');
    const raw = zlib.inflateSync(compressed);
    const data = [];

    for (let offset = 0; offset < raw.length; offset += 4) {
        data.push(raw.readUInt32LE(offset));
    }

    layers.push({
        data,
        height: Number(readAttribute(attributes, 'height')),
        id: layerId,
        name: readAttribute(attributes, 'name'),
        opacity: 1,
        type: 'tilelayer',
        visible: true,
        width: Number(readAttribute(attributes, 'width')),
        x: 0,
        y: 0
    });
    layerId += 1;
}

const map = {
    compressionlevel: -1,
    height,
    infinite: false,
    layers,
    nextlayerid: layerId,
    nextobjectid: 1,
    orientation: 'orthogonal',
    renderorder: 'right-down',
    tiledversion: '1.10.2',
    tileheight: tileHeight,
    tilesets: [
        {
            columns: 57,
            firstgid: 1,
            image: '../Spritesheet/roguelikeSheet_transparent.png',
            imageheight: 526,
            imagewidth: 968,
            margin: 0,
            name: 'Roguelike',
            spacing: 1,
            tilecount: 1767,
            tileheight: tileHeight,
            tilewidth: tileWidth
        }
    ],
    tilewidth: tileWidth,
    type: 'map',
    version: '1.10',
    width
};

fs.writeFileSync(outputPath, `${JSON.stringify(map)}\n`);
console.log(`Converted ${path.relative(projectRoot, sourcePath)} to ${path.relative(projectRoot, outputPath)}`);
