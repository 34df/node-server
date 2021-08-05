require('dotenv').config();

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const { Console } = require('console');
const cors = require('cors');

/* Server logs */
const output = fs.createWriteStream('./server.log', { flags: 'a' });
const errorOutput = fs.createWriteStream('./error.log', { flags: 'a' });

const logger = new Console({ stdout: output, stderr: errorOutput });

global.INFO = (...args) => logger.log(Date(), '|', 'INFO', '|', ...args);
global.ERROR = (...args) => logger.error(Date(), '|', 'ERROR', '|', ...args);

/* Global URL */
global.API_URL = require('./api.config').API_URL;
global.CLIENT_URL = require('./api.config').CLIENT_URL;

/* Global DB connection */
/* Global.DBConnection = require('./db.config'); */

/* Global root dir */
global.ROOT_DIR = path.resolve(__dirname);

/* Include all created routes */
const RoutesCustom = require('./api');

const app = express();

/* Parse application/x-www-form-urlencoded */
app.use(bodyParser.urlencoded({ extended: false }));

/* Parse application/json */
app.use(bodyParser.json())

/* Serve static files */
app.use(express.static('public'));
app.use(express.static('uploads'));

/* Enable cors */
app.use(cors());

/* Use custom routes in app */
new RoutesCustom(app);

/* 404 middleware */
app.use(function (req, res, next) {
  res.statusCode = 404;
  res.sendFile('404.html', { root: `${ROOT_DIR}/public` });
});

/* Internal server error middleware */
app.use(function (err, req, res, next) {
  ERROR(err);
  res.statusCode = 500;
  res.sendFile('500.html', { root: `${ROOT_DIR}/public` });
});

app.listen(process.env.PORT, function (err) {
  if (err) {
    console.error(err);
  } else {
    console.log(`🚀️ Application running on port ${process.env.PORT}`);
  };
});
