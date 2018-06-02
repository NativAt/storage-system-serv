const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const compression = require('compression');

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(compression());

const auth = require('./middleware/auth');
const db = require('./index');

// connect to database
db();

const filesRoute = require('./routes/files');

app.use('/api/v1/files', auth, filesRoute);

// api validation error handler
app.use((err, req, res, next) => {
  if (err.statusCode === 401) return res.status(401).send(err);
  else if (err.statusCode === 404) return res.status(404).send(err);
  else if (err.statusCode === 400) return res.status(400).json(err);
  else if (err.statusCode === 500) return res.status(500).json(err);
  return res.status(500).json(err);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled rejection', { reason, promise });
});

process.on('uncaughtException', (err) => {
  console.log('whoops! There was an uncaught error', err);
});

const server = app.listen(8080, () => console.log('listening on port 8080!'));


module.exports = server;
