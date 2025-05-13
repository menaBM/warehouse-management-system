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
        this.inventory = inventory;
        this.menu = menu;
    }
    rootAction() {
        return __awaiter(this, void 0, void 0, function* () {
            const actions = new Map([['Add Item', this.addAction], ['Edit Quantity', this.editAction], ['Remove Item', this.removeAction], ['View Order', this.viewAction]]);
            const choice = yield this.menu.selectOption("Please select an option:", [...actions.keys()]);
            let index = parseInt(choice) - 1;
            // if ( !Number.isNaN(index) ) // && index in range
            // loop until valid choice, output error message
            console.log("rootaction", [...actions.values()][index]);
        });
    }
    addAction() {
    }
    editAction() {
    }
    removeAction() {
    }
    viewAction() { }
}
exports.OrderController = OrderController;
