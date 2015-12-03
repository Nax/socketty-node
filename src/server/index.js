'use strict';

var WebSocketServer = require('ws').Server;

function Socket (ws) {
    var that = this;
    this._socket = ws;
    this._handle = {};

    this.send = function (action, msg) {
        var obj = {
            action: action,
            msg: msg
        };
        that._socket.send(JSON.stringify(obj));
    };

    this.on = function (action, callback) {
        that._handle[action] = callback;
    };

    this.disconnect = function (callback) {
        that._socket.on('disconnect', callback);
    };

    ws.on('message', function (msg) {
        var data = JSON.parse(msg);
        var action = data.action;
        var msg = data.msg;

        var h = that._handle[action];
        if (h) {
            h(msg);
        }
    });
}

function Server (httpServer) {
    var that = this;
    var server = new WebSocketServer({ server: httpServer });

    this.connection = function (callback) {
        that._connection = callback;
    };

    server.on('connection', function (ws) {
        var socket = new Socket(ws);
        that._connection(socket);
    });
    this._server = server;
}

module.exports = Server;
