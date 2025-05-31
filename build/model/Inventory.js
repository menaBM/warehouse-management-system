"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Inventory = void 0;
const Item_1 = require("./Item");
class Inventory {
    constructor() {
        this.items = new Map();
    }
    newItem(name, price, supplierPrice, quantity, lowStockThreshold, supplierName) {
        const item = new Item_1.Item(name, price, supplierPrice, quantity, lowStockThreshold, supplierName);
        this.items.set(name, item);
    }
    addItem(item) {
        this.items.set(item.getName(), item);
    }
    lookupItem(name) {
        return this.items.get(name);
    }
    getItems() {
        return this.items;
    }
    generateReport() {
        let report = [["Item", "Quantity", "Low Stock"]];
        this.items.forEach((item) => {
            const isLowStock = item.isLowStock() ? "Yes" : "No";
            report.push([item.getName(), item.getQuantity().toString(), isLowStock]);
        });
        return report;
    }
    getLowStock() {
        let lowStock = [["Item", "Quantity"]];
        let items = [...this.items.values()].filter((item) => item.isLowStock());
        items.map((item) => lowStock.push([item.getName(), item.getQuantity().toString()]));
        return lowStock;
    }
    updateStock(items) {
        let alerts = new Array();
        items.forEach((quantity, item) => {
            const stock = this.items.get(item.getName());
            if (!stock)
                return alerts;
            stock.setQuantity(stock.getQuantity() - quantity);
            if (stock.isLowStock()) {
                alerts.push(`LOW STOCK: Current quantity of ${stock.getName()} is ${stock.getQuantity()}`);
            }
            this.items.set(stock.getName(), stock);
        });
        return alerts;
    }
}
exports.Inventory = Inventory;
