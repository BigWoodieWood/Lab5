/** 
  * @file       app.js 
  * @author     Elliot Wood
  * @version    1 
  * @date       22/09/2025 
  * @brief      Projet Lab 4 - Serveur Express 
 */ 

const PORT = 8080; 
const express = require('express'); 
const app = express(); 

const liste = require('./models/listeGlobale');

app.set('view engine', 'ejs'); 
app.set('views', './views'); 

app.use(express.static('./public')); 
app.use(express.json()); 
app.use(express.urlencoded({ extended: false })); 

app.use(require('./routes/index')); 
app.use('/contact', require('./routes/contacts')); 



app.use(function (req, res, next) { 
    res.status(404);
    res.render("pages/404.ejs"); 
}); 

app.listen(PORT, () => {
        console.log(`Serveur démarré sur http://localhost:${PORT}`);
});

app.use(function(err, req, res, next) { 
    res.locals.message = err.message; 
    res.locals.error = req.app.get('env') === 'development' ? err : {}; 

    res.status(err.status || 500); 
    res.render('error'); 
}); 

module.exports = {app: app}; 