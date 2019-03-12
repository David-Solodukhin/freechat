
var socket = io.connect('https://128.61.15.221:4337', {secure: true}); 


navigator.geolocation.getCurrentPosition(send_loc);





$(document).keypress(function (e) {
                if (e.which == 13 || event.keyCode == 13) {
                   //socket.emit('set_loc')
                   var text = document.getElementById('textbox').value;
                   socket.emit('send_msg', text);
                   $('.chat-thread').append("<li class='domestic'>" + text+"</li>");
                   document.getElementById('textbox').value = "";
                   $('.chat-thread').scrollTop($('.chat-thread').prop('scrollHeight'));
                }
});

socket.on("rec_msg", (data)=>{
    console.log(data);
    $('.chat-thread').append("<li class='foreign'>" + data+"</li>");
    $('.chat-thread').scrollTop($('.chat-thread').prop('scrollHeight'));
});
function send_loc(position) {
  const lng = position.coords.longitude;
  const lat = position.coords.latitude;
console.log(socket.id);
  console.log(`longitude: ${ lng } | latitude: ${ lat }`);

  socket.emit('set_loc', {'lat': lat, 'lng': lng});

};
