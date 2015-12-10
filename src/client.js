'use strict';

var WebSocket       = require('ws');
var ClientSocket    = require('./common');

module.exports = {
    connect: function (url, callback) {
        var ws = new WebSocket(url);
        var socket = new ClientSocket(ws);
        ws.onopen = function () {
            callback(socket);
        };
        return socket;
    }
}
