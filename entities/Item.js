"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Item {
    constructor(name, price, quantity) {
        this.name = name;
        this.price = price;
        this.quantity = quantity;
    }
    setName(name) {
        this.name = name;
    }
    getName() {
        return this.name;
    }
    setPrice(price) {
        this.price = price;
    }
    getPrice() {
        return this.price;
    }
    setQuantity(quantity) {
        this.quantity = quantity;
    }
    getQuantity() {
        return this.quantity;
    }
}
exports.default = Item;
