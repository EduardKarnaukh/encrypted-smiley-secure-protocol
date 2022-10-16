const SspLib = require('./src/index');

let eSSP = new SspLib({
  id: 0x00,
  debug: false, // default: false
  timeout: 5000, // default: 3000
  encryptAllCommand: true, // default: true
  fixedKey: '0000000000000000' // default: '0123456701234567'
});


eSSP.on('OPEN', () => {
  console.log('Port opened!');
});

eSSP.on('CLOSE', () => {
  console.log('Port closed!');
});

eSSP.open('/dev/ttyACM0')