const path = require('path');
const express = require('express');
const app = express();
const SocketIO = require('socket.io');

//conf del puerto
app.set('port',5000);
app.use(express.json());
app.use(express.urlencoded({ extended:true }));

//static files
app.use(express.static('./public'))

//inicio el servidor
const server = app.listen(app.get('port'), () =>{

    console.log("Server on port", app.get('port'));

});


//WebSockets
const io = SocketIO(server);
io.on('connection',(socket)=>{
    console.log('New Connection!', socket.id);
    //distribución del mensage
    socket.on('chat:message',(data)=>{
        io.sockets.emit('chat:message',data);
        //console.log(data);
    });
    //escuchando quien escribe
    socket.on('chat:typing',(data)=>{
        socket.broadcast.emit('chat:typing',data);//broadcast no renvia d equien recibes
    });
});
