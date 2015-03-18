var ws = require("nodejs-websocket");

function broadcast(server, msg) {
  server.connections.forEach(function (conn) {
    conn.sendText(msg)
  })
}

var server = ws.createServer(function(conn) {
    console.log("New connection")
    conn.on("text", function(str) {
        console.log("Received "+str);
        broadcast(server,new Date().toISOString() + ", Anonymous: "+str.replace(/</g,'&#60;').replace(/>/g,'&#62;'));
    })
    conn.on("close", function(code, reason) {
        console.log("Connection closed")
    })
}).listen(8001);
