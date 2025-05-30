"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
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
    this.checkStockAction = () =>
      __awaiter(this, void 0, void 0, function* () {
        const item = yield this.getItemInput();
        this.menu.outputMessage(`${item.getName()}: ${item.getQuantity()}`);
      });
    this.addInventoryAction = () =>
      __awaiter(this, void 0, void 0, function* () {
        //verify inputs, check name not already used
        const name = yield this.menu.getInput("Enter item name:");
        const price = parseInt(yield this.menu.getInput("Enter item price:"));
        const quantity = parseInt(
          yield this.menu.getInput(
            "Enter quantity of item currently in stock:",
          ),
        );
        const lowStockThreshold = parseInt(
          yield this.menu.getInput(
            "Enter threshold for item to be considered low stock:",
          ),
        );
        this.inventory.addItem(name, price, quantity, lowStockThreshold);
      });
    this.inventory = inventory;
    this.actions = new Map([
      ["Stock Report", this.stockReportAction],
      ["Low Stock Items", this.lowStockAction],
      ["Check Item Stock", this.checkStockAction],
      ["Add new Inventory", this.addInventoryAction],
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
}
exports.InventoryController = InventoryController;
