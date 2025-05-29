"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Item {
    constructor(name, price, supplierPrice, quantity, lowStockThreshold, supplierName) {
        this.name = name;
        this.price = price;
        this.supplierPrice = supplierPrice;
        this.quantity = quantity;
        this.lowStockThreshold = lowStockThreshold;
        this.supplierName = supplierName;
    }
    // setName (name : string) {
    //   this.name = name;
    // }
    getName() {
        return this.name;
    }
    // setPrice (price: number) {
    //   this.price = price
    // }
    getPrice() {
        return this.price;
    }
    getSupplierPrice() {
        return this.supplierPrice;
    }
    setQuantity(quantity) {
        this.quantity = quantity;
    }
    getQuantity() {
        return this.quantity;
    }
    setSupplierName(supplierName) {
        this.supplierName = supplierName;
    }
    getSupplierName() {
        return this.supplierName;
    }
    isLowStock() {
        return this.quantity <= this.lowStockThreshold;
    }
}
exports.default = Item;
