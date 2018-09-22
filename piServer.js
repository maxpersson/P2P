var httpServer = require('./servers/http'),
    resources =require('./res/model'),
    wsServer = require('./servers/websockets');

var ledsPlugin = require('./plugins/internal/ledsPlugin'), //#A
    pirPlugin = require('./plugins/internal/pirPlugin') //#A
    dhtPlugin = require('./plugins/internal/DHT22SensorPlugin')


// Internal Plugins for sensors/actuators connected to the PI GPIOs
// If you test this with real sensors do not forget to set simulate to 'false'
pirPlugin.start({'simulate': true, 'frequency': 2000}); //#B
ledsPlugin.start({'simulate': false, 'frequency': 10000}); //#B
dhtPlugin.start({'simulate': true, 'frequency': 10000}); //#B


var server = httpServer.listen(resources.pi.port, function () {
    console.info('Your WoT Pi is up and running on port %s', resources.pi.port);

    // Websockets server
    wsServer.listen(server);

    console.info('Your WoT Pi is up and running on port %s', resources.pi.port);
})