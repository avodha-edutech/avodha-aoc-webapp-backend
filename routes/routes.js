const express = require('express');
const routes = express.Router();
const indexData = require('./routes/data');

routes.use('/data',indexData);

module.exports = routes;