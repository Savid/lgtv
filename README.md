# LG TV Remote control

Inspired by [LGWebOSRemote](https://github.com/klattimer/LGWebOSRemote).

Simple NodeJS scripts to turn a LG TV on and off. Useful when using a LG TV as a monitor.

Requirements;

- NodeJS 18+
- NPM 8+
- LG TV with firmware major version 4, product name "webOSTV 2.0"
- TV must be on same lan segment
- Must turn on "TV On With Mobile" setting on TV side to allow remote websocket connections
- Must know the network IP of your TV (this script does not scan)

## Getting started

```bash
npm install
```

### Auth

To be able to turn the `on` the TV you need to get a client key for authentication

```bash
# get the IP of the TV and call the auth script
IP=192.168.1.50 npm run auth
```

Response output example;

```bash
Connected to TV, sending register prompt
Accept the TV register prompt
Successfully registered!

 client-key: 67c467bd233806c95dcf2967791a556a
 mac-address: 80:5c:64:2b:3a:b5

```

Remember the `client-key` and `mac-address` for future use.

### Turn the TV On

```bash
# use the mac address from the auth step
MAC="80:5c:64:2b:3a:b5" npm run on
```

### Turn the TV Off

```bash
# use the client key from the auth step
IP=192.168.1.50 CLIENT_KEY=67c467bd233806c95dcf2967791a556a npm run off
```

## License

[MIT](https://opensource.org/licenses/MIT)
