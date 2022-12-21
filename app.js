const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config({path: __dirname + '/.env'});
const public = require('./routes/public');
const routes = require('./routes/routes');
const cors = require('cors');

const port = process.env.SERVERPORT;

const app = express();

app.use(cors({
cerdentials:true
}));
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/api/v1',routes);

app.use(public);

app.listen(port, () => {
    console.log("Server is running successfully on port: " + port);
});
