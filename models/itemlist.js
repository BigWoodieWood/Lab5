class Item {

    constructor(id, nom, prix) {
        this.id = id;
        this.nom = nom;
        this.prix = prix;
        this.dateCreation = this.getDateAujourdhui();
    }

    getDateAujourdhui() {
        const today = new Date();
        const mm = String(today.getMonth() + 1).padStart(2, '0');  
        const dd = String(today.getDate()).padStart(2, '0');       
        const yyyy = today.getFullYear();                          
        return `${mm}/${dd}/${yyyy}`;
    }
}
class ItemList {
    constructor() {
        this.tab = [];
        this.nextId = 1;
    }

    ajouterItem(nom, prix) {
        const nouvelItem = new Item(this.nextId++, nom, prix);
        this.tab.push(nouvelItem);
        return nouvelItem;
    }

    getItems() {
        return this.tab;
    }
    getLength() {
        return this.tab.length;
    }

    getItemById(id) {
        return this.tab.find(tab => tab.id === id);
    }
    getItemByName(nom) {
        return this.tab.find(tab => tab.nom === nom);
    }

    removeItemById(id) {
        const index = this.tab.findIndex(tab => tab.id === id);
        if (index !== -1) {
            this.tab.splice(index, 1);
            return true;
        }
        return false;
    }
    removeItemByName(nom) {
        const index = this.tab.findIndex(tab => tab.nom === nom);
        if (index !== -1) {
            this.tab.splice(index, 1);
            return true;
        }
        return false;
    }
    modifyItem(id, newNom, newPrix) {
        const item = this.getItemById(id);
        if (item) {
            item.nom = newNom;
            item.prix = newPrix;
            return true;
        }
        return false;
    }
}
module.exports = { ItemList: ItemList };