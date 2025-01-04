// Load the i2c-bus module
const i2c = require('i2c-bus');

// Open the I2C bus
const bus = i2c.openSync(1);

// Define the I2C address of the PCF8574
// Common addresses are 0x20 to 0x27 depending on the A0, A1, A2 pins connections
const ADDRESS = 0x48;

// Function to send a byte (binary code) to the PCF8574
function sendByteToPCF8574(byte) {
  bus.writeByteSync(ADDRESS, 0x00, byte);
  console.log(`Byte ${byte.toString(2).padStart(8, '0')} sent to PCF8574`);
}

function readByteFromPCF8574() {
  const byte = bus.readByteSync(ADDRESS, 0x00);
  console.log(`Byte ${byte.toString(2).padStart(8, '0')} received`);
  return byte;
}

const readRes = readByteFromPCF8574();
console.log(`Received ${readRes}`);
// Close the I2C bus after finishing
bus.closeSync();
