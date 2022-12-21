const express = require('express');
const routes = express.Router();

routes.use((req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

module.exports = routes;