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
exports.OrderController = void 0;
const BaseController_1 = require("./BaseController");
class OrderController extends BaseController_1.BaseController {
  constructor(inventory, menu, order) {
    super(menu);
    this.addAction = () =>
      __awaiter(this, void 0, void 0, function* () {
        const item = yield this.getItemInput();
        const quantity = yield this.getQuantityInput();
        // if (!item.getQuantity() || item.getQuantity() < quantity) {
        //     //handle properly
        //     console.log("insufficient stock")
        //     return
        // }
        // should error if already in the order - or update quantity?
        this.order.addItem(item, quantity);
      });
    this.editAction = () =>
      __awaiter(this, void 0, void 0, function* () {
        const item = yield this.getItemInOrder();
        const quantity = yield this.getQuantityInput();
        //quantity check
        this.order.addItem(item, quantity);
      });
    this.removeAction = () =>
      __awaiter(this, void 0, void 0, function* () {
        const item = yield this.getItemInOrder();
        this.order.removeItem(item);
      });
    this.viewAction = () => {
      this.menu.drawTable(this.order.getSummary());
      this.menu.outputMessage(`Order Total: ${this.order.getTotal()}`);
    };
    this.completeAction = () => {
      this.menu.outputMessage("Your final order is as follows:");
      this.viewAction();
      //confirm yes / no
      //delivery address
      const output = this.order.complete(this.inventory);
      // this.menu.drawTable(output) - stock alerts
      this.exitAction();
    };
    this.orderClass = order;
    this.order = new order();
    this.inventory = inventory;
    this.actions = new Map([
      ["Add Item", this.addAction],
      ["Edit Quantity", this.editAction],
      ["Remove Item", this.removeAction],
      ["View Order", this.viewAction],
      ["Complete Order", this.completeAction],
    ]);
  }
  rootAction() {
    const _super = Object.create(null, {
      rootAction: { get: () => super.rootAction },
    });
    return __awaiter(this, void 0, void 0, function* () {
      this.order = new this.orderClass();
      yield _super.rootAction.call(this);
    });
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
        const quantity = Number(
          yield this.menu.getInput("Enter item quantity:"),
        );
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
