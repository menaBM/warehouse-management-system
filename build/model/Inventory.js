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
        const testItems = [
            { item: "item 1", value: new Item_1.default("item 1", 5, 34, 50) },
            { item: "item 2", value: new Item_1.default("item 2", 5, 100) },
            { item: "item 3", value: new Item_1.default("item 3", 5, 48, 50) },
            { item: "item 4", value: new Item_1.default("item 4", 5, 23) }
        ];
        testItems.forEach(item => {
            this.items.set(item.item, item.value);
        });
    }
    addItem(name, price, quantity, lowStockThreshold) {
        const item = new Item_1.default(name, price, quantity, lowStockThreshold);
        this.items.set(name, item);
    }
    lookupItem(name) {
        return this.items.get(name);
    }
    generateReport() {
        let report = [["Item", "Quantity", "Low Stock"]];
        this.items.forEach(item => {
            const isLowStock = item.isLowStock() ? "Yes" : "No";
            report.push([item.getName(), item.getQuantity().toString(), isLowStock]);
        });
        return report;
    }
    getLowStock() {
        let lowStock = [["Item", "Quantity"]];
        let items = [...this.items.values()].filter(item => item.isLowStock());
        items.map(item => lowStock.push([item.getName(), item.getQuantity().toString()]));
        return lowStock;
    }
    updateStock(items) {
        //need to check change is valid
        let alerts = new Array;
        items.forEach((quantity, item) => {
            const stock = this.items.get(item.getName());
            if (!stock)
                return;
            // check sufficient stock
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
