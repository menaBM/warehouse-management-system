"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupplierOrder = void 0;
const types_1 = require("../../types");
const Order_1 = require("./Order");
class SupplierOrder extends Order_1.Order {
    constructor() {
        super(...arguments);
        this.orderNumber = undefined;
    }
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
    complete(inventory) {
        // set supplier name 
        // set order number? 
        this.setStatus(types_1.OrderStatus.Processed);
        SupplierOrder.supplierManager.addSupplierOrder(this);
        return [];
    }
    isValidQuantity(item, quantity) {
        return true;
    }
}
exports.SupplierOrder = SupplierOrder;
