var ws = require("nodejs-websocket")

var server = ws.createServer(function(conn) {
    console.log("New connection")
    conn.on("text", function(str) {
        console.log("Received "+str)
        conn.sendText(new Date().toISOString() + ", Anonymous: "+str)
    })
    conn.on("close", function(code, reason) {
        console.log("Connection closed")
    })
}).listen(8001);
