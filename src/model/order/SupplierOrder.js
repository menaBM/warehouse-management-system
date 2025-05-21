"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupplierOrder = void 0;
const Order_1 = require("./Order");
class SupplierOrder extends Order_1.Order {
    getStockUpdates() {
        return new Map;
    }
    complete() {
    }
}
exports.SupplierOrder = SupplierOrder;
