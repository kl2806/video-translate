module.exports = function(io) {
    io.sockets.on('connection', function(socket) {
        socket.on('message', function(message) {
            socket.broadcast.emit('message', message);
        });

       socket.on('chat', function(message) {
            socket.broadcast.emit('chat', message);
        });

        socket.on('create or join', function(room) {
            var numClients = io.sockets.clients(room).length;

            if (numClients === 0) {
                socket.join(room);
                socket.emit('created', room);
            } else if (numClients == 1) {

                io.sockets. in (room).emit('join', room);
                socket.join(room);
                socket.emit('joined', room);
            } else {
                socket.emit('full', room);
            }

            socket.emit('emit(): client ' + socket.id + ' joined room ' + room);
            socket.broadcast.emit('broadcast(): client ' + socket.id + ' joined room ' + room);

        });

    });
}