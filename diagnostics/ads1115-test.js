const ADS1115 = require('ads1115');
const i2c = require('i2c-bus');

i2c.openPromisified(1).then(async (bus) => {
  const ads1115 = await ADS1115(bus)
  // ads1115.gain = 1

  for (let i = 0; i < 1000; i++) {
    let value = await ads1115.measure('0+GND')
    console.log(value)
  }
})
