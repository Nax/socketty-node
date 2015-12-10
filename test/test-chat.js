'use strict';

var http        = require('http');
var socketty    = require('../src');

var httpServer;

function createTestServer () {
    var server = http.createServer();
    var wss = socketty.createServer(server);
        
    wss.connection(function (socket) {
        socket.send('hello', 'world');
    });

    server.listen(9999);
    return server;
}

describe('Chat Server', function () {
    before(function () {
        httpServer = createTestServer();
    });

    after(function () {
        httpServer.close();
    });

    it('Should be able to connect', function (done) {
        socketty.connect('ws://localhost:9999', function (socket) {
            done();
        });
    });

    it('Should get messages from server', function (done) {
        socketty.connect('ws://localhost:9999', function (socket) {
            socket.on('hello', function (msg) {
                if (msg === 'world') {
                    done();
                }
            });
        });
    });
});
