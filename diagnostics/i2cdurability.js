// Load the i2c-bus module
const i2c = require('i2c-bus');

// Open the I2C bus
const bus = i2c.openSync(1);

// Define the I2C address of the PCF8574
// Common addresses are 0x20 to 0x27 depending on the A0, A1, A2 pins connections
const ADDRESS = 0x27;

const delay = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

// Function to send a byte (binary code) to the PCF8574
async function sendByteToPCF8574(byte) {
  bus.writeByteSync(ADDRESS, 0x00, byte);
  console.log(`Byte ${byte.toString(2).padStart(8, '0')} sent to PCF8574`);
}

function readByteFromPCF8574() {
  const byte = bus.readByteSync(ADDRESS, 0x00);
  console.log(`Byte ${byte.toString(2).padStart(8, '0')} received`);
  return byte;
}

const possible = [
  '00000000',
  '10000000',
  '11000000',
  '11100000',
  '11110000',
  '10100000',
  '10010000',
  '00110000',
  '01110000',
  '11110000',
];

async function run(times) {
  const repeat = times || 100;
  for (let i = 0; i < repeat; i++) {
    console.log('Loop: ', i);
    for (let x = 0; x < possible.length; x++) {
      await delay(250);
      const result = sendByteToPCF8574(parseInt(possible[x], 2));
      console.log('Res', result);
      console.log(`sending item ${i} for ${possible[x]}`);
    }
    console.log(`loop: ${i} complete`);
  }
}

run(100);
console.log('DONE');
bus.closeSync();
// Example to turn on all outputs
// Sending 0xFF will set all IO pins to HIGH
//sendByteToPCF8574(0xf0);

//sendByteToPCF8574(hexa);
//const readRes = readByteFromPCF8574();
// console.log(`Received ${readRes}`);
// Close the I2C bus after finishing
