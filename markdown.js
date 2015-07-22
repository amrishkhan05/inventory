#!/usr/bin/env node

var dataFile = './boxes.json';

var fs = require('fs');

fs.readFile(dataFile, function (error, data) {
    if (error) data = {};
    data = JSON.parse(data);

    data.forEach(function (box) {
        console.log(box.name);
        for (var i = 0; i < box.name.length; i ++) {
            process.stdout.write('=');
        }
        console.log("\n");
        box.contents.forEach(function (boxItem) {
            console.log(' * '+boxItem.name);
        });
        process.stdout.write("\n");
    });

});
