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
exports.InventoryController = void 0;
const BaseController_1 = require("./BaseController");
class InventoryController extends BaseController_1.BaseController {
    constructor(menu, inventory) {
        super(menu);
        this.stockReportAction = () => {
            this.menu.drawTable(this.inventory.generateReport());
        };
        this.lowStockAction = () => {
            // handle if no low stock
            this.menu.drawTable(this.inventory.getLowStock());
        };
        this.checkStockAction = () => __awaiter(this, void 0, void 0, function* () {
            const item = yield this.getItemInput();
            this.menu.outputMessage(`${item.getName()}: ${item.getQuantity()}`);
        });
        this.editStockAction = () => __awaiter(this, void 0, void 0, function* () {
            const item = yield this.getItemInput();
            const quantity = yield this.getNumberInput("Enter quantity:", "Invalid quantity");
            this.inventory.updateStock(new Map([[item, item.getQuantity() - quantity]]));
            this.menu.outputMessage(`${item.getName()} quantity set to ${quantity}`);
        });
        this.addInventoryAction = () => __awaiter(this, void 0, void 0, function* () {
            let name;
            let supplierName;
            while (true) {
                name = yield this.menu.getInput("Enter item name:");
                if (name !== "" && !this.inventory.lookupItem(name)) {
                    break;
                }
                this.menu.outputMessage("Invalid item name");
            }
            const price = yield this.getNumberInput("Enter item price:", "Invalid price");
            const supplierPrice = yield this.getNumberInput("Enter supplier price for item:", "Invalid price");
            const quantity = yield this.getNumberInput("Enter quantity of item currently in stock:", "Invalid quantity");
            const lowStockThreshold = yield this.getNumberInput("Enter threshold for item to be considered low stock:", "Invalid threshold");
            while (true) {
                supplierName = yield this.menu.getInput("Enter supplier name:");
                if (supplierName !== "") {
                    break;
                }
                this.menu.outputMessage(`Invalid supplier name`);
            }
            this.inventory.newItem(name, price, supplierPrice, quantity, lowStockThreshold, supplierName);
        });
        this.inventory = inventory;
        this.actions = new Map([
            ['Stock Report', this.stockReportAction],
            ['Low Stock Items', this.lowStockAction],
            ['Check Item Stock', this.checkStockAction],
            ['Edit Item Stock', this.editStockAction],
            ['Add new Inventory', this.addInventoryAction]
        ]);
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
    getNumberInput(message, errorMessage) {
        return __awaiter(this, void 0, void 0, function* () {
            while (true) {
                const input = Number(yield this.menu.getInput(message));
                if (input >= 0) {
                    return input;
                }
                this.menu.outputMessage(errorMessage);
            }
        });
    }
}
exports.InventoryController = InventoryController;
