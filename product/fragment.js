const url = require('url');
const express = require('express');
const fs = require('fs');

const app = express();

const server = app.listen(8003, function () {
    const host = server.address().address;
    const port = server.address().port;
    console.log('Product server listening at http://%s:%s', host, port);
});

app.get('*', function (req, res) {
  const hostname = req.headers.host;

  if (req.url.includes('.css')) {
      res.writeHead(200, { 'Content-Type': 'text/css' });
      return fs.createReadStream('app/css/style.css').pipe(res);
  }

  const cssFiles = fs.readdirSync('app/css');

  const css = cssFiles.map((file) => {
      if (file.includes('.css')) {
          return `<http://${hostname}/${file}>; rel="stylesheet"`;
      }
  });

  res.writeHead(200, {
      Link: `${css.join(',')}`,
      'Content-Type': 'text/html'
  });

  return fs.createReadStream('app/product_new.html').pipe(res);
});
