"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupplierOrder = void 0;
const Order_1 = require("./Order");
class SupplierOrder extends Order_1.Order {
    constructor() {
        super(...arguments);
        this.orderNumber = undefined;
    }
    // status: Enum
    // date: Date;
    setOrderNumber(orderNumber) {
        this.orderNumber = orderNumber;
    }
    getOrderNumber() {
        return this.orderNumber;
    }
    getSummary() {
        let order = [["Name", "Quantity", "Price"]];
        this.getAllItems().forEach((quantity, item) => {
            const price = item.getPrice() * quantity; // use supplier price instead
            order.push([item.getName(), quantity.toString(), price.toString()]);
        });
        return order;
    }
    complete() {
        // set order status
        // set supplier name 
        SupplierOrder.supplierManager.addSupplierOrder(this);
        // add number to supplier order history
    }
}
exports.SupplierOrder = SupplierOrder;
