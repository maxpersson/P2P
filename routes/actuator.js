//url af resoucer er defineret gennem routes
var express = require('express'),
    router = express.Router(),
    resources = require('./../res/model');

router.route('/').get(function (req, res, next) {
    req.result = resources.pi.actuators;
    next();
});

router.route('/leds').get(function (req, res, next) {
    req.result = resources.pi.actuators.leds;
    next();
});

router.route('/leds/:id').get(function (req, res, next) { //#A
    req.result = resources.pi.actuators.leds[req.params.id];
    next();
}).put(function(req, res, next) { //#B
    var selectedLed = resources.pi.actuators.leds[req.params.id];
    selectedLed.value = req.body.value; //#C
    req.result = selectedLed;
    next();
});

module.exports = router;