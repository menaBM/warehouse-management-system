"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerOrder = void 0;
const Order_1 = require("./Order");
class CustomerOrder extends Order_1.Order {
    complete(inventory) {
        const stockAlerts = inventory.updateStock(this.getAllItems());
        return stockAlerts;
    }
}
exports.CustomerOrder = CustomerOrder;
