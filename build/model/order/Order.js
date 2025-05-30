"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const types_1 = require("../../types");
class Order {
  constructor() {
    this.total = 0;
    this.status = types_1.OrderStatus.Processing;
    this.total = 0;
    this.items = new Map();
  }
  getAllItems() {
    return this.items;
  }
  // getItem (item: Item) {
  //   return this.items.get(item)
  // }
  setStatus(status) {
    this.status = status;
  }
  getStatus() {
    return this.status;
  }
  setItem(item, quantity) {
    const existingItemQuantity = this.items.get(item);
    if (existingItemQuantity) {
      this.total -= existingItemQuantity * this.getItemPrice(item);
    }
    this.items.set(item, quantity);
    this.total += this.getItemPrice(item) * quantity;
  }
  hasItem(item) {
    return this.items.has(item);
  }
  removeItem(item) {
    const quantity = this.items.get(item);
    if (quantity) {
      this.total -= this.getItemPrice(item) * quantity;
    }
    this.items.delete(item);
  }
  getItemPrice(item) {
    return item.getPrice();
  }
  getTotal() {
    return this.total;
  }
  getSummary() {
    let order = [["Name", "Quantity", "Price"]];
    this.items.forEach((quantity, item) => {
      const price = this.getItemPrice(item) * quantity;
      order.push([item.getName(), quantity.toString(), price.toString()]);
    });
    return order;
  }
  complete(inventory, financialReport) {
    this.status = types_1.OrderStatus.Processed;
    return ["Order completed"];
  }
  isValidQuantity(item, quantity) {
    if (item.getQuantity() >= quantity) {
      return true;
    }
    return false;
  }
}
exports.Order = Order;
