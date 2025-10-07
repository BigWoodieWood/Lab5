let io = null;

module.exports = {
    init: (server) => {
        io = require('socket.io')(server);

        let nbr = 0;

        io.on('connection', (socket) => {
            nbr++;
            console.log(nbr + ' client est connecté !');

            socket.on('disconnect', () => {
                nbr--;
                console.log("Un client s'est déconnecté, reste " + nbr);
            });
        });

        return io;
    },

    getIO: () => {
        if (!io) {
            throw new Error("Socket.io n'est pas encore initialisé !");
        }
        return io;
    }
};