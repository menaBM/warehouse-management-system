"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupplierOrder = void 0;
const types_1 = require("../../types");
const Order_1 = require("./Order");
class SupplierOrder extends Order_1.Order {
    constructor() {
        super(...arguments);
        this.supplierName = undefined;
    }
    getSupplierName() {
        var _a;
        return (_a = this.supplierName) !== null && _a !== void 0 ? _a : "";
    }
    getSummary() {
        let order = [["Name", "Quantity", "Price"]];
        this.getAllItems().forEach((quantity, item) => {
            const price = item.getSupplierPrice() * quantity;
            order.push([item.getName(), quantity.toString(), price.toString()]);
        });
        return order;
    }
    complete(inventory, financialReport) {
        var _a;
        this.supplierName = (_a = this.getAllItems()
            .keys()
            .next()
            .value) === null || _a === void 0 ? void 0 : _a.getSupplierName();
        this.setStatus(types_1.OrderStatus.Processed);
        financialReport.updatePurchaseCosts(this);
        return [];
    }
    isValidQuantity(item, quantity) {
        return true; // assume no quantity limit on items ordered from supplier
    }
    getItemPrice(item) {
        return item.getSupplierPrice();
    }
}
exports.SupplierOrder = SupplierOrder;
