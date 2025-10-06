/** 
  * @file       index.js 
  * @author     Elliot Wood
  * @version    1 
  * @date       22/09/2025 
  * @brief      Routeur principal pour la page d'accueil
  */ 
var express = require('express'); 
var router = express.Router(); 
const liste = require('../models/listeGlobale');

router.get('/', function(req, res, next) { 
    let message = null;
    res.render('pages/accueil', { title: 'Accueil', items: liste.getItems(), message });
});
router.post('/add', function(req, res, next) { 
    liste.ajouterItem(req.body.nom, parseFloat(req.body.prix));
    res.redirect('/');
});

router.post('/deleteById', function(req, res, next) {
    const id = parseInt(req.body.id, 10);
    let message = null;
    if (!id) {
        message = "ID vide." ;
    } else {
        const item = liste.getItemById(id);
        if (item) {
            liste.removeItemById(id);
            console.log(`Item avec ID "${id}" supprimé.`);
        } else {
            console.log(`Item avec ID "${id}" introuvable.`);
            message = `Item "${id}" introuvable.` ;
        }
    }
    res.render('pages/accueil', { title: 'Accueil', items: liste.getItems(), message });
});

router.post('/deleteByName', function(req, res, next) {
    const nom = req.body.nom.trim();
    let message = null;

    if (!nom) {
        message = "Nom vide.";
    } else {
        const item = liste.getItemByName(nom);
        if (item) {
            liste.removeItemByName(nom);
            console.log(`Item avec nom "${nom}" supprimé.`);
        } else {
            console.log(`Item avec nom "${nom}" introuvable.`);
            message = `Item "${nom}" introuvable.`;
        }
    }

    res.render('pages/accueil', { title: 'Accueil', items: liste.getItems(), message });
});

module.exports = router;