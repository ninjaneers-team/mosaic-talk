const url = require('url');
const express = require('express');
const fs = require('fs');

const app = express();

const server = app.listen(8005, function () {
    const host = server.address().address;
    const port = server.address().port;
    console.log('Analytics server listening at http://%s:%s', host, port);
});

app.get('*', function (req, res) {
    const hostname = req.headers.host;

    if (req.url.includes('.css')) {
        res.writeHead(200, { 'Content-Type': 'text/css' });
        return fs.createReadStream('app/css/style.css').pipe(res);
    }

    if (req.url.includes('.js')) {
        res.writeHead(200, { 'Content-Type': 'application/javascript' });
        return fs.createReadStream('app/script/script.js').pipe(res);
    }

    const cssFiles = fs.readdirSync('app/css');
    const jsFiles = fs.readdirSync('app/script');

    const css = cssFiles.map((file) => {
        if (file.includes('.css')) {
            return `<http://${hostname}/${file}>; rel="stylesheet"`;
        }
    });

    const js = jsFiles.map((file) => {
        if (file.includes('.js')) {
            return `<http://${hostname}/${file}>; rel="fragment-script"`;
        }
    });

    res.writeHead(200, {
        Link: `${css.join(',')}, ${js.join(',')}`,
        'Content-Type': 'text/html'
    });

    return fs.createReadStream('app/analytics.html').pipe(res);
});
