/**
 * @file        app.js
 * @author      Elliot Wood
 * @version     1
 * @date        22/09/2025
 * @brief       Projet Lab 4 - Serveur Express + Socket.io
 */

const PORT = 8080;
const express = require('express');
const app = express();
const server = app.listen(PORT, () => {
    const now = new Date();
    console.log(`Serveur démarré sur http://localhost:${PORT} à ${now.toLocaleString()}`);
});
const socket = require('./socket');        
const io = socket.init(server);


app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('./public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use(require('./routes/index'));
app.use('/contact', require('./routes/contacts'));


app.set('socketio', io);


app.use(function (req, res, next) {
    res.status(404);
    res.render('pages/404.ejs');
});




module.exports = { app };
