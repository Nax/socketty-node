'use strict';

var WebSocket       = require('ws');
var ClientSocket    = require('./common');

module.exports = {
    connect: function (url) {
        return new ClientSocket(new WebSocket(url));
    }
}
