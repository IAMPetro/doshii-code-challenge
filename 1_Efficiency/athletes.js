'use strict'

const fs = require('fs'),
    readline = require('readline');

const GOLD_MEDAL_COLUMN = 9;

module.exports = {
    parseFile: function () {
        return new Promise((resolve, reject) => {
            let data, columns;
            let counter = 0;

            var readStream = fs.createReadStream('./data/athletes.txt');

            readStream.on('error', (err) => {
                throw new Error(err)
            });

            var rd = readline.createInterface({
                input: readStream,
                output: process.stdout,
                terminal: false
            });

            rd.on('line', (line) => {
                columns = line.split(',')
                if (columns[GOLD_MEDAL_COLUMN])
                    counter += parseInt(columns[GOLD_MEDAL_COLUMN])
            }).on('close', () => {
                resolve(counter)
            });
        })
    }
}
