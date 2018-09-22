var watcher = require('watchjs');
var resources = require('./../../res/model');

var actuator, interval;
var modelList = resources.pi.actuators.leds;
var localParams = {'simulate': false, 'frequency': 2000};
var model;

exports.start = function (params) {
    localParams = params;

    for (var led in modelList) {
        console.log(modelList[led].name);
        model = modelList[led]
        console.log(model);
        if (localParams.simulate) {
            simulate(model);
        } else {
            obsLeds(model);
        }

    }

};

exports.stop = function () {
    if (localParams.simulate) {
        clearInterval(interval);
    } else {
        actuator.unexport();
    }
    console.info('%s plugin stopped!');
};

function obsLeds(state) {
        watcher.watch(state, function (prob, action) {
            console.log('started watching   ' + action + "   of prob:" + prob + JSON.stringify(this));
            connectHardware(state);
            switchOnOff(state.value)
        });

}

function switchOnOff(value) {
    if (!localParams.simulate) {
        actuator.write(value === true ? 1 : 0, function () { //#C
            console.info('Changed value of %s to', value);
        });
    }
};

function connectHardware(led) {
    var Gpio = require('onoff').Gpio;
    actuator = new Gpio(led.gpio, 'out'); //#D
    console.info('Hardware %s actuator started!', led.name);
};

function simulate(led) {
    interval = setInterval(function () {
        // Switch value on a regular basis
        if (led.value) {
            led.value = false;
        } else {
            led.value = true;
        }
    }, localParams.frequency);
    console.info('Simulated %s actuator started!', led.name);
};

//#A Observe the model for the LEDs
//#B Listen for model changes, on changes call switchOnOff
//#C Change the LED state by changing the GPIO state
//#D Connect the GPIO in write (output) mode