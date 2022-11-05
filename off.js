import WebSocket from 'ws';
import register from './register.json' assert { type: "json" };

const ip = process.env.IP;
const port = process.env.PORT || 3000;
const clientKey = process.env.CLIENT_KEY;
if (!ip) throw new Error('IP environment variable is required');
if (!clientKey) throw new Error('CLIENT_KEY environment variable is required');

const ws = new WebSocket(`ws://${ip}:${port}`);
ws.on('open', function open() {
  console.log('Connected to TV, sending register prompt');
  ws.send(JSON.stringify({
    ...register,
    payload: {
      ...register.payload,
      'client-key': clientKey
    }
  }));
});

ws.on('message', function message(data) {
  try {
    const json = JSON.parse(data);
    if (json.type === 'registered') {
      console.log('Handshake successful');
      ws.send(JSON.stringify({
        id: '0',
        type: 'request',
        uri: 'ssap://system/turnOff',
      }))
    } else if (json.type === 'response' && json.id === '0') {
      if (json.payload.returnValue) {
        console.log('TV turned off');
        process.exit(0);
      } else {
        throw new Error('Failed to turn off TV');
      }
    } else {
      throw new Error(`Unknown message type ${json.type}: ${data}`);
    }
  } catch (error) {
    console.error(`Error parsing message: ${error}`);
    process.exit(1);
  }
});
