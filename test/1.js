const fs = require('fs');
const path = require('path');
const readStream = fs.createReadStream(path.resolve(__dirname, '1.md'));
console.log(readStream);
