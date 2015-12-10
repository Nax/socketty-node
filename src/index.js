'use strict';

var client      = require('./client');
var server      = require('./server');

module.exports = {
    connect: client.connect,
    createServer: server.createServer
};
