const fs = require('fs');
const constant = require('./constant');

function readData() {
    try {
        const buffer = fs.readFileSync(constant.DATA_SOURCE);
        return JSON.parse(buffer);
    } catch(err) {
        console.log("Error reading data", err);
        return [];
    }
}

function writeData(data) {
    const jsonString = JSON.stringify(data);
    fs.writeFile(constant.DATA_SOURCE, jsonString, err => {
        if(err) console.log('Error writing file', err);
        else console.log("Wrote");
    })
    
}

module.exports = {
    readData,
    writeData
};