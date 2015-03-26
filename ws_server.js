var ws = require("nodejs-websocket");

var message_max_length = 200;

function broadcast(server, msg) {
    server.connections.forEach(function (conn) {
        conn.sendText(msg)
    })
}

var server = ws.createServer(function(conn) {
    console.log("New connection");
    conn.on("text", function(str) {
        if (str.length == 0)
            return;
        if (str.length > message_max_length) {
            return;
            console.log("Too long message");
        }
        console.log("Received " + str);
        broadcast(server, format.message(str));
    })
    conn.on("close", function(code, reason) {
        console.log("Connection closed");
    })
}).listen(8001);

var format = {
    message: function(message, name) {
      name = name || "Anonymous";
      return format.getDate() + ", " + name + ": " + format.escape(message);
    },
    getDate: function() {
      return new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
    },
    escape: function(str) {
      return str.trim()
                .replace(/</g, '&#60;')
                .replace(/>/g, '&#62;')
                .replace(/\n/g, '<br/>');
    }
}
