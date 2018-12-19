/*
* @Author: vaio
* @Date:   2018-10-25 15:31:31
* @Last Modified by:   you
* @Last Modified time: 2018-12-14 09:50:22
*/
var port="8183";
var WebSocketServer = require('ws').Server,
wss = new WebSocketServer({ port: port });
var num=0;//连接次数
var heartNum=0;//心跳次数
wss.on('connection', function (ws) {
    console.log('client connected'+(++num));
    ws.on('message', function (message) {

        //将message字符串转成对象
        // var message=JSON.parse(message);
    	if(message=='ping'){
            ws.send('pong');
            console.log('前台传来心跳次数'+(++heartNum));
    		return;
    	}else{
            message=JSON.parse(message);
            console.log('前台传来参数是：'+message);
            var result={
                in:message,
                out:{
                    respondCode:'',
                    data:{}
                }
            }      
            if(message.port=='8183'){
                result.out.respondCode='000000';
            }else{
                result.out.respondCode='000001';
            }
    
            ws.send(JSON.stringify(result));
        }

    });
});
console.log('启动127.0.0.1:'+port);