"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchaseOrderArchive = void 0;
const types_1 = require("../types");
class PurchaseOrderArchive {
    constructor() {
        this.orders = new Map();
    }
    addOrder(order) {
        const orderNumber = PurchaseOrderArchive.nextOrderNumber;
        this.orders.set(orderNumber, order);
        PurchaseOrderArchive.nextOrderNumber++;
    }
    getOrder(orderNumber) {
        return this.orders.get(orderNumber);
    }
    getAllOrders() {
        return this.orders;
    }
    getUndeliveredOrders() {
        return Array.from(this.orders.keys()).filter(orderNumber => {
            var _a;
            return ((_a = this.orders.get(orderNumber)) === null || _a === void 0 ? void 0 : _a.getStatus()) !== types_1.OrderStatus.Delivered;
        });
    }
}
exports.PurchaseOrderArchive = PurchaseOrderArchive;
PurchaseOrderArchive.nextOrderNumber = 1;
