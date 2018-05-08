const path = require('path');
const express = require('express');

const port = process.env.PORT || 3000;

const server = express();

// Register static files
server.use('/', express.static(path.join(__dirname, '..', 'build')));
server.use(
  '/.well-known',
  express.static(path.join(__dirname, '..', 'payment'))
);

// Launch the server
server.listen(port, () => {
  console.log(`Server listen on port: ${port}`);
});
