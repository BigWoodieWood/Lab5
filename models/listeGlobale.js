const { ItemList } = require('./itemlist');
const liste = new ItemList();

// valeurs initiales
liste.ajouterItem("Test1", 12.34);
liste.ajouterItem("Test2", 12.45);
liste.ajouterItem("Test3", 77.45);

module.exports = liste;