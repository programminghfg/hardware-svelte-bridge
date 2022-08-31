// https://serialport.io/docs/guide-usage
const { SerialPort, ReadlineParser } = require('serialport');

const searchPorts = async () => {
  console.log('searching');
  return new Promise(async (resolve) => {
    const timer = setInterval(async () => {
      let ports = await SerialPort.list();
      let port = undefined;
      if (ports !== undefined) {
        port = ports.filter((port) => {
          if (port.path.search('tty') > -1 && port.vendorId !== undefined) {
            return port.path;
          } else {
            return;
          }
        });
      }
      if (ports === undefined) {
        console.log('ports undefined');
        // setTimeout(searchPorts, 1000);
      } else if (port === undefined) {
        console.log('port undefined');
        // setTimeout(searchPorts, 1000);
      } else if (port.length === 0) {
        console.log('no ports found');
        // setTimeout(searchPorts, 1000);
      } else {
        clearInterval(timer);
        console.log('port found');
        resolve(port[0]);
      }
    }, 1000);
  });
};

const loop = async () => {
  console.log('restarting loop');
  const devicePort = await searchPorts();
  console.log(devicePort);

  let port = new SerialPort({ path: devicePort.path, baudRate: 9600 });

  // Readline Parser: https://serialport.io/docs/api-serialport#parsers
  // Creating the parser and piping can be shortened to
  let parser = port.pipe(new ReadlineParser());

  // port.write('main screen turn on', function (err) {
  //   if (err) {
  //     return console.log('Error on write: ', err.message);
  //   }
  //   console.log('message written');
  // });

  // Open errors will be emitted as an error event
  port.on('error', function (err) {
    console.log('Error: ', err.message);
  });

  // port.on('readable', function () {
  //   console.log('Data:', port.read());
  // });

  // // Switches the port into "flowing mode"
  // port.on('data', function (data) {
  //   console.log('Data:', data);
  // });

  port.on('close', function (err) {
    console.log('should reconnect now');
    port = null;
    parser = null;
    loop();
  });

  parser.on('data', console.log);
  parser.on('end', () => console.log('ende'));
  parser.on('error', () => console.log('ende'));
};

loop();

process.on('uncaughtException', function (err) {
  // Handle the error safely
  console.log('droin');
  console.log(err);
});

process.on('caughtException', function (err) {
  // Handle the error safely
  console.log('droin');
  console.log(err);
});
