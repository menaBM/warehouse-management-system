"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupplierManager = void 0;
const PurchaseOrderArchive_1 = require("./PurchaseOrderArchive");
class SupplierManager {
  constructor() {
    this.suppliers = new Map();
    this.purchaseOrderArchive =
      new PurchaseOrderArchive_1.PurchaseOrderArchive();
  }
  addSupplier(supplier) {
    // verify not already there
    this.suppliers.set(supplier.getName(), supplier);
  }
  getSupplier(supplierName) {
    return this.suppliers.get(supplierName);
  }
  editSupplier(supplier, supplierDetails) {
    if (supplier.getName() !== supplierDetails.name) {
      this.suppliers.delete(supplier.getName());
    }
    supplier.setName(supplierDetails.name);
    supplier.setEmail(supplierDetails.email);
    supplier.setPhoneNumber(supplierDetails.phoneNumber);
    supplier.setDaysToDeliver(supplierDetails.deliveryTimeInDays);
    this.suppliers.set(supplier.getName(), supplier);
  }
  removeSupplier(supplierName) {
    this.suppliers.delete(supplierName);
  }
  getAllSuppliers() {
    return this.suppliers;
  }
  addSupplierOrder(order) {
    const orderNumber = this.purchaseOrderArchive.addOrder(order);
  }
  viewOrders() {
    return this.purchaseOrderArchive.getAllOrders();
  }
}
exports.SupplierManager = SupplierManager;
