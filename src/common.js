'use strict';

var CommonSocket = function (ws) {
    var that = this;
    this._socket = ws;
    this._handle = {};
    this._disconnect = null;

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
        that._disconnect = callback;
    };

    ws.onmessage = function (msgEvent) {
        var rawMsg = msgEvent.data;

        if (rawMsg === 'ping') {
            that._socket.send('pong');
            return;
        }
        if (rawMsg === 'pong') {
            return;
        }
        try {
            var data = JSON.parse(rawMsg);
            var action = data.action;
            var msg = data.msg;

            var h = that._handle[action];
            if (h) {
                h(msg);
            }
        } catch (e) {
            
        }
    };

    ws.onclose = function () {
        if (that._disconnect) {
            that._disconnect();
        }
        clearInterval(that._interval);
    }

    this._interval = setInterval(function () {
        that._socket.send('ping');
    }, 10000);
};

module.exports = CommonSocket;
