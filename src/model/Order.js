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
        this.total += item.getPrice() * quantity;
    }
    removeItem(item) {
        this.items.delete(item);
    }
    getTotal() {
        return this.total;
    }
    getSummary() {
        let order = [["Name", "Quantity", "Price"]];
        this.items.forEach((quantity, item) => {
            const price = item.getPrice() * quantity;
            order.push([item.getName(), quantity.toString(), price.toString()]);
        });
        return order;
    }
}
exports.Order = Order;
