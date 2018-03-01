const url = require('url');
const express = require('express');
const fs = require('fs');

const app = express();

const server = app.listen(8002, function () {
    const host = server.address().address;
    const port = server.address().port;
    console.log('Header server listening at http://%s:%s', host, port);
});

app.get('*', function (req, res) {
    return fs.createReadStream('app/header.html').pipe(res);
});
