/*
* @Author: vaio
* @Date:   2018-10-25 15:31:31
* @Last Modified by:   vaio
* @Last Modified time: 2018-10-25 15:31:45
*/
var WebSocketServer = require('ws').Server,
wss = new WebSocketServer({ port: 8181 });
wss.on('connection', function (ws) {
    console.log('client connected');
    ws.on('message', function (message) {
        console.log(message);
    });
});