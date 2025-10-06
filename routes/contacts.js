/** 
  * @file       contacts.js 
  * @author     Elliot Wood
  * @version    1 
  * @date       22/09/2025 
  * @brief      Routeur principal pour la page de contact
  */
var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
    console.log("Route /contacts");
    res.render('pages/contact', { title: 'Contact' });
});


module.exports = router;