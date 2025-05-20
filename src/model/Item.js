"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Item {
    constructor(name, price, quantity, lowStockThreshold) {
        this.name = name;
        this.price = price;
        this.quantity = quantity;
        this.lowStockThreshold = lowStockThreshold !== null && lowStockThreshold !== void 0 ? lowStockThreshold : Math.round(quantity * 0.2);
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
    // setLowStockThreshold () 
    isLowStock() {
        return this.quantity <= this.lowStockThreshold;
    }
}
exports.default = Item;
