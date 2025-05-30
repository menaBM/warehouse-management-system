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
exports.SupplierController = void 0;
const BaseController_1 = require("./BaseController");
const Inventory_1 = require("../model/Inventory");
const OrderController_1 = require("./OrderController");
const SupplierOrder_1 = require("../model/order/SupplierOrder");
class SupplierController extends BaseController_1.BaseController {
  constructor(menu, supplierManager, inventory, financialReport) {
    super(menu);
    this.addAction = () =>
      __awaiter(this, void 0, void 0, function* () {
        let supplierDetails;
        while (true) {
          supplierDetails = yield this.getSupplierInput(
            "Please enter details for new supplier",
          );
          if (!this.supplierManager.getSupplier(supplierDetails.name)) {
            break;
          }
          this.menu.outputMessage("Supplier already exists in records");
        }
        this.supplierManager.createSupplier(supplierDetails);
      });
    this.editAction = () =>
      __awaiter(this, void 0, void 0, function* () {
        let supplier = yield this.getExistingSupplier();
        const supplierDetails = yield this.getSupplierInput(
          "Please enter new details for supplier (enter to leave unchanged)",
          {
            name: supplier.getName(),
            email: supplier.getEmail(),
            phoneNumber: supplier.getPhoneNumber(),
          },
        );
        this.supplierManager.editSupplier(supplier, supplierDetails);
      });
    this.deleteAction = () =>
      __awaiter(this, void 0, void 0, function* () {
        let supplier = yield this.getExistingSupplier();
        this.supplierManager.removeSupplier(supplier);
      });
    this.viewAction = () =>
      __awaiter(this, void 0, void 0, function* () {
        let suppliers = [["Name", "Email", "Phone Number"]].concat(
          this.supplierManager.getAllSuppliers(),
        );
        this.menu.drawTable(suppliers);
      });
    this.orderAction = () =>
      __awaiter(this, void 0, void 0, function* () {
        if (this.supplierManager.getAllSuppliers().length === 0) {
          this.menu.outputMessage("No supplier records found");
          return;
        }
        let supplierName = (yield this.getExistingSupplier()).getName();
        let supplierInventory = new Inventory_1.Inventory();
        let items = this.inventory.getItems();
        const supplierItems = Array.from(items.values()).filter((item) => {
          if (item.getSupplierName() === supplierName) {
            supplierInventory.addItem(item);
            return item.getName();
          }
        });
        if (supplierItems.length === 0) {
          this.menu.outputMessage(
            "No items available to order from this supplier",
          );
          return;
        }
        this.menu.outputMessage(
          "Items available to order from this supplier's inventory:",
        );
        this.menu.drawTable(supplierItems.map((item) => [item.getName()]));
        const supplierOrderController = new OrderController_1.OrderController(
          supplierInventory,
          this.menu,
          SupplierOrder_1.SupplierOrder,
          this.financialReport,
        );
        yield supplierOrderController.rootAction();
        let order = supplierOrderController.getOrder();
        this.supplierManager.addSupplierOrder(order);
      });
    this.orderHistoryAction = () => {
      let orders = this.supplierManager.viewOrders();
      let orderSummaries = [["Order Number", "Supplier Name", "Order Status"]];
      orders.forEach((order, orderNumber) => {
        orderSummaries.push([
          orderNumber.toString(),
          order.getSupplierName(),
          order.getStatus(),
        ]);
      });
      this.menu.drawTable(orderSummaries);
    };
    this.deliveryAction = () =>
      __awaiter(this, void 0, void 0, function* () {
        let deliveries = this.supplierManager.getPendingDeliveries();
        if (deliveries.length < 1) {
          this.menu.outputMessage("There are currently no pending deliveries");
          return;
        }
        while (true) {
          let orderNumber = Number(
            yield this.menu.getInput("Enter order number of delivery"),
          );
          if (!orderNumber) {
            this.menu.outputMessage("Invalid order number");
            continue;
          }
          if (deliveries.includes(orderNumber)) {
            const stockUpdates =
              this.supplierManager.processDelivery(orderNumber);
            this.inventory.updateStock(stockUpdates);
            this.menu.outputMessage("Inventory updated");
            return;
          }
          this.menu.outputMessage(
            "No pending delivery found for this order number",
          );
        }
      });
    this.inventory = inventory;
    this.supplierManager = supplierManager;
    this.financialReport = financialReport;
    this.actions = new Map([
      ["Add New Supplier", this.addAction],
      ["Edit Supplier", this.editAction],
      ["Delete Supplier", this.deleteAction],
      ["View All Suppliers", this.viewAction],
      ["Place Supplier Order", this.orderAction],
      ["Recieve Supplier Delivery", this.deliveryAction],
      ["Supplier Order history", this.orderHistoryAction],
    ]);
  }
  getSupplierInput(message, supplierDetails) {
    return __awaiter(this, void 0, void 0, function* () {
      let name, email, phoneNumber;
      this.menu.outputMessage(message);
      // output an error message if incorrect input
      while (true) {
        const input = yield this.menu.getInput("Name:");
        name =
          input !== ""
            ? input
            : supplierDetails === null || supplierDetails === void 0
              ? void 0
              : supplierDetails.name;
        if (name !== undefined) {
          break;
        }
      }
      while (true) {
        const input = yield this.menu.getInput("Email:");
        email =
          input !== ""
            ? input
            : supplierDetails === null || supplierDetails === void 0
              ? void 0
              : supplierDetails.email;
        if (email !== undefined && email.includes("@")) {
          // also check for no spaces, use regex
          break;
        }
      }
      while (true) {
        const input = yield this.menu.getInput("Phone number:");
        phoneNumber =
          input !== ""
            ? Number(input)
            : supplierDetails === null || supplierDetails === void 0
              ? void 0
              : supplierDetails.phoneNumber;
        if (phoneNumber !== undefined && Number.isInteger(phoneNumber)) {
          break;
        }
      }
      return { name, email, phoneNumber: Number(phoneNumber) };
    });
  }
  getExistingSupplier() {
    return __awaiter(this, void 0, void 0, function* () {
      while (true) {
        const name = yield this.menu.getInput("Enter name of supplier:");
        let supplierFound = this.supplierManager.getSupplier(name);
        if (supplierFound) {
          return supplierFound;
        }
        this.menu.outputMessage("Supplier not found in records");
      }
    });
  }
}
exports.SupplierController = SupplierController;
