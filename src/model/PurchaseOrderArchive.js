"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchaseOrderArchive = void 0;
class PurchaseOrderArchive {
    constructor() {
        this.orders = new Map();
    }
    addOrder(order) {
        const orderNumber = PurchaseOrderArchive.nextOrderNumber;
        this.orders.set(orderNumber, order);
        order.setOrderNumber(orderNumber);
        PurchaseOrderArchive.nextOrderNumber++;
        return orderNumber;
    }
    getOrder(orderNumber) {
        return this.orders.get(orderNumber);
    }
    getAllOrders() {
        return this.orders;
    }
}
exports.PurchaseOrderArchive = PurchaseOrderArchive;
PurchaseOrderArchive.nextOrderNumber = 1;
