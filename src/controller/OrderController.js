"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderController = void 0;
const Order_1 = require("../model/Order");
class OrderController {
    constructor(inventory, menu) {
        this.order = new Order_1.Order();
        this.addAction = () => __awaiter(this, void 0, void 0, function* () {
            const item = yield this.getItemInput();
            const quantity = yield this.getQuantityInput();
            if (!(item === null || item === void 0 ? void 0 : item.getQuantity()) || (item === null || item === void 0 ? void 0 : item.getQuantity()) < quantity) {
                //handle properly
                console.log("insufficient stock");
                return;
            }
            // should error if already in the order - or update quantity?
            this.order.setItem(item, quantity);
        });
        this.editAction = () => __awaiter(this, void 0, void 0, function* () {
            const item = yield this.getItemInput();
            const quantity = yield this.getQuantityInput();
            if (!item) {
                return;
            } // remove once validated
            if (!this.order.hasItem(item)) {
                // error message
                // try again 
            }
            this.order.setItem(item, quantity);
        });
        this.removeAction = () => __awaiter(this, void 0, void 0, function* () {
            const item = yield this.getItemInput();
            if (!item) {
                return;
            } // remove once validated
            if (!this.order.hasItem(item)) {
                // error message
                // loop back to try again
                return;
            }
            this.order.removeItem(item);
        });
        this.viewAction = () => {
            console.log(this.order.getAllItems());
        };
        this.inventory = inventory;
        this.menu = menu;
    }
    rootAction() {
        return __awaiter(this, void 0, void 0, function* () {
            while (true) {
                const actions = new Map([['Add Item', this.addAction], ['Edit Quantity', this.editAction], ['Remove Item', this.removeAction], ['View Order', this.viewAction]]);
                const choice = yield this.menu.selectOption("Please select an option:", [...actions.keys()]);
                let index = parseInt(choice) - 1;
                // if ( !Number.isNaN(index) ) // && index in range
                // loop until valid choice, output error message
                yield [...actions.values()][index]();
            }
        });
    }
    getItemInput() {
        return __awaiter(this, void 0, void 0, function* () {
            const itemName = yield this.menu.getInput("Enter item name:");
            //validate is string
            const item = this.inventory.lookupItem(itemName);
            // error message if not found
            return item;
        });
    }
    getQuantityInput() {
        return __awaiter(this, void 0, void 0, function* () {
            const quantity = yield this.menu.getInput("Enter item quantity:");
            //validate int
            return parseInt(quantity);
        });
    }
}
exports.OrderController = OrderController;
