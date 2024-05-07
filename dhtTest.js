
var sensor = require('node-dht-sensor');


sensor.read(22,4, function(err, temp, humidity) {
	if (!err) {
		console.log(`temp: ${temp} deg C, humidity: ${humidity}%`);
	}
});
