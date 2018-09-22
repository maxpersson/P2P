var express = require('express'),
    cors = require('cors'),
    resource = require('./../res/model'),
    actuator = require('./../routes/actuator'),
    sensors = require('./../routes/sensors'),
    bodyParser =require('body-parser'),
    converter = require('./../middleware/converter');
var path    = require("path");

var app = express();

app.use(bodyParser.json());
app.use(cors());
app.use('/pi/actuators', actuator);
app.use('/pi/sensors', sensors)

app.get('/pi', function (req, res) {
    res.send('hej, her er APIets rodobjekt');
});
app.get('/', function (reg, res) {
    res.sendFile(path.join(__dirname+'/../index.html'));
});
app.get('/res/model', function (reg, res) {
    res.sendFile(path.join(__dirname+'/../res/resources.json'));
});

app.use(converter());

module.exports = app;