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
const BaseController_1 = require("./BaseController");
class OrderController extends BaseController_1.BaseController {
    constructor(inventory, menu) {
        super(menu);
        this.order = new Order_1.Order();
        this.addAction = () => __awaiter(this, void 0, void 0, function* () {
            const item = yield this.getItemInput();
            const quantity = yield this.getQuantityInput();
            if (!item.getQuantity() || item.getQuantity() < quantity) {
                //handle properly - as part of inventory
                console.log("insufficient stock");
                return;
            }
            // should error if already in the order - or update quantity?
            this.order.setItem(item, quantity);
        });
        this.editAction = () => __awaiter(this, void 0, void 0, function* () {
            const item = yield this.getItemInOrder();
            const quantity = yield this.getQuantityInput();
            //quantity check
            this.order.setItem(item, quantity);
        });
        this.removeAction = () => __awaiter(this, void 0, void 0, function* () {
            const item = yield this.getItemInOrder();
            this.order.removeItem(item);
        });
        this.viewAction = () => {
            console.log(this.order.getAllItems());
        };
        this.inventory = inventory;
        this.actions = new Map([['Add Item', this.addAction], ['Edit Quantity', this.editAction], ['Remove Item', this.removeAction], ['View Order', this.viewAction]]);
    }
    getItemInput() {
        return __awaiter(this, void 0, void 0, function* () {
            while (true) {
                const itemName = yield this.menu.getInput("Enter item name:");
                const item = this.inventory.lookupItem(itemName);
                if (item) {
                    return item;
                }
                this.menu.outputMessage(`${itemName} not found in inventory`);
            }
        });
    }
    getQuantityInput() {
        return __awaiter(this, void 0, void 0, function* () {
            while (true) {
                const quantity = Number(yield this.menu.getInput("Enter item quantity:"));
                if (quantity) {
                    return quantity;
                }
                this.menu.outputMessage(`Invalid quantity`);
            }
        });
    }
    getItemInOrder() {
        return __awaiter(this, void 0, void 0, function* () {
            while (true) {
                const item = yield this.getItemInput();
                if (this.order.hasItem(item)) {
                    return item;
                }
                this.menu.outputMessage(`${item.getName()} not found in order`);
            }
        });
    }
}
exports.OrderController = OrderController;
