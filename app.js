#!/usr/bin/env node

var dataFile = './boxes.json';

var fs = require('fs'),
    express = require('express'),
    bodyParser = require('body-parser');

var app = express();

// Serve all files in the public/ directory
app.use(express.static('public'));

app.use(bodyParser.json());

app.get('/boxes', function (request, response) {

    fs.readFile(dataFile, function (error, data) {
        if (error) data = {};

        response.json({
            status: true,
            boxes: JSON.parse(data)
        });

    });

});

app.post('/boxes', function (request, response) {

    fs.writeFile(dataFile, JSON.stringify(request.body), function (error) {
        if (error) throw error;

        response.json({
            status: true
        });

    });

});

// Listen for requests
var server = app.listen(2693);
