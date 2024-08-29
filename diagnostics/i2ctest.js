// Load the i2c-bus module
const i2c = require('i2c-bus');

// Open the I2C bus
const bus = i2c.openSync(1);

// Define the I2C address of the PCF8574
// Common addresses are 0x20 to 0x27 depending on the A0, A1, A2 pins connections
const ADDRESS = 0x27;

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

let binAssembly = '';
const switches = {
  A: 'off',
  B: 'off',
  C: 'off',
  D: 'off'
};

binAssembly = (switches.A == 'on') ? '0' : '1'
binAssembly += (switches.B == 'on') ? '0' : '1'
binAssembly += (switches.C == 'on') ? '0' : '1'
binAssembly += (switches.D == 'on') ? '0' : '1'
binAssembly += '0000'; // filler

// const binaryRep = '00110000'; /// all off
console.log(`binAss ${binAssembly}`);
const binaryRep = binAssembly;
const hexa = parseInt(binaryRep, 2);
// Example to turn on all outputs
// Sending 0xFF will set all IO pins to HIGH
console.log("setting:", hexa);
//sendByteToPCF8574(0xf0);
const result = sendByteToPCF8574(hexa);
console.log(`Sent ${result}`);
console.log(result);
bus.closeSync();
//const readRes = readByteFromPCF8574();
// console.log(`Received ${readRes}`);
// Close the I2C bus after finishing
