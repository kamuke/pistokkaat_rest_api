'use strict';

module.exports = (app, port, httpsPort) => {
    const https = require('https');
    const fs = require('fs');
    app.enable('trust proxy');
  
    const sslkey = fs.readFileSync('/etc/pki/tls/private/ca.key');
    const sslcert = fs.readFileSync('/etc/pki/tls/certs/ca.crt');
    const options = {
      key: sslkey,
      cert: sslcert,
    };
  
    app.use ((req, res, next) => {
      if (req.secure) {
        // request was via https, so do no special handling
        next();
      } else {
        const proxypath = process.env.PROXY_PASS || ''
        // request was via http, so redirect to https
        res.redirect(301, `https://${req.headers.host}${proxypath}${req.url}`);
      }
    });
  
    app.listen(port, () => console.log(`Example app listening on port ${port}!`));
    https.createServer(options, app).listen(8000);
};