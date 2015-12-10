# socketty-node

A lightweight, browser compatible, WebSocket API.

## Install

With npm:

```sh
npm install --save socketty
```

With bower:

```sh
bower install --save socketty
```

## Usage

In node.js:

```js
var socketty = require('socketty');
```

In a browser:

```html
<script src="/bower_components/socketty/dist/socketty.min.js"></script>
```

Socketty is also compatible with Browserify.
In the browser, only the client API is available, for obvious reasons.

## Examples

A basic websocket client in Node:

```js
var socketty = require('socketty');

socketty.connect('ws://localhost:8080', function (socket) {
    console.log('Connected');

    socket.on('hello', function (msg) {
        console.log('Message from server: ' + msg);
    });

    socket.disconnect(function () {
        console.log('Disconnected');
    });
});
```

A websocket server:

```js
var http            = require('http');
var socketty        = require('socketty');

var server = http.createServer();
var wsServer = socketty.createServer(server);

server.listen(8080);

wsServer.connection(function (socket) {
    console.log('New client');
    socket.send('hello', 'Hello client!');

    socket.disconnect(function () {
        console.log('Client disconnected');
    }); 
});
```

## License

Socketty is distributed under the MIT license.

