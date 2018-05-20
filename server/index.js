const path = require('path');
const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');
const request = require('request-promise-native');
const express = require('express');

const port = process.env.PORT || 8080;
const cert = path.join(__dirname, 'certificates', 'merchant_id.cert.pem');
const key = path.join(__dirname, 'certificates', 'merchant_id.key.pem');

if (!fs.existsSync(cert) || !fs.existsSync(key)) {
  throw new Error(`
    The server can not run without Apple Pay certificate.
    See: https://developer.apple.com/documentation/apple_pay_on_the_web/configuring_your_environment
  `);
}

const server = express();

// Middlewares
server.use(cors());
server.use(bodyParser.json());

// Register static files
server.use('/', express.static(path.join(__dirname, '..', 'build')));

server.post('/session', (req, res) => {
  request({
    uri: req.body.endpoint,
    method: 'POST',
    json: true,
    cert: fs.readFileSync(cert),
    key: fs.readFileSync(key),
    body: {
      merchantIdentifier: 'merchant.com.payment-request-experiments',
      displayName: 'Payment Request Experiments',
      initiative: 'web',
      initiativeContext: 'payment-request-experiments.herokuapp.com',
    },
  })
    .then(content => {
      res.status(200).json(content);
    })
    .catch(err => {
      res.status(400).json({
        code: 'ERR_PAYMENT',
      });
    });
});

// Launch the server
server.listen(port, () => {
  console.log(`Server listen on port: ${port}`);
});
