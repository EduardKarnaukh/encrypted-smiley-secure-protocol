const { rsort } = require('semver');
const SspLib = require('./src/index');

let eSSP = new SspLib({
  id: 0x00,
  debug: false,
  fixedKey: '0123456701234567'
});

var i = 0;

eSSP.on('OPEN', () => {
  eSSP.command('SYNC')
    .then(() => eSSP.initEncryption())
    .then(() => eSSP.command('SETUP_REQUEST', {}))
    .then(() => eSSP.command('GET_SERIAL_NUMBER'))
    .then(() =>
      eSSP.command('SET_CHANNEL_INHIBITS', {
        channels: [1, 1, 1, 1, 1, 1, 1, 1]
      })
    )
    .then(() => eSSP.command('ENABLE_PAYOUT_DEVICE', {
      REQUIRE_FULL_STARTUP: true,
      OPTIMISE_FOR_PAYIN_SPEED: true
    }))
    .then(() => eSSP.setDenominationRoute(1, 'USD', 'payout'))
    .then(() => eSSP.setDenominationRoute(10, 'USD', 'payout'))
    .then(() => eSSP.enable());
    //.then(() => eSSP.command('EMPTY_ALL'));
  eSSP.on('CREDIT_NOTE', result => {
    let channel = result.channel;
    console.log(typeof channel, channel);
    // eslint-disable-next-line eqeqeq
    if (channel == 1) {
      i++;
      console.log('Increment');
    }

    if (i === 2) {
      console.log('i is 2');
      eSSP.setDenominationRoute(1, 'USD').then(result => console.log(result));
    }
  });
});

eSSP.on('CLOSE', () => {
  eSSP.command('DISABLE');
});

eSSP.open('/dev/tty.usbmodem141401');
