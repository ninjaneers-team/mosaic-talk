const express = require('express');
const Tailor = require('node-tailor');
const request = require('request');

const app = express();
const tailor = new Tailor({
    templatesPath: __dirname + '/templates',
    maxAssetLinks: 10
});

tailor.on('error', (request, err) => console.error(err));

const server = app.listen(8001, function () {
    const host = server.address().address;
    const port = server.address().port;
    console.log('Tailor server listening at http://%s:%s', host, port);
});

app.get('*',function (req, res) {
    tailor.requestHandler(req, res);
});
