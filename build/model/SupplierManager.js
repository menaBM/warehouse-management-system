"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupplierManager = void 0;
const types_1 = require("../types");
const PurchaseOrderArchive_1 = require("./PurchaseOrderArchive");
const Supplier_1 = require("./Supplier");
class SupplierManager {
    constructor() {
        this.suppliers = new Map();
        this.purchaseOrderArchive = new PurchaseOrderArchive_1.PurchaseOrderArchive();
    }
    createSupplier(supplierDetails) {
        let supplier = new Supplier_1.Supplier(supplierDetails.name, supplierDetails.email, supplierDetails.phoneNumber);
        this.suppliers.set(supplierDetails.name, supplier);
    }
    getSupplier(supplierName) {
        return this.suppliers.get(supplierName);
    }
    editSupplier(supplier, supplierDetails) {
        const name = supplier.getName();
        if (name !== supplierDetails.name) {
            this.suppliers.delete(name);
        }
        supplier.setName(supplierDetails.name);
        supplier.setEmail(supplierDetails.email);
        supplier.setPhoneNumber(supplierDetails.phoneNumber);
        this.suppliers.set(supplierDetails.name, supplier);
    }
    removeSupplier(supplier) {
        this.suppliers.delete(supplier.getName());
    }
    getAllSuppliers() {
        let suppliers = new Array();
        this.suppliers.forEach((supplier) => {
            suppliers.push([
                supplier.getName(),
                supplier.getEmail(),
                supplier.getPhoneNumber().toString(),
            ]);
        });
        return suppliers;
    }
    addSupplierOrder(order) {
        this.purchaseOrderArchive.addOrder(order);
    }
    getAllOrders() {
        return this.purchaseOrderArchive.getAllOrders();
    }
    processDelivery(orderNumber) {
        let order = this.purchaseOrderArchive.getOrder(orderNumber);
        let stockUpdates = new Map();
        if (order) {
            order.setStatus(types_1.OrderStatus.Delivered);
            for (const [key, value] of order.getAllItems()) {
                stockUpdates.set(key, -value);
            }
        }
        return stockUpdates;
    }
    getPendingDeliveries() {
        return this.purchaseOrderArchive.getUndeliveredOrders();
    }
}
exports.SupplierManager = SupplierManager;
