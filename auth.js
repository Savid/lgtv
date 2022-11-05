import WebSocket from 'ws';
import macfromip from 'macfromip';
import register from './register.json' assert { type: "json" };

const ip = process.env.IP;
const port = process.env.PORT || 3000;
if (!ip) throw new Error('IP environment variable is required');

const getMac = (ip) => {
  return new Promise((resolve, reject) => {
    macfromip.getMac(ip, (err, mac) => {
      if (err) {
        reject(err);
      } else {
        resolve(mac);
      }
    });
  });
};

const mac = await getMac(ip);

const ws = new WebSocket(`ws://${ip}:${port}`);
ws.on('open', function open() {
  console.log('Connected to TV, sending register prompt');
  ws.send(JSON.stringify(register));
});

ws.on('message', function message(data) {
  try {
    const json = JSON.parse(data);
    if (json.type === 'response') {
      console.log('Accept the TV register prompt');
    } else if (json.type === 'registered') {
      const key = json.payload['client-key'];
      if (key) {
        console.log('Successfully registered!');
        console.log(`\n client-key: ${key}\n mac-address: ${mac}\n`);
        process.exit(0);
      }
      throw new Error('No client-key in response');
    } else {
      throw new Error(`Unknown message type ${json.type}: ${data}`);
    }
  } catch (error) {
    console.error(`Error parsing message: ${error}`);
    process.exit(1);
  }
});
