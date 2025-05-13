"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Inventory = void 0;
const Item_1 = __importDefault(require("./Item"));
class Inventory {
    constructor() {
        this.items = new Map;
        //load from json?
        const testItems = [
            { item: "item 1", value: new Item_1.default("item 1", 5, 34) },
            { item: "item 2", value: new Item_1.default("item 2", 5, 100) },
            { item: "item 3", value: new Item_1.default("item 3", 5, 48) },
            { item: "item 4", value: new Item_1.default("item 4", 5, 23) }
        ];
        testItems.forEach(item => {
            this.items.set(item.item, item.value);
        });
    }
    generateReport() {
    }
    updateStock(item, quantity) {
        //need to check change is valid
    }
    lookupItem(name) {
        return this.items.get(name);
    }
    checkInStock(item, quantity) {
        const stock = this.items.get(item.getName());
        // move to lookUpItem method
        if (stock) {
            return stock ? stock.quantity >= quantity : false;
        }
        return false;
    }
    checkLowStock(item) {
        // defined as a percentage or stored in a field on the item?
    }
    processOrder(order) {
        // could be customerOrder or supplierOrder
        //loop through order.getItems() 
        //updateStock()
    }
}
exports.Inventory = Inventory;
