const url = require('url');
const express = require('express');
const fs = require('fs');

const app = express();

const server = app.listen(8004, function () {
    const host = server.address().address;
    const port = server.address().port;
    console.log('Advertising server listening at http://%s:%s', host, port);
});

app.get('*', function (req, res) {
    setTimeout(function() {
      return fs.createReadStream('app/advertising.html').pipe(res);
    }, 2000);
});
