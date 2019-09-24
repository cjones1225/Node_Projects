const fs = require('fs');
const { animateString } = require('./node_modules/animate-string');
const contents = fs.readdirSync('./animals');

animateString(contents.join('\n'));