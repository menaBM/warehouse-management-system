"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupplierDirectory = void 0;
class SupplierDirectory {
    constructor() {
        this.suppliers = new Map();
    }
    addSupplier(supplier) {
        // verify not already there
        this.suppliers.set(supplier.name, supplier);
    }
    getSupplier(supplierName) {
        return this.suppliers.get(supplierName);
    }
    editSupplier(supplier, supplierDetails) {
        if (supplier.name !== supplierDetails.name) {
            this.suppliers.delete(supplier.name);
        }
        supplier.setName(supplierDetails.name);
        supplier.setEmail(supplierDetails.email);
        supplier.setPhoneNumber(supplierDetails.phoneNumber);
        supplier.setDaysToDeliver(supplierDetails.deliveryTimeInDays);
        this.suppliers.set(supplier.name, supplier);
    }
    removeSupplier(supplierName) {
        this.suppliers.delete(supplierName);
    }
    getAllSuppliers() {
        return this.suppliers;
    }
}
exports.SupplierDirectory = SupplierDirectory;
