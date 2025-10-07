/**
 * @file        index.js 
 * @author      Elliot Wood
 * @version     1.2
 * @date        07/10/2025
 * @brief       Routeur principal pour la page d'accueil + gestion MQTT + Socket.IO
 */

const express = require('express');
const router = express.Router();
const socket = require('../socket');
const liste = require('../models/listeGlobale');
const mqtt = require('mqtt');

const client = mqtt.connect('mqtt://127.0.0.1:1883');

client.on('connect', function () {
    console.log("MQTT connecté !");
    client.subscribe('ITEM/MODULE/#');
});


router.get('/', function (req, res) {
    res.render('pages/accueil', {
        title: 'Accueil',
        items: liste.getItems(),
        message: null
    });
});


router.post('/add', function (req, res) {
    const nom = req.body.nom;
    const prix = parseFloat(req.body.prix);

    liste.ajouterItem(nom, prix);
    const itemTemp = liste.getItemById(liste.getLength() - 1);

    console.log("Nouvel item ajouté :", itemTemp);
    client.publish('ITEM/WEB/NEW', JSON.stringify(itemTemp));

    socket.getIO().emit('updateItems', liste.getItems());
});


router.post('/deleteById', function (req, res) {
    const id = parseInt(req.body.id, 10);

    if (id && liste.getItemById(id)) {
        liste.removeItemById(id);
        console.log(`Item avec ID "${id}" supprimé.`);
        client.publish('ITEM/WEB/DELETE/ID', "ID:" + id);
    }

    socket.getIO().emit('updateItems', liste.getItems());
});


router.post('/deleteByName', function (req, res) {
    const nom = req.body.nom.trim();

    if (nom && liste.getItemByName(nom)) {
        liste.removeItemByName(nom);
        console.log(`Item "${nom}" supprimé.`);
        client.publish('ITEM/WEB/DELETE/NAME', "Name:" + nom);
    }

    socket.getIO().emit('updateItems', liste.getItems());

});


client.on('message', function (topic, message) {
    const topicParts = topic.split('/');
    const msgStr = message.toString();
    if (topicParts[2] === 'NEW') {
        const newItem = JSON.parse(msgStr);
        liste.ajouterItem(newItem.nom, newItem.prix);
    } else if (topicParts[2] === 'DELETE') {
        if (topicParts[3] === 'NAME') {
            const deletedName = msgStr.split(':')[1];
            liste.removeItemByName(deletedName);
        } else if (topicParts[3] === 'ID') {
            const deletedId = parseInt(msgStr.split(':')[1], 10);
            liste.removeItemById(deletedId);
        }
    }
    socket.getIO().emit('updateItems', liste.getItems());
});

module.exports = router;
