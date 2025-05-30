"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerOrder = void 0;
const Order_1 = require("./Order");
class CustomerOrder extends Order_1.Order {
  complete(inventory) {
    // make stock changes - call to inventory - high coupling? shoulkdn;t have the inv?
    // also dont know how to get the stock alerts to the menu - cleaner to call inventory from the controller, but will this method lose polymorhoism?
    // call financial updates
    const stockAlerts = inventory.updateStock(this.getAllItems());
    return stockAlerts;
  }
}
exports.CustomerOrder = CustomerOrder;
