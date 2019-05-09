const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, "./lib/");
let files = fs.readdirSync(filePath);
let nameReg = /(.*)\.js$/;
for (var file of files) {
    let isJs = nameReg.test(file);
    if (isJs) {
        module.exports[RegExp.$1] = require(path.join(filePath, file));
    }
}
