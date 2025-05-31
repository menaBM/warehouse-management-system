"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchaseOrderArchive = void 0;
const types_1 = require("../types");
class PurchaseOrderArchive {
    constructor() {
        this.nextOrderNumber = 1;
        this.orders = new Map();
    }
    addOrder(order) {
        const orderNumber = this.nextOrderNumber;
        this.orders.set(orderNumber, order);
        this.nextOrderNumber++;
    }
    getOrder(orderNumber) {
        return this.orders.get(orderNumber);
    }
    getAllOrders() {
        return this.orders;
    }
    getUndeliveredOrders() {
        return Array.from(this.orders.entries())
            .filter((order) => order[1].getStatus() !== types_1.OrderStatus.Delivered)
            .map((order) => order[0]);
    }
}
exports.PurchaseOrderArchive = PurchaseOrderArchive;
