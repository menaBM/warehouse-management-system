"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
class Order {
    //make these private
    constructor() {
        this.total = 0;
        this.total = 0;
        this.items = new Map;
    }
    getAllItems() {
        console.log(this.items);
    }
    getItem(item) {
        return this.items.get(item);
    }
    hasItem(item) {
        return this.items.has(item);
    }
    setItem(item, quantity) {
        this.items.set(item, quantity);
        //update total price
    }
    removeItem(item) {
        this.items.delete(item);
    }
}
exports.Order = Order;
