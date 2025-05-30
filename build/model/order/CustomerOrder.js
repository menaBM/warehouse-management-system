"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerOrder = void 0;
const types_1 = require("../../types");
const Order_1 = require("./Order");
class CustomerOrder extends Order_1.Order {
  complete(inventory, financialReport) {
    this.setStatus(types_1.OrderStatus.Dispatched);
    financialReport.updateSalesRevenue(this);
    const stockAlerts = inventory.updateStock(this.getAllItems());
    return stockAlerts;
  }
}
exports.CustomerOrder = CustomerOrder;
