"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderArchive = void 0;
class OrderArchive {
    constructor() {
        this.orders = new Map();
    }
    addOrder(order) {
        const orderNumber = OrderArchive.nextOrderNumber;
        this.orders.set(orderNumber, order);
        order.setOrderNumber(orderNumber);
        OrderArchive.nextOrderNumber++;
        return orderNumber;
    }
    getOrder(orderNumber) {
        return this.orders.get(orderNumber);
    }
    getAllOrders() {
        return this.orders;
    }
}
exports.OrderArchive = OrderArchive;
OrderArchive.nextOrderNumber = 1;
