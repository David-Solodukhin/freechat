
var socket = io.connect('https://reewith.me:443', {secure: true}); 

 if (navigator.geolocation) {
navigator.geolocation.getCurrentPosition(send_loc);
} else {
//alert('enable location and refresh');
latD=1;
send_loc({coords: {latitude: 33.7756, longitude: -84.3963}});
}





$(document).keypress(function (e) {
                if (e.which == 13 || event.keyCode == 13) {
                   //socket.emit('set_loc')
		 if(latD == 0.0) {
		alert('make sure location is enabled');
send_loc( {coords: {latitude: 33.7756, longitude: -84.3963}});

			}
                   var text = document.getElementById('textbox').value;
                   socket.emit('send_msg', text);
                   $('.chat-thread').append("<li class='domestic'>" + text+"</li>");
                   document.getElementById('textbox').value = "";
                   $('.chat-thread').scrollTop($('.chat-thread').prop('scrollHeight'));
                }
});
socket.on("refresh", (data)=>{
    console.log(data);
    location.reload();
});

socket.on("rec_msg", (data)=>{
    console.log(data);
    $('.chat-thread').append("<li class='foreign'>" + data+"</li>");
    $('.chat-thread').scrollTop($('.chat-thread').prop('scrollHeight'));
});
var latD = 0.0;
function send_loc(position) {
  const lng = position.coords.longitude;
  const lat = position.coords.latitude;
  latD = lat;
console.log(socket.id);
  console.log(`longitude: ${ lng } | latitude: ${ lat }`);

  socket.emit('set_loc', {'lat': lat, 'lng': lng});

};
