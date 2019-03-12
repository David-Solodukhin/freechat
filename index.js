var express = require('express');
var fs = require('fs')
var https = require('https');
var app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'))

app.get('/', (req, res) => {
	res.render('index.ejs')
});


var server = https.createServer({
  key: fs.readFileSync('/etc/letsencrypt/live/reewith.me/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/reewith.me/cert.pem')
}, app)
.listen(443, function () {
  console.log('shitty https activated');
})



//server=app.listen(4337);
var socks = {}
const io = require("socket.io")(server)

io.on('connection', (socket) => {

var maxDist = 1;


    console.log("someone connected: " + socket.id);
    
    socket.on('set_loc', (data) => {
        socket.loc = data;
        socks[socket.id] = data;
        console.log(data);
    });





     socket.on('send_msg', (data) => {
        if (socks[socket.id] === undefined) {
            console.log("old client tried to connect");
	    //io.to(socket).emit('rec_msg', data);
	socket.emit('refresh', 'test');
            return;
        }


        var x2 = socks[socket.id].lat;
        var y2 = socks[socket.id].lng;


        //console.log(x2 +" " + y2);
        console.log(data);
        console.log(socket.id);
        for (var i in io.sockets.connected) {
            //console.log(i+"___SOCK");
            
            //socket.join('tmpRoom');
            if ((i == socket.id) || socks[i] === undefined) {
                continue;
            }
            console.log(i);
            var x1 = socks[i].lat;
            var y1 = socks[i].lng;
            var dist = Math.sqrt(Math.pow(x2 - x1, 2) +  
                Math.pow(y2 - y1, 2) * 1.0); 
            console.log(dist);

            if (dist <= 1) {
                io.to(i).emit('rec_msg', data);
            }


            
       // var s = io.sockets.connected[i];
        //console.log(s.data+"ldsjlkfjslkfd");
            }
        //console.log("DATA" + data);
       // io.to('tmpRoom').emit('rec_msg', "test");
       // io.sockets.clients('tmpRoom').forEach(function(s){
       //     s.leave('tmpRoom');
       // });

        //socks[socket] = data;
        //console.log(data);
    });






});
