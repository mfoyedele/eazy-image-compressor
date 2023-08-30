const fs = require('fs');
const { readPoint, readColor } = require('./lib'); // Assuming 'lib.js' has been implemented as shown in the previous responses

function readData(data) {
  const [a, b] = data;
  return [readPoint(a), readColor(b)];
}

async function parseFile(filepath) {
  try {
    const contents = await fs.promises.readFile(filepath, 'utf-8');
    const lines = contents.trim().split('\n');
    const pixels = lines.map((line) => {
      const [a, b] = line.trim().split(' ');
      return readData([a, b]);
    });
    return pixels;
  } catch (error) {
    console.error(error);
    return [];
  }
}

module.exports = {
  parseFile,
};
