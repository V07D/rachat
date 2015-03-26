var message_max_length = 200;

var msgBox = $('#msgBox');
var box = $('#msg');

$(function(){
    $('#btnSend').click(send);
    msgBox.keydown(function(event){
        if (event.which == 13 && event.ctrlKey) {
          msgBox.val(msgBox.val() + '\n'); // Ctrl-Enter for new line
        }
        if (event.which == 13 && !event.ctrlKey) { // Enter for send
            send();
            return false;
        }
    });
});
ws = new WebSocket("ws://localhost:8001");
//ws = new WebSocket("ws://162.208.11.89:8001");

ws.onopen = function(){};
ws.onclose = function(){
    alert("Connection closed...");
};
ws.onmessage = function(evt) {
    box.append("<p>" + evt.data + "</p>");
    box.scrollTop(box[0].scrollHeight);
};

function send() {
    var message = msgBox.val();
    if (message.length == 0)
      return;
    if (message.length > message_max_length) {
        alert('Message is too long');
        return;
    }
    ws.send(msgBox.val());
    msgBox.val('');
}
