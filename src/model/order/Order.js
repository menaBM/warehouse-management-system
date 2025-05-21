"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
class Order {
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
    addItem(item, quantity) {
        this.items.set(item, quantity);
        this.total += item.getPrice() * quantity;
    }
    removeItem(item) {
        this.items.delete(item);
    }
    getTotal() {
        return this.total;
    }
    getStockUpdates() {
        return this.items;
    }
    getSummary() {
        let order = [["Name", "Quantity", "Price"]];
        this.items.forEach((quantity, item) => {
            const price = item.getPrice() * quantity;
            order.push([item.getName(), quantity.toString(), price.toString()]);
        });
        return order;
    }
    complete() {
    }
}
exports.Order = Order;
