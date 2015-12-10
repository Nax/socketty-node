'use strict';

var WebSocketServer     = require('ws').Server;
var ServerSocket        = require('./common');

function Server (httpServer) {
    var that = this;
    var server = new WebSocketServer({ server: httpServer });

    this.connection = function (callback) {
        that._connection = callback;
    };

    server.on('connection', function (ws) {
        var socket = new ServerSocket(ws);
        if (that._connection) {
            that._connection(socket);
        }
    });
    this._server = server;
}

module.exports = {
    createServer: function (httpServer) {
        return new Server(httpServer);
    }
};
